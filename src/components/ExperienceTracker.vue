<template>
  <div class="experience-tracker">
    <div class="exp-header">
      <div>
        <h3>Experience & Leveling</h3>
        <p class="level-info">Level {{ character.level }}</p>
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

      <div class="level-box">
        <label>Current Level</label>
        <div class="level-value">{{ character.level }}</div>
        <button 
          @click="levelUp" 
          :disabled="!canLevelUp"
          :class="['btn-level', { disabled: !canLevelUp }]"
        >
          📈 Level Up
        </button>
      </div>
    </div>

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
      const table = EXPERIENCE_TABLES[this.character.class] || EXPERIENCE_TABLES.Fighter
      const nextLevel = Math.min(this.character.level + 1, table.length - 1)
      return table[nextLevel] || table[table.length - 1]
    },
    progressPercent() {
      const table = EXPERIENCE_TABLES[this.character.class] || EXPERIENCE_TABLES.Fighter
      const currentLevelExp = table[this.character.level - 1] || 0
      const nextLevelExp = this.nextLevelExp
      const progress = this.localExp - currentLevelExp
      const total = nextLevelExp - currentLevelExp
      return Math.min(100, Math.round((progress / total) * 100))
    },
    canLevelUp() {
      return this.localExp >= this.nextLevelExp
    }
  },
  methods: {
    updateExp() {
      const newLevel = calculateLevel(this.localExp, this.character.class)
      this.$emit('update', { 
        experience: this.localExp,
        level: newLevel
      })
    },
    addExp(amount) {
      this.localExp += amount
      this.updateExp()
    },
    levelUp() {
      if (this.canLevelUp) {
        const table = EXPERIENCE_TABLES[this.character.class] || EXPERIENCE_TABLES.Fighter
        const nextLevelExp = table[Math.min(this.character.level, table.length - 1)]
        this.localExp = nextLevelExp
        this.updateExp()
      }
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
  grid-template-columns: 2fr 1fr;
  gap: 15px;
  margin-bottom: 20px;
}

.exp-box, .level-box {
  background: var(--bg-light);
  padding: 15px;
  border-radius: 4px;
}

.exp-box label, .level-box label {
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
  background: var(--bg-light);
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
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