<template>
  <div class="dice-roller">
    <div class="roller-header">
      <h3>🎲 Dice Roller</h3>
    </div>

    <div class="roller-content">
      <div class="input-section">
        <label>Dice Notation</label>
        <input 
          v-model="diceNotation" 
          type="text" 
          class="input-field"
          placeholder="e.g., 2d6+3, 1d20-2, 3d8"
          @keyup.enter="roll"
        >
        <p class="help-text">Format: [number]d[size][+/-modifier]</p>
      </div>

      <div class="quick-roll-buttons">
        <button v-for="notation in quickRolls" :key="notation" @click="diceNotation = notation; roll()" class="quick-btn">
          {{ notation }}
        </button>
      </div>

      <button @click="roll" class="btn btn-primary roll-btn">Roll Dice</button>

      <div v-if="lastRoll" class="roll-result">
        <div class="result-header">
          <h4>{{ lastRoll.notation }}</h4>
          <button @click="copyResult" class="btn-copy">📋 Copy</button>
        </div>

        <div class="result-display">
          <div class="rolls-detail">
            <span v-for="(r, idx) in lastRoll.rolls" :key="idx" class="roll-value">
              {{ r }}
            </span>
          </div>

          <div v-if="lastRoll.modifier !== 0" class="modifier-display">
            {{ lastRoll.modifier > 0 ? '+' : '' }}{{ lastRoll.modifier }}
          </div>
        </div>

        <div class="result-stats">
          <div class="stat-item">
            <span class="label">Sum of Dice:</span>
            <span class="value">{{ lastRoll.subtotal }}</span>
          </div>
          <div class="stat-item">
            <span class="label">Total:</span>
            <span class="value total">{{ lastRoll.total }}</span>
          </div>
          <div class="stat-item">
            <span class="label">Average:</span>
            <span class="value">{{ lastRoll.average }}</span>
          </div>
        </div>
      </div>

      <div v-if="rollHistory.length > 0" class="history-section">
        <h4>Roll History</h4>
        <div class="history-list">
          <div v-for="(roll, idx) in rollHistory.slice(-5)" :key="idx" class="history-item">
            <span class="history-notation">{{ roll.notation }}</span>
            <span class="history-total">= {{ roll.total }}</span>
            <button @click="removeFromHistory(idx)" class="btn-history-remove">✕</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DiceRoller } from '../utils/diceRoller.js'

export default {
  name: 'DiceRoller',
  data() {
    return {
      diceNotation: '1d20',
      lastRoll: null,
      rollHistory: [],
      quickRolls: ['1d4', '1d6', '1d8', '1d10', '1d12', '1d20', '2d6', '3d6', '4d6', '2d20']
    }
  },
  methods: {
    roll() {
      if (!this.diceNotation.trim()) {
        alert('Please enter a dice notation')
        return
      }

      const result = DiceRoller.roll(this.diceNotation)
      
      if (result.error) {
        alert(`Error: ${result.error}`)
        return
      }

      this.lastRoll = result
      this.rollHistory.push(result)
    },
    copyResult() {
      if (!this.lastRoll) return
      
      const text = `${this.lastRoll.notation} = ${this.lastRoll.total}`
      navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!')
      })
    },
    removeFromHistory(idx) {
      this.rollHistory.splice(idx, 1)
    }
  }
}
</script>

<style scoped>
.dice-roller {
  background: var(--bg-dark);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.roller-header {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid var(--primary);
}

.roller-header h3 {
  margin: 0;
  color: var(--primary);
}

.roller-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-section {
  background: var(--bg-light);
  padding: 15px;
  border-radius: 4px;
}

.input-section label {
  display: block;
  color: var(--text);
  margin-bottom: 8px;
  font-weight: 500;
}

.input-field {
  width: 100%;
  padding: 10px 12px;
  background: var(--bg-dark);
  border: 2px solid var(--primary);
  color: var(--primary);
  border-radius: 4px;
  font-size: 16px;
  font-family: monospace;
}

.input-field:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.2);
}

.help-text {
  margin: 5px 0 0 0;
  color: var(--text-muted);
  font-size: 12px;
}

.quick-roll-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.quick-btn {
  padding: 8px 12px;
  background: var(--bg-light);
  border: 1px solid #444;
  color: var(--text);
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  font-family: monospace;
}

.quick-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.roll-btn {
  padding: 12px 24px;
  background: var(--primary);
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: all 0.2s;
}

.roll-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

.roll-result {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
  border: 2px solid var(--primary);
  padding: 20px;
  border-radius: 8px;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.result-header h4 {
  margin: 0;
  color: var(--primary);
  font-family: monospace;
}

.btn-copy {
  background: var(--accent-info);
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.btn-copy:hover {
  background: #2563eb;
}

.result-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
}

.rolls-detail {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  justify-content: center;
}

.roll-value {
  display: inline-block;
  width: 40px;
  height: 40px;
  background: var(--bg-light);
  border: 2px solid var(--primary);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  font-weight: bold;
  font-size: 16px;
}

.modifier-display {
  color: var(--text);
  font-size: 18px;
  font-weight: bold;
}

.result-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  background: var(--bg-light);
  padding: 10px;
  border-radius: 4px;
  text-align: center;
}

.stat-item .label {
  color: var(--text-muted);
  font-size: 12px;
  margin-bottom: 5px;
}

.stat-item .value {
  color: var(--accent-info);
  font-size: 18px;
  font-weight: bold;
}

.stat-item .value.total {
  color: var(--primary);
  font-size: 24px;
}

.history-section {
  background: var(--bg-light);
  padding: 15px;
  border-radius: 4px;
}

.history-section h4 {
  margin: 0 0 10px 0;
  color: var(--primary);
  font-size: 13px;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-dark);
  padding: 8px;
  border-radius: 3px;
  font-size: 13px;
  font-family: monospace;
}

.history-notation {
  color: var(--text-muted);
}

.history-total {
  color: var(--primary);
  font-weight: bold;
}

.btn-history-remove {
  background: none;
  border: none;
  color: var(--accent-error);
  cursor: pointer;
  font-size: 12px;
}

.btn-history-remove:hover {
  opacity: 0.7;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary {
  background: var(--primary);
  color: #000;
}

.btn-primary:hover {
  background: var(--primary-dark);
}
</style>