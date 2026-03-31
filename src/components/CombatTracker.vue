<template>
  <div class="combat-tracker">
    <div class="tracker-header">
      <h3>⚔️ Combat Tracker</h3>
      <button @click="startCombat" v-if="!inCombat" class="btn btn-primary">Start Combat</button>
      <button @click="endCombat" v-else class="btn btn-error">End Combat</button>
    </div>

    <div v-if="!inCombat" class="no-combat">
      <p>Click "Start Combat" to begin tracking</p>
    </div>

    <div v-else class="combat-content">
      <!-- Round Counter -->
      <div class="round-section">
        <div class="round-box">
          <label>Current Round</label>
          <div class="round-number">{{ currentRound }}</div>
          <div class="round-buttons">
            <button @click="nextRound" class="btn-action">Next Round ➡️</button>
            <button @click="previousRound" class="btn-action">Previous ⬅️</button>
          </div>
        </div>
      </div>

      <!-- Combatants -->
      <div class="combatants-section">
        <h4>Combatants (Initiative Order)</h4>
        <div class="add-combatant">
          <input 
            v-model="newCombatant.name" 
            type="text" 
            class="input-field"
            placeholder="Enemy/NPC name"
          >
          <input 
            v-model.number="newCombatant.hp" 
            type="number" 
            class="input-field"
            placeholder="HP"
            min="1"
          >
          <input 
            v-model.number="newCombatant.ac" 
            type="number" 
            class="input-field"
            placeholder="AC"
          >
          <input 
            v-model.number="newCombatant.initiative" 
            type="number" 
            class="input-field"
            placeholder="Initiative"
          >
          <button @click="addCombatant" class="btn btn-primary">Add</button>
        </div>

        <div class="combatants-list">
          <div 
            v-for="(combatant, idx) in sortedCombatants" 
            :key="idx"
            :class="['combatant-card', { active: currentTurnIdx === idx }]"
          >
            <div class="combatant-header">
              <h5>{{ combatant.name }}</h5>
              <span class="initiative">Init {{ combatant.initiative }}</span>
              <button @click="removeCombatant(idx)" class="btn-remove">✕</button>
            </div>

            <div class="combatant-stats">
              <div class="stat">
                <label>HP</label>
                <div class="hp-controls">
                  <button @click="damageCombatant(idx, 1)" class="btn-damage">-1</button>
                  <span class="hp-display">{{ combatant.hp }}/{{ combatant.maxHp }}</span>
                  <button @click="healCombatant(idx, 1)" class="btn-heal">+1</button>
                </div>
              </div>
              <div class="stat">
                <label>AC</label>
                <span class="ac-display">{{ combatant.ac }}</span>
              </div>
            </div>

            <div v-if="combatant.conditions && combatant.conditions.length > 0" class="conditions">
              <span v-for="cond in combatant.conditions" :key="cond" class="condition-badge">
                {{ cond }}
              </span>
            </div>

            <div class="combatant-actions">
              <button @click="toggleTurn(idx)" :class="['btn-turn', { active: currentTurnIdx === idx }]">
                {{ currentTurnIdx === idx ? '✓ Active' : 'Next Turn' }}
              </button>
              <select v-model="combatant.condition" @change="addCondition(idx, combatant.condition)" class="input-field">
                <option value="">Add Condition...</option>
                <option value="Stunned">Stunned</option>
                <option value="Poisoned">Poisoned</option>
                <option value="Bleeding">Bleeding</option>
                <option value="Charmed">Charmed</option>
                <option value="Frightened">Frightened</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Combat Log -->
      <div class="combat-log">
        <h4>Combat Log</h4>
        <div class="log-entries">
          <div v-for="(entry, idx) in combatLog" :key="idx" class="log-entry">
            <span class="log-round">R{{ entry.round }}:</span>
            <span class="log-text">{{ entry.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CombatTracker',
  props: {
    character: Object
  },
  data() {
    return {
      inCombat: false,
      currentRound: 1,
      currentTurnIdx: 0,
      combatants: [],
      newCombatant: {
        name: '',
        hp: 10,
        maxHp: 10,
        ac: 10,
        initiative: 0,
        conditions: []
      },
      combatLog: []
    }
  },
  computed: {
    sortedCombatants() {
      return [...this.combatants].sort((a, b) => b.initiative - a.initiative)
    }
  },
  methods: {
    startCombat() {
      this.inCombat = true
      this.currentRound = 1
      this.currentTurnIdx = 0
      this.combatants = []
      this.combatLog = []
      
      // Add player character to combat
      if (this.character) {
        this.combatants.push({
          name: this.character.name,
          hp: this.character.hitPoints,
          maxHp: this.character.maxHitPoints,
          ac: this.character.armorClass,
          initiative: 0,
          conditions: [],
          isPlayer: true
        })
      }

      this.addLog(`Combat started!`)
    },
    endCombat() {
      this.inCombat = false
      this.addLog(`Combat ended!`)
    },
    addCombatant() {
      if (!this.newCombatant.name) {
        alert('Please enter a name')
        return
      }

      this.combatants.push({
        name: this.newCombatant.name,
        hp: this.newCombatant.hp,
        maxHp: this.newCombatant.hp,
        ac: this.newCombatant.ac,
        initiative: this.newCombatant.initiative,
        conditions: [],
        isPlayer: false
      })

      this.addLog(`${this.newCombatant.name} joined combat (Init ${this.newCombatant.initiative})`)
      this.newCombatant = { name: '', hp: 10, maxHp: 10, ac: 10, initiative: 0, conditions: [] }
    },
    removeCombatant(idx) {
      const name = this.sortedCombatants[idx].name
      this.combatants = this.combatants.filter(c => c.name !== name)
      this.addLog(`${name} left combat`)
    },
    damageCombatant(idx, amount) {
      const combatant = this.sortedCombatants[idx]
      combatant.hp = Math.max(0, combatant.hp - amount)
      this.addLog(`${combatant.name} took ${amount} damage`)
    },
    healCombatant(idx, amount) {
      const combatant = this.sortedCombatants[idx]
      combatant.hp = Math.min(combatant.maxHp, combatant.hp + amount)
      this.addLog(`${combatant.name} healed ${amount} HP`)
    },
    toggleTurn(idx) {
      this.currentTurnIdx = idx
      const combatant = this.sortedCombatants[idx]
      this.addLog(`${combatant.name}'s turn!`)
    },
    nextRound() {
      this.currentRound++
      this.currentTurnIdx = 0
      this.addLog(`Round ${this.currentRound} started!`)
    },
    previousRound() {
      if (this.currentRound > 1) {
        this.currentRound--
        this.addLog(`Rewound to Round ${this.currentRound}`)
      }
    },
    addCondition(idx, condition) {
      if (!condition) return
      const combatant = this.sortedCombatants[idx]
      if (!combatant.conditions) combatant.conditions = []
      combatant.conditions.push(condition)
      this.addLog(`${combatant.name} is now ${condition}`)
    },
    addLog(text) {
      this.combatLog.push({
        round: this.currentRound,
        text: text
      })
    }
  }
}
</script>

<style scoped>
.combat-tracker {
  background: var(--bg-dark);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.tracker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid var(--primary);
}

.tracker-header h3 {
  margin: 0;
  color: var(--primary);
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.btn-primary {
  background: var(--primary);
  color: #000;
}

.btn-error {
  background: var(--accent-error);
  color: #fff;
}

.no-combat {
  text-align: center;
  padding: 30px;
  color: var(--text-muted);
}

.combat-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.round-section {
  display: flex;
  justify-content: center;
}

.round-box {
  background: var(--bg-light);
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  border: 3px solid var(--primary);
}

.round-box label {
  display: block;
  color: var(--text-muted);
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.round-number {
  color: var(--primary);
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 15px;
}

.round-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.btn-action {
  padding: 10px 15px;
  background: var(--accent-info);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.btn-action:hover {
  background: #2563eb;
}

.combatants-section {
  background: var(--bg-light);
  padding: 15px;
  border-radius: 4px;
}

.combatants-section h4 {
  margin: 0 0 15px 0;
  color: var(--primary);
}

.add-combatant {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr auto;
  gap: 10px;
  margin-bottom: 15px;
  align-items: flex-end;
}

.input-field {
  padding: 8px 12px;
  background: var(--bg-dark);
  border: 1px solid #444;
  color: var(--text);
  border-radius: 4px;
}

.combatants-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
}

.combatant-card {
  background: var(--bg-dark);
  padding: 15px;
  border-radius: 4px;
  border-left: 4px solid #444;
}

.combatant-card.active {
  border-left-color: var(--primary);
  background: rgba(255, 215, 0, 0.05);
}

.combatant-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid #444;
}

.combatant-header h5 {
  margin: 0;
  color: var(--primary);
}

.initiative {
  background: var(--accent-info);
  color: #fff;
  padding: 2px 8px;
  border-radius: 3px;
  font-size: 11px;
}

.btn-remove {
  background: var(--accent-error);
  color: #fff;
  border: none;
  padding: 4px 6px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
}

.combatant-stats {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #444;
}

.stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 13px;
}

.stat label {
  color: var(--text-muted);
  font-weight: 500;
}

.hp-controls {
  display: flex;
  gap: 5px;
  align-items: center;
}

.btn-damage, .btn-heal {
  padding: 4px 6px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 500;
}

.btn-damage {
  background: var(--accent-error);
  color: #fff;
}

.btn-heal {
  background: var(--accent-success);
  color: #000;
}

.hp-display {
  color: var(--primary);
  font-weight: bold;
  font-size: 12px;
}

.ac-display {
  color: var(--accent-info);
  font-weight: bold;
}

.conditions {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 10px;
}

.condition-badge {
  background: var(--accent-error);
  color: #fff;
  padding: 3px 8px;
  border-radius: 3px;
  font-size: 11px;
  font-weight: 500;
}

.combatant-actions {
  display: flex;
  gap: 5px;
}

.btn-turn {
  flex: 1;
  padding: 6px 8px;
  background: var(--bg-light);
  border: 1px solid #444;
  color: var(--text);
  border-radius: 3px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 500;
}

.btn-turn.active {
  background: var(--primary);
  color: #000;
  border-color: var(--primary);
}

.combat-log {
  background: var(--bg-light);
  padding: 15px;
  border-radius: 4px;
}

.combat-log h4 {
  margin: 0 0 10px 0;
  color: var(--primary);
}

.log-entries {
  background: var(--bg-dark);
  padding: 10px;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  font-size: 12px;
}

.log-entry {
  padding: 5px 0;
  border-bottom: 1px solid #444;
  color: var(--text-muted);
}

.log-entry:last-child {
  border-bottom: none;
}

.log-round {
  color: var(--primary);
  font-weight: bold;
  margin-right: 5px;
}

.log-text {
  color: var(--text);
}
</style>