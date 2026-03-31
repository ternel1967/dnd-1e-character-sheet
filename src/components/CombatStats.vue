<template>
  <div class="combat-stats">
    <div class="stats-header">
      <h3>Combat Statistics</h3>
    </div>

    <div class="combat-grid">
      <!-- HP Section -->
      <div class="stat-section">
        <h4>Hit Points</h4>
        <div class="hp-display">
          <div class="hp-info">
            <span class="hp-current">{{ character.hitPoints }}</span>
            <span class="hp-slash">/</span>
            <span class="hp-max">{{ character.maxHitPoints }}</span>
          </div>
          <div class="hp-bar">
            <div 
              class="hp-fill" 
              :style="{ 
                width: (character.hitPoints / character.maxHitPoints * 100) + '%',
                background: getHPColor()
              }"
            ></div>
          </div>
        </div>
        <div class="hp-controls">
          <button @click="damageHP(1)" class="btn-damage">-1</button>
          <button @click="damageHP(5)" class="btn-damage">-5</button>
          <button @click="healHP(1)" class="btn-heal">+1</button>
          <button @click="healHP(5)" class="btn-heal">+5</button>
          <button @click="maxHP" class="btn-heal">Full</button>
        </div>
        <div class="hp-inputs">
          <input 
            v-model.number="localHitPoints" 
            @change="updateStats"
            type="number" 
            class="input-field"
            min="0"
          >
          <span>/</span>
          <input 
            v-model.number="localMaxHitPoints" 
            @change="updateStats"
            type="number" 
            class="input-field"
            min="1"
          >
        </div>
      </div>

      <!-- THAC0 Section -->
      <div class="stat-section">
        <h4>THAC0</h4>
        <div class="thac0-display">
          <div class="thac0-value">{{ calculateThac0 }}</div>
          <p class="thac0-info">To Hit AC 0</p>
        </div>
        <div class="thac0-details">
          <div class="detail-row">
            <span>Base THAC0:</span>
            <span>{{ getBaseTHAC0 }}</span>
          </div>
          <div class="detail-row">
            <span>STR Bonus:</span>
            <span :class="{ positive: strBonus > 0, negative: strBonus < 0 }">
              {{ strBonus > 0 ? '+' : '' }}{{ strBonus }}
            </span>
          </div>
          <div class="detail-row">
            <span>DEX Bonus:</span>
            <span :class="{ positive: dexBonus > 0, negative: dexBonus < 0 }">
              {{ dexBonus > 0 ? '+' : '' }}{{ dexBonus }}
            </span>
          </div>
        </div>
      </div>

      <!-- Armor Class Section -->
      <div class="stat-section">
        <h4>Armor Class</h4>
        <div class="ac-display">
          <div class="ac-value">{{ localArmorClass }}</div>
          <p class="ac-info">(Lower is Better)</p>
        </div>
        <div class="ac-selector">
          <select v-model.number="localArmorClass" @change="updateStats" class="input-field">
            <option v-for="(ac, armor) in ARMOR_CLASS" :key="armor" :value="ac">
              {{ armor }} (AC {{ ac }})
            </option>
          </select>
        </div>
        <div class="ac-info-text">
          <p v-if="localArmorClass >= 8">Light Armor</p>
          <p v-else-if="localArmorClass >= 5">Medium Armor</p>
          <p v-else>Heavy Armor</p>
        </div>
      </div>
    </div>

    <!-- Initiative & Actions -->
    <div class="initiative-section">
      <h4>Initiative & Actions</h4>
      <div class="init-grid">
        <div class="init-box">
          <label>Initiative Modifier</label>
          <div class="init-value">{{ dexBonus > 0 ? '+' : '' }}{{ dexBonus }}</div>
          <p class="init-info">Based on DEX modifier</p>
        </div>
        <div class="init-box">
          <label>Attacks Per Round</label>
          <div class="init-value">{{ attacksPerRound }}</div>
          <p class="init-info">At Level {{ character.level }}</p>
        </div>
      </div>
    </div>

    <!-- Saving Throws -->
    <div class="saves-section">
      <h4>Saving Throws (1d20)</h4>
      <div class="saves-grid">
        <div v-for="save in savingThrows" :key="save.name" class="save-box">
          <span class="save-name">{{ save.name }}</span>
          <span class="save-value">{{ save.value }}</span>
          <button @click="rollSave(save)" class="btn-roll">Roll</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { calculateThac0, calculateModifier, CHARACTER_CLASSES, ARMOR_CLASS } from '../utils/rules1e.js'

