<template>
  <div class="spell-manager">
    <div class="spells-header">
      <h3>Spell Management</h3>
      <button @click="showAddSpell = !showAddSpell" class="btn btn-secondary">
        {{ showAddSpell ? '✕ Cancel' : '➕ Add Spell' }}
      </button>
    </div>

    <!-- Check if character can cast spells -->
    <div v-if="!canCastSpells" class="no-spells">
      <p>This class cannot cast spells.</p>
    </div>

    <div v-else>
      <!-- Add Spell Form -->
      <div v-if="showAddSpell" class="add-spell-form">
        <input 
          v-model="newSpell.name" 
          type="text" 
          class="input-field"
          placeholder="Spell name"
        >
        <select v-model.number="newSpell.level" class="input-field">
          <option value="">Select Level</option>
          <option v-for="lvl in availableSpellLevels" :key="lvl" :value="lvl">
            Level {{ lvl }}
          </option>
        </select>
        <select v-model="newSpell.school" class="input-field">
          <option value="">Select School</option>
          <option v-for="school in spellSchools" :key="school" :value="school">
            {{ school }}
          </option>
        </select>
        <button @click="addSpell" class="btn btn-primary">Add Spell</button>
      </div>

      <!-- Spell Slots -->
      <div class="spell-slots">
        <h4>Available Spell Slots</h4>
        <div class="slots-grid">
          <div v-for="level in 9" :key="level" class="slot-box">
            <div class="slot-label">Level {{ level }}</div>
            <div class="slot-count">
              <span class="used">{{ getUsedSlots(level) }}</span>
              <span class="separator">/</span>
              <span class="total">{{ getMaxSlots(level) }}</span>
            </div>
            <div class="slot-actions">
              <button 
                @click="useSpellSlot(level)" 
                :disabled="getUsedSlots(level) >= getMaxSlots(level)"
                class="btn-use"
              >
                Use
              </button>
              <button 
                @click="restoreSpellSlot(level)"
                :disabled="getUsedSlots(level) <= 0"
                class="btn-restore"
              >
                Restore
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Memorized Spells by Level -->
      <div v-for="level in 9" :key="level" class="spells-by-level">
        <div v-if="getSpellsByLevel(level).length > 0" class="level-section">
          <h4>Level {{ level }} Spells ({{ getSpellsByLevel(level).length }})</h4>
          <div class="spells-list">
            <div v-for="spell in getSpellsByLevel(level)" :key="spell.id" class="spell-item" @click="viewSpellDetails(spell)">
              <div class="spell-info">
                <h5>{{ spell.name }}</h5>
                <p class="spell-school">{{ spell.school }}</p>
              </div>
              <div class="spell-actions">
                <button @click="castSpell(spell, level)" class="btn-cast">Cast</button>
                <button @click.stop="removeSpell(spell.id)" class="btn-remove">✕</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Spell Details Modal -->
      <div v-if="selectedSpell" class="spell-detail-modal" @click="selectedSpell = null">
        <div class="spell-detail-content" @click.stop>
          <button @click="selectedSpell = null" class="close-btn">✕</button>
          <h3>{{ selectedSpell.name }}</h3>
          <div class="spell-meta">
            <span class="level">Level {{ selectedSpell.level }}</span>
            <span class="school">{{ selectedSpell.school }}</span>
          </div>
          <div class="spell-details">
            <p><strong>Casting Time:</strong> {{ selectedSpell.castingTime }}</p>
            <p><strong>Range:</strong> {{ selectedSpell.range }}</p>
            <p><strong>Components:</strong> {{ selectedSpell.components }}</p>
            <p><strong>Duration:</strong> {{ selectedSpell.duration }}</p>
            <p><strong>Description:</strong> {{ selectedSpell.description }}</p>
          </div>
        </div>
      </div>

      <!-- Common Spells -->
      <div class="common-spells">
        <h4>Quick Add Common Spells</h4>
        <div class="spells-grid">
          <button 
            v-for="spell in commonSpells" 
            :key="spell.name" 
            @click="addCommonSpell(spell)" 
            class="btn-spell"
          >
            {{ spell.name }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SPELL_SCHOOLS, getSpellDetails } from '../utils/spellDatabase.js'
import { calculateModifier } from '../utils/rules1e.js'

