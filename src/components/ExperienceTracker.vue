<template>
  <div class="experience-tracker">
    <div class="exp-header">
      <div>
        <h3>Experience & Leveling</h3>
        <p class="level-info" v-if="!character.isMulticlass">Level {{ character.level }}</p>
        <p class="level-info" v-else>
          <span v-for="(cls, idx) in character.classes" :key="idx">
            {{ cls.class }} {{ cls.level }}<span v-if="idx < character.classes.length - 1"> / </span>
          </span>
        </p>
      </div>
    </div>

    <div class="exp-content">
      <div class="exp-box">
        <label>Experience Points</label>
        <div class="exp-input-group">
          <input 
            v-model.number="localExp" 
            @change="updateExp"
            type="number" 
            class="input-field"
            min="0"
          >
          <button @click="addExp(100)" class="btn-add-exp">+100</button>
          <button @click="addExp(1000)" class="btn-add-exp">+1000</button>
        </div>
      </div>
    </div>

    <!-- Single Class Leveling -->
    <div v-if="!character.isMulticlass" class="level-box">
      <label>Current Level</label>
      <div class="level-value">{{ character.level }}</div>
      <button 
        @click="levelUp" 
        :disabled="!canLevelUp"
        :class="['btn-level', { disabled: !canLevelUp }]"
      >
        📈 Level Up
      </button>

      <div class="exp-progress">
        <h4>Experience to Next Level</h4>
        <div class="progress-info">
          <span>{{ localExp }} / {{ nextLevelExp }}</span>
          <span class="progress-percent">({{ progressPercent }}%)</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>
      </div>
    </div>

    <!-- Multiclass Leveling -->
    <div v-else class="multiclass-exp">
      <h4>Multiclass Experience Tracking</h4>
      <div class="multiclass-levels">
        <div v-for="(classInfo, idx) in character.classes" :key="idx" class="class-exp-box">
          <div class="class-name">{{ classInfo.class }}</div>
          
          <div class="level-control">
            <label>Level: {{ classInfo.level }}</label>
            <div class="level-buttons">
              <button 
                @click="levelUpClass(idx)" 
                :disabled="classInfo.level >= 20"
                class="btn-level-up"
              >
                ⬆️ Level Up
              </button>
              <button 
                @click="levelDownClass(idx)"
                :disabled="classInfo.level <= 1"
                class="btn-level-down"
              >
                ⬇️ Level Down
              </button>
            </div>
          </div>

          <div class="exp-needed">
            <p>Exp for Level {{ classInfo.level + 1 }}: {{ getExpForLevel(classInfo.class, classInfo.level + 1) }}</p>
          </div>
        </div>
      </div>

      <div class="party-exp-note">
        <p>💡 Tip: In multiclass, experience is typically split among classes or earned separately depending on your campaign rules.</p>
      </div>
    </div>

    <div class="button-group">
      <button @click="resetExp" class="btn btn-secondary">↻ Reset Experience</button>
    </div>
  </div>
</template>

<script>
import { calculateLevel, EXPERIENCE_TABLES } from '../utils/rules1e.js'

export default {
  name: 'ExperienceTracker',
  props: {
    character: Object
  },
  data() {
    return {
      localExp: 0
    }
  },
  watch: {
    character: {
      immediate: true,
      handler() {
        this.localExp = this.character.experience || 0
      }
    }
  },
  computed: {
    nextLevelExp() {
      if (this.character.isMulticlass) return 0
      
      const table = EXPERIENCE_TABLES[this.character.classes[0].class] || EXPERIENCE_TABLES.Fighter
      const nextLevel = Math.min(this.character.level + 1, table.length - 1)
      return table[nextLevel] || table[table.length - 1]
    },
    progressPercent() {
      if (this.character.isMulticlass) return 0
      
      const table = EXPERIENCE_TABLES[this.character.classes[0].class] || EXPERIENCE_TABLES.Fighter
      const currentLevelExp = table[this.character.level - 1] || 0
      const nextLevelExp = this.nextLevelExp
      const progress = this.localExp - currentLevelExp
      const total = nextLevelExp - currentLevelExp
      return Math.min(100, Math.round((progress / total) * 100))
    },
    canLevelUp() {
      if (this.character.isMulticlass) return false
      return this.localExp >= this.nextLevelExp
    }
  },
  methods: {
    updateExp() {
      if (!this.character.isMulticlass) {
        const newLevel = calculateLevel(this.localExp, this.character.classes[0].classKey)
        this.$emit('update', { 
          experience: this.localExp,
          level: newLevel
        })
      } else {
        this.$emit('update', { experience: this.localExp })
      }
    },
    addExp(amount) {
      this.localExp += amount
      this.updateExp()
    },
    levelUp() {
      if (this.canLevelUp) {
        const table = EXPERIENCE_TABLES[this.character.classes[0].class] || EXPERIENCE_TABLES.Fighter
        const nextLevelExp = table[Math.min(this.character.level, table.length - 1)]
        this.localExp = nextLevelExp
        this.updateExp()
      }
    },
    levelUpClass(idx) {
      if (this.character.classes[idx].level < 20) {
        this.character.classes[idx].level++
        this.$emit('update', { classes: this.character.classes })
      }
    },
    levelDownClass(idx) {
      if (this.character.classes[idx].level > 1) {
        this.character.classes[idx].level--
        this.$emit('update', { classes: this.character.classes })
      }
    },
    getExpForLevel(className, level) {
      const table = EXPERIENCE_TABLES[className] || EXPERIENCE_TABLES.Fighter
      return table[level - 1] || table[table.length - 1]
    },
    resetExp() {
      if (confirm('Reset experience to 0?')) {
        this.localExp = 0
        this.updateExp()
      }
    }
  }
}
</script>