export default {
  name: 'CombatStats',
  props: {
    character: Object
  },
  data() {
    return {
      ARMOR_CLASS,
      localHitPoints: 0,
      localMaxHitPoints: 0,
      localArmorClass: 10
    }
  },
  watch: {
    character: {
      immediate: true,
      handler() {
        this.localHitPoints = this.character.hitPoints || 0
        this.localMaxHitPoints = this.character.maxHitPoints || 10
        this.localArmorClass = this.character.armorClass || 10
      }
    }
  },
  computed: {
    calculateThac0() {
      return calculateThac0(this.character.level, this.character.class)
    },
    getBaseTHAC0() {
      const classData = CHARACTER_CLASSES[Object.keys(CHARACTER_CLASSES).find(key => CHARACTER_CLASSES[key].name === this.character.class)]
      return classData?.thac0Base || 10
    },
    strBonus() {
      return calculateModifier(this.character.stats.STR)
    },
    dexBonus() {
      return calculateModifier(this.character.stats.DEX)
    },
    attacksPerRound() {
      const level = this.character.level
      if (level <= 6) return 1
      if (level <= 12) return '3/2'
      return 2
    },
    savingThrows() {
      const wisBonus = calculateModifier(this.character.stats.WIS)
      const conBonus = calculateModifier(this.character.stats.CON)
      
      return [
        { name: 'Death Ray/Poison', value: 12 + wisBonus },
        { name: 'Wands', value: 13 + wisBonus },
        { name: 'Paralysis/Petrify', value: 14 + conBonus },
        { name: 'Breath Weapon', value: 15 },
        { name: 'Spells', value: 16 + wisBonus }
      ]
    }
  },
  methods: {
    damageHP(amount) {
      this.localHitPoints = Math.max(0, this.localHitPoints - amount)
      this.updateStats()
    },
    healHP(amount) {
      this.localHitPoints = Math.min(this.localMaxHitPoints, this.localHitPoints + amount)
      this.updateStats()
    },
    maxHP() {
      this.localHitPoints = this.localMaxHitPoints
      this.updateStats()
    },
    updateStats() {
      this.$emit('update', {
        hitPoints: this.localHitPoints,
        maxHitPoints: this.localMaxHitPoints,
        armorClass: this.localArmorClass
      })
    },
    getHPColor() {
      const percent = this.character.hitPoints / this.character.maxHitPoints
      if (percent > 0.5) return 'linear-gradient(90deg, #4ade80, #3b82f6)'
      if (percent > 0.25) return 'linear-gradient(90deg, #fbbf24, #f97316)'
      return 'linear-gradient(90deg, #ef4444, #dc2626)'
    },
    rollSave(save) {
      const roll = Math.floor(Math.random() * 20) + 1
      const result = roll + (save.value - 12)
      alert(`${save.name}: Rolled ${roll} (${save.value}) = ${result}`)
    }
  }
}
</script>

<style scoped>
.combat-stats {
  background: var(--bg-dark);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.stats-header {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid var(--primary);
}

.stats-header h3 {
  margin: 0;
  color: var(--primary);
}

.combat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.stat-section {
  background: var(--bg-light);
  padding: 15px;
  border-radius: 4px;
  border-left: 3px solid var(--primary);
}

.stat-section h4 {
  margin: 0 0 15px 0;
  color: var(--primary);
  font-size: 14px;
}

.hp-display {
  margin-bottom: 10px;
}

.hp-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-bottom: 8px;
}

.hp-current {
  color: var(--primary);
  font-size: 24px;
  font-weight: bold;
}

.hp-slash {
  color: var(--text-muted);
}

.hp-max {
  color: var(--text-muted);
  font-size: 18px;
}

.hp-bar {
  width: 100%;
  height: 24px;
  background: var(--bg-dark);
  border: 2px solid var(--accent-error);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
}

.hp-fill {
  height: 100%;
  transition: width 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-weight: bold;
  font-size: 12px;
}

.hp-controls {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5px;
  margin-bottom: 10px;
}

.btn-damage, .btn-heal, .btn-roll {
  padding: 6px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: 500;
  font-size: 12px;
  transition: all 0.2s;
}

.btn-damage {
  background: var(--accent-error);
  color: #fff;
}

.btn-damage:hover {
  background: #dc2626;
}

.btn-heal {
  background: var(--accent-success);
  color: #000;
}

.btn-heal:hover {
  background: #22c55e;
}

.hp-inputs {
  display: flex;
  align-items: center;
  gap: 5px;
}

.input-field {
  flex: 1;
  padding: 6px;
  background: var(--bg-dark);
  border: 1px solid #444;
  color: var(--primary);
  border-radius: 3px;
  text-align: center;
}

.thac0-display {
  text-align: center;
  margin-bottom: 15px;
}

.thac0-value {
  color: var(--primary);
  font-size: 28px;
  font-weight: bold;
}

.thac0-info, .ac-info {
  color: var(--text-muted);
  font-size: 12px;
  margin: 5px 0 0 0;
}

.thac0-details {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 13px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 5px;
  background: var(--bg-dark);
  border-radius: 3px;
}

.positive {
  color: var(--accent-success);
  font-weight: bold;
}

.negative {
  color: var(--accent-error);
  font-weight: bold;
}

.ac-display {
  text-align: center;
  margin-bottom: 10px;
}

.ac-value {
  color: var(--primary);
  font-size: 28px;
  font-weight: bold;
}

.ac-selector {
  margin-bottom: 10px;
}

.ac-info-text p {
  color: var(--text-muted);
  font-size: 12px;
  margin: 5px 0;
}

.initiative-section {
  background: var(--bg-light);
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.initiative-section h4 {
  margin: 0 0 15px 0;
  color: var(--primary);
  font-size: 14px;
}

.init-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}

.init-box {
  background: var(--bg-dark);
  padding: 10px;
  border-radius: 3px;
}

.init-box label {
  display: block;
  color: var(--text-muted);
  font-size: 11px;
  text-transform: uppercase;
  margin-bottom: 5px;
}

.init-value {
  color: var(--primary);
  font-size: 20px;
  font-weight: bold;
}

.init-info {
  color: var(--text-muted);
  font-size: 11px;
  margin: 3px 0 0 0;
}

.saves-section {
  background: var(--bg-light);
  padding: 15px;
  border-radius: 4px;
}

.saves-section h4 {
  margin: 0 0 15px 0;
  color: var(--primary);
  font-size: 14px;
}

.saves-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}

.save-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: var(--bg-dark);
  padding: 10px;
  border-radius: 3px;
}

.save-name {
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 500;
}

.save-value {
  color: var(--primary);
  font-weight: bold;
  text-align: center;
}

.btn-roll {
  background: var(--accent-info);
  color: #fff;
  padding: 6px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
}

.btn-roll:hover {
  background: #2563eb;
}
</style>