const commonSpells = [
  { name: 'Magic Missile', level: 1, school: 'Evocation' },
  { name: 'Shield', level: 1, school: 'Abjuration' },
  { name: 'Burning Hands', level: 1, school: 'Evocation' },
  { name: 'Sleep', level: 1, school: 'Enchantment' },
  { name: 'Fireball', level: 3, school: 'Evocation' },
  { name: 'Lightning Bolt', level: 3, school: 'Evocation' },
  { name: 'Invisibility', level: 2, school: 'Illusion' },
  { name: 'Cure Light Wounds', level: 1, school: 'Necromancy' },
  { name: 'Bless', level: 1, school: 'Enchantment' },
  { name: 'Detect Magic', level: 1, school: 'Divination' }
]

export default {
  name: 'SpellManager',
  props: {
    character: Object
  },
  data() {
    return {
      showAddSpell: false,
      newSpell: {
        name: '',
        level: 1,
        school: 'Evocation'
      },
      spellSchools: Object.values(SPELL_SCHOOLS),
      commonSpells,
      usedSlots: {},
      selectedSpell: null
    }
  },
  computed: {
    canCastSpells() {
      const spellcastingClasses = ['Magic-User', 'Cleric', 'Druid', 'Ranger', 'Paladin', 'Bard']
      if (!this.character.classes) return false
      return this.character.classes.some(cls => spellcastingClasses.includes(cls.class))
    },
    availableSpellLevels() {
      const maxLevel = this.character.level || 1
      const levels = []
      for (let i = 1; i <= Math.min(maxLevel, 9); i++) {
        levels.push(i)
      }
      return levels
    }
  },
  watch: {
    character: {
      immediate: true,
      handler() {
        if (!this.character.memorizedSpells) {
          this.character.memorizedSpells = []
        }
        if (!this.character.spellSlots) {
          this.character.spellSlots = {}
        }
      }
    }
  },
  methods: {
    addSpell() {
      if (!this.newSpell.name || this.newSpell.level === '') {
        alert('Please fill in spell details')
        return
      }

      if (!this.character.memorizedSpells) {
        this.character.memorizedSpells = []
      }

      const spell = {
        id: Date.now(),
        ...this.newSpell
      }

      this.character.memorizedSpells.push(spell)
      this.$emit('update', { memorizedSpells: this.character.memorizedSpells })

      this.newSpell = { name: '', level: 1, school: 'Evocation' }
      this.showAddSpell = false
    },
    addCommonSpell(spell) {
      if (!this.character.memorizedSpells) {
        this.character.memorizedSpells = []
      }

      const newSpell = {
        id: Date.now(),
        ...spell
      }

      this.character.memorizedSpells.push(newSpell)
      this.$emit('update', { memorizedSpells: this.character.memorizedSpells })
    },
    removeSpell(id) {
      this.character.memorizedSpells = this.character.memorizedSpells.filter(s => s.id !== id)
      this.$emit('update', { memorizedSpells: this.character.memorizedSpells })
    },
    getSpellsByLevel(level) {
      if (!this.character.memorizedSpells) return []
      return this.character.memorizedSpells.filter(s => s.level === level)
    },
    getMaxSlots(level) {
      const intMod = calculateModifier(this.character.stats.INT)
      const wisMod = calculateModifier(this.character.stats.WIS)
      const mod = this.isCleric() ? wisMod : intMod

      if (level > this.character.level) return 0
      
      const baseSlots = level === 1 ? 1 : Math.floor((this.character.level - level + 1) / 2)
      const bonusSlots = mod >= level ? 1 : 0
      
      return Math.max(0, baseSlots + bonusSlots)
    },
    getUsedSlots(level) {
      return (this.character.spellSlots && this.character.spellSlots[level]) || 0
    },
    useSpellSlot(level) {
      if (!this.character.spellSlots) {
        this.character.spellSlots = {}
      }

      if (!this.character.spellSlots[level]) {
        this.character.spellSlots[level] = 0
      }

      if (this.character.spellSlots[level] < this.getMaxSlots(level)) {
        this.character.spellSlots[level]++
        this.$emit('update', { spellSlots: this.character.spellSlots })
      }
    },
    restoreSpellSlot(level) {
      if (this.character.spellSlots && this.character.spellSlots[level] > 0) {
        this.character.spellSlots[level]--
        this.$emit('update', { spellSlots: this.character.spellSlots })
      }
    },
    castSpell(spell, level) {
      alert(`Cast ${spell.name}!`)
      this.useSpellSlot(level)
    },
    isCleric() {
      if (!this.character.classes) return false
      return this.character.classes.some(c => c.class === 'Cleric' || c.class === 'Druid')
    },
    viewSpellDetails(spell) {
      const details = getSpellDetails(spell.name)
      this.selectedSpell = details || spell
    }
  }
}
</script>