<style scoped>
.experience-tracker {
  background: var(--bg-dark);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid var(--primary);
}

.exp-header h3 {
  margin: 0;
  color: var(--primary);
}

.level-info {
  color: var(--text-muted);
  font-size: 13px;
  margin: 5px 0 0 0;
}

.exp-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  margin-bottom: 20px;
}

.exp-box {
  background: var(--bg-light);
  padding: 15px;
  border-radius: 4px;
}

.exp-box label {
  display: block;
  color: var(--text-muted);
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.exp-input-group {
  display: flex;
  gap: 8px;
}

.input-field {
  flex: 1;
  padding: 8px 12px;
  background: var(--bg-dark);
  border: 1px solid #444;
  color: var(--primary);
  border-radius: 4px;
}

.btn-add-exp {
  padding: 8px 12px;
  background: var(--accent-info);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-add-exp:hover {
  background: #2563eb;
}

.level-box {
  background: var(--bg-light);
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.level-box label {
  display: block;
  color: var(--text-muted);
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.level-value {
  color: var(--primary);
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
}

.btn-level {
  width: 100%;
  padding: 10px;
  background: var(--accent-success);
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  margin-bottom: 15px;
}

.btn-level:hover:not(.disabled) {
  background: #22c55e;
}

.btn-level.disabled {
  background: #555;
  color: var(--text-muted);
  cursor: not-allowed;
  opacity: 0.5;
}

.exp-progress {
  background: var(--bg-dark);
  padding: 15px;
  border-radius: 4px;
}

.exp-progress h4 {
  margin: 0 0 10px 0;
  color: var(--primary);
  font-size: 13px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.progress-percent {
  color: var(--primary);
  font-weight: bold;
}

.progress-bar {
  width: 100%;
  height: 20px;
  background: var(--bg-dark);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #444;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-info), var(--primary));
  transition: width 0.3s ease;
}

.multiclass-exp {
  background: var(--bg-light);
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.multiclass-exp h4 {
  margin: 0 0 15px 0;
  color: var(--primary);
}

.multiclass-levels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 15px;
}

.class-exp-box {
  background: var(--bg-dark);
  padding: 12px;
  border-radius: 4px;
  border-left: 3px solid var(--primary);
}

.class-name {
  color: var(--primary);
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 14px;
}

.level-control label {
  display: block;
  color: var(--text-muted);
  font-size: 12px;
  margin-bottom: 8px;
}

.level-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}

.btn-level-up, .btn-level-down {
  padding: 6px 8px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-level-up {
  background: var(--accent-success);
  color: #000;
}

.btn-level-up:hover:not(:disabled) {
  background: #22c55e;
}

.btn-level-up:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-level-down {
  background: var(--accent-error);
  color: #fff;
}

.btn-level-down:hover:not(:disabled) {
  background: #dc2626;
}

.btn-level-down:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.exp-needed {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #555;
}

.exp-needed p {
  color: var(--text-muted);
  font-size: 11px;
  margin: 0;
}

.party-exp-note {
  background: var(--bg-dark);
  padding: 10px;
  border-radius: 4px;
  border-left: 3px solid var(--accent-info);
}

.party-exp-note p {
  color: var(--text-muted);
  font-size: 12px;
  margin: 0;
}

.button-group {
  display: flex;
  gap: 10px;
}

.btn {
  flex: 1;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.btn-secondary {
  background: var(--accent-info);
  color: #fff;
}

.btn-secondary:hover {
  background: #2563eb;
}
</style>