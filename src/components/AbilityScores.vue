<template>
  <div class="ability-scores">
    <h3>Ability Scores</h3>
    
    <div class="abilities-grid">
      <div v-for="ability in ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']" :key="ability" class="ability-box">
        <div class="ability-label">{{ ability }}</div>
        <input 
          v-model.number="localChar.stats[ability]" 
          @change="updateAbility"
          type="number" 
          class="ability-input"
          min="1"
          max="25"
        >
        <div class="ability-value">{{ localChar.stats[ability] }}</div>
        <div class="ability-modifier">{{ getModifier(localChar.stats[ability]) > 0 ? '+' : '' }}{{ getModifier(localChar.stats[ability]) }}</div>
      </div>
    </div>

    <div class="ability-effects">
      <h4>Racial Bonuses/Penalties</h4>
      <div class="effects-list">
        <div v-for="(bonus, ability) in getRacialMods()" :key="ability" class="effect-item">
          <span>{{ ability }}:</span>
          <span :class="['bonus', { positive: bonus > 0, negative: bonus < 0 }]">
            {{ bonus > 0 ? '+' : '' }}{{ bonus }}
          </span>
        </div>
      </div>
    </div>

    <div class="button-group">
      <button @click="randomizeScores" class="btn btn-secondary">🎲 Randomize</button>
      <button @click="resetScores" class="btn btn-secondary">↻ Reset</button>
    </div>
  </div>
</template>

<script>
import { calculateModifier, CHARACTER_RACES } from '../utils/rules1e.js'

export default {
  name: 'AbilityScores',
  props: {
    character: Object
  },
  data() {
    return {
      localChar: null,
      originalStats: null
    }
  },
  watch: {
    character: {
      immediate: true,
      handler() {
        this.localChar = JSON.parse(JSON.stringify(this.character))
        this.originalStats = JSON.parse(JSON.stringify(this.character.stats))
      }
    }
  },
  methods: {
    getModifier(ability) {
      return calculateModifier(ability)
    },
    getRacialMods() {
      const race = Object.values(CHARACTER_RACES).find(r => r.name === this.character.race)
      return race?.abilityMods || {}
    },
    updateAbility() {
      this.$emit('update', { stats: this.localChar.stats })
    },
    randomizeScores() {
      const scores = [15, 14, 13, 12, 10, 8].sort(() => Math.random() - 0.5)
      const abilities = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']
      abilities.forEach((ability, index) => {
        this.localChar.stats[ability] = scores[index]
      })
      this.updateAbility()
    },
    resetScores() {
      this.localChar.stats = JSON.parse(JSON.stringify(this.originalStats))
      this.updateAbility()
    }
  }
}
</script>

<style scoped>
.ability-scores {
  background: var(--bg-dark);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.ability-scores h3 {
  color: var(--primary);
  margin: 0 0 20px 0;
}

.abilities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.ability-box {
  background: var(--bg-light);
  border: 2px solid var(--primary);
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.ability-label {
  color: var(--text-muted);
  font-size: 11px;
  text-transform: uppercase;
  margin-bottom: 5px;
  letter-spacing: 1px;
}

.ability-input {
  width: 100%;
  padding: 8px;
  background: var(--bg-dark);
  border: 1px solid #444;
  color: var(--primary);
  border-radius: 4px;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
}

.ability-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
}

.ability-value {
  color: var(--primary);
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}

.ability-modifier {
  color: var(--accent-info);
  font-size: 12px;
  background: rgba(59, 130, 246, 0.1);
  padding: 3px;
  border-radius: 3px;
}

.ability-effects {
  background: var(--bg-light);
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.ability-effects h4 {
  margin: 0 0 10px 0;
  color: var(--primary);
  font-size: 14px;
}

.effects-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}

.effect-item {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  background: var(--bg-dark);
  border-radius: 3px;
  font-size: 13px;
}

.bonus {
  font-weight: bold;
}

.bonus.positive {
  color: var(--accent-success);
}

.bonus.negative {
  color: var(--accent-error);
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
  transition: all 0.2s;
}

.btn-secondary {
  background: var(--accent-info);
  color: #fff;
}

.btn-secondary:hover {
  background: #2563eb;
}
</style>