<style scoped>
.spell-manager {
  background: var(--bg-dark);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.spells-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid var(--primary);
}

.spells-header h3 {
  margin: 0;
  color: var(--primary);
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.btn-secondary {
  background: var(--accent-info);
  color: #fff;
}

.no-spells {
  background: var(--bg-light);
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  color: var(--text-muted);
}

.add-spell-form {
  background: var(--bg-light);
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto;
  gap: 10px;
  align-items: flex-end;
}

.input-field {
  padding: 8px 12px;
  background: var(--bg-dark);
  border: 1px solid #444;
  color: var(--text);
  border-radius: 4px;
}

.btn-primary {
  background: var(--primary);
  color: #000;
}

.spell-slots {
  background: var(--bg-light);
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.spell-slots h4 {
  margin: 0 0 15px 0;
  color: var(--primary);
}

.slots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
}

.slot-box {
  background: var(--bg-dark);
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  border: 1px solid #444;
}

.slot-label {
  color: var(--text-muted);
  font-size: 12px;
  margin-bottom: 5px;
}

.slot-count {
  color: var(--primary);
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
}

.used {
  color: var(--accent-info);
}

.separator {
  color: var(--text-muted);
}

.slot-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}

.btn-use, .btn-restore, .btn-cast, .btn-remove {
  padding: 5px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-use {
  background: var(--accent-info);
  color: #fff;
}

.btn-use:hover:not(:disabled) {
  background: #2563eb;
}

.btn-use:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-restore {
  background: var(--accent-success);
  color: #000;
}

.btn-restore:hover:not(:disabled) {
  background: #22c55e;
}

.btn-restore:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.spells-by-level {
  margin-bottom: 20px;
}

.level-section {
  background: var(--bg-light);
  padding: 15px;
  border-radius: 4px;
}

.level-section h4 {
  margin: 0 0 10px 0;
  color: var(--primary);
  font-size: 14px;
}

.spells-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
}

.spell-item {
  background: var(--bg-dark);
  padding: 10px;
  border-radius: 4px;
  border-left: 3px solid var(--primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
}

.spell-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(255, 215, 0, 0.1);
}

.spell-info h5 {
  margin: 0 0 3px 0;
  color: var(--primary);
  font-size: 14px;
}

.spell-school {
  color: var(--text-muted);
  font-size: 11px;
  margin: 0;
}

.spell-actions {
  display: flex;
  gap: 5px;
}

.btn-cast {
  background: var(--accent-info);
  color: #fff;
}

.btn-cast:hover {
  background: #2563eb;
}

.btn-remove {
  background: var(--accent-error);
  color: #fff;
}

.spell-detail-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.spell-detail-content {
  background: var(--bg-light);
  border: 2px solid var(--primary);
  border-radius: 8px;
  padding: 20px;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
}

.spell-detail-content h3 {
  margin: 0 0 15px 0;
  color: var(--primary);
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 20px;
  cursor: pointer;
}

.spell-meta {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.level, .school {
  background: var(--bg-dark);
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 12px;
  font-weight: 500;
}

.spell-details {
  background: var(--bg-dark);
  padding: 15px;
  border-radius: 4px;
  font-size: 13px;
}

.spell-details p {
  margin: 10px 0;
  line-height: 1.5;
}

.spell-details strong {
  color: var(--primary);
}

.common-spells {
  background: var(--bg-light);
  padding: 15px;
  border-radius: 4px;
}

.common-spells h4 {
  margin: 0 0 15px 0;
  color: var(--primary);
  font-size: 13px;
}

.spells-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 8px;
}

.btn-spell {
  padding: 8px 12px;
  background: var(--bg-dark);
  border: 1px solid #444;
  color: var(--text);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 12px;
}

.btn-spell:hover {
  border-color: var(--primary);
  color: var(--primary);
}
</style>