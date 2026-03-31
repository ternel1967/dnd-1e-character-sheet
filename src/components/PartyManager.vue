<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>👥 Party Manager</h2>
        <button @click="$emit('close')" class="close-btn">✕</button>
      </div>

      <div class="modal-body">
        <div class="party-stats">
          <div class="stat-box">
            <div class="stat-label">Total Members</div>
            <div class="stat-value">{{ characters.length }}</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">Party Level</div>
            <div class="stat-value">{{ averageLevel }}</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">Combined Gold</div>
            <div class="stat-value">{{ totalGold }}</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">Party HP</div>
            <div class="stat-value">{{ totalHP }}/{{ totalMaxHP }}</div>
          </div>
        </div>

        <div class="party-list">
          <h3>Party Members</h3>
          <div v-if="characters.length > 0" class="members">
            <div v-for="char in characters" :key="char.id" class="member-card">
              <div class="member-header">
                <h4>{{ char.name }}</h4>
                <span class="member-level">Lvl {{ char.level }}</span>
              </div>
              
              <div class="member-info">
                <p><strong>Race/Class:</strong> {{ char.subrace || char.race }}</p>
                <p v-if="!char.isMulticlass">
                  <strong>Class:</strong> {{ char.classes[0].class }}
                </p>
                <p v-else>
                  <strong>Classes:</strong>
                  <span v-for="(cls, idx) in char.classes" :key="idx">
                    {{ cls.class }} {{ cls.level }}<span v-if="idx < char.classes.length - 1">, </span>
                  </span>
                </p>
                <p><strong>HP:</strong> {{ char.hitPoints }}/{{ char.maxHitPoints }}</p>
                <p><strong>AC:</strong> {{ char.armorClass }}</p>
                <p><strong>Gold:</strong> {{ char.gold }} gp</p>
              </div>

              <div class="member-actions">
                <button @click="selectMember(char.id)" class="btn-select">View</button>
                <button @click="healMember(char.id)" class="btn-heal">🏥 Heal</button>
                <button @click="restMember(char.id)" class="btn-rest">💤 Rest</button>
                <button @click="exportMember(char)" class="btn-export">💾 Export</button>
              </div>
            </div>
          </div>
          <div v-else class="no-members">
            <p>No characters in party</p>
          </div>
        </div>

        <div class="party-actions">
          <h3>Party Actions</h3>
          <div class="actions-grid">
            <button @click="longRest" class="btn btn-action">🌙 Long Rest (Everyone)</button>
            <button @click="shortRest" class="btn btn-action">☕ Short Rest (Everyone)</button>
            <button @click="poolGold" class="btn btn-action">💰 Pool Gold</button>
            <button @click="distributeGold" class="btn btn-action">📦 Distribute Gold</button>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button @click="$emit('close')" class="btn btn-secondary">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { exportCharacterToJSON } from '../utils/characterExport.js'

export default {
  name: 'PartyManager',
  props: {
    characters: Array
  },
  computed: {
    averageLevel() {
      if (this.characters.length === 0) return 0
      const total = this.characters.reduce((sum, char) => sum + char.level, 0)
      return Math.round(total / this.characters.length)
    },
    totalGold() {
      return this.characters.reduce((sum, char) => sum + (char.gold || 0), 0)
    },
    totalHP() {
      return this.characters.reduce((sum, char) => sum + char.hitPoints, 0)
    },
    totalMaxHP() {
      return this.characters.reduce((sum, char) => sum + char.maxHitPoints, 0)
    }
  },
  data() {
    return {
      pooledGold: 0
    }
  },
  methods: {
    selectMember(id) {
      this.$emit('select', id)
    },
    healMember(id) {
      const char = this.characters.find(c => c.id === id)
      if (char) {
        char.hitPoints = char.maxHitPoints
        this.$forceUpdate()
      }
    },
    restMember(id) {
      const char = this.characters.find(c => c.id === id)
      if (char) {
        char.hitPoints = char.maxHitPoints
        if (char.spellSlots) {
          Object.keys(char.spellSlots).forEach(level => {
            char.spellSlots[level] = 0
          })
        }
        this.$forceUpdate()
      }
    },
    exportMember(char) {
      exportCharacterToJSON(char)
    },
    longRest() {
      this.characters.forEach(char => {
        char.hitPoints = char.maxHitPoints
        if (char.spellSlots) {
          Object.keys(char.spellSlots).forEach(level => {
            char.spellSlots[level] = 0
          })
        }
      })
      this.$forceUpdate()
      alert('Party completed long rest!')
    },
    shortRest() {
      this.characters.forEach(char => {
        char.hitPoints = Math.min(char.maxHitPoints, char.hitPoints + Math.floor(char.maxHitPoints / 4))
      })
      this.$forceUpdate()
      alert('Party completed short rest!')
    },
    poolGold() {
      this.pooledGold = this.totalGold
      const goldPerChar = Math.floor(this.pooledGold / this.characters.length)
      this.characters.forEach(char => {
        char.gold = goldPerChar
      })
      this.$forceUpdate()
      alert(`Gold pooled and distributed equally: ${goldPerChar} gp each`)
    },
    distributeGold() {
      const totalGold = prompt('Enter total gold to distribute:', this.totalGold.toString())
      if (totalGold === null) return
      
      const amount = parseInt(totalGold)
      if (isNaN(amount)) {
        alert('Invalid amount')
        return
      }

      const perChar = Math.floor(amount / this.characters.length)
      const remainder = amount % this.characters.length

      this.characters.forEach((char, idx) => {
        char.gold = perChar + (idx < remainder ? 1 : 0)
      })
      this.$forceUpdate()
      alert(`Distributed ${amount} gold: ${perChar} gp each`)
    },
    closeModal() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--bg-light);
  border: 2px solid var(--primary);
  border-radius: 8px;
  width: 90%;
  max-width: 1000px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 2px solid var(--primary);
  background: var(--bg-dark);
}

.modal-header h2 {
  margin: 0;
  color: var(--primary);
}

.close-btn {
  background: none;
  border: none;
  color: var(--text);
  font-size: 24px;
  cursor: pointer;
}

.close-btn:hover {
  color: var(--accent-error);
}

.modal-body {
  padding: 20px;
  flex: 1;
  overflow-y: auto;
}

.party-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
}

.stat-box {
  background: var(--bg-dark);
  padding: 15px;
  border-radius: 4px;
  border-left: 4px solid var(--primary);
  text-align: center;
}

.stat-label {
  color: var(--text-muted);
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.stat-value {
  color: var(--primary);
  font-size: 24px;
  font-weight: bold;
}

.party-list {
  margin-bottom: 30px;
}

.party-list h3 {
  color: var(--primary);
  margin: 0 0 15px 0;
  border-bottom: 2px solid #444;
  padding-bottom: 10px;
}

.members {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
}

.member-card {
  background: var(--bg-dark);
  padding: 15px;
  border-radius: 4px;
  border-left: 3px solid var(--primary);
}

.member-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #444;
}

.member-header h4 {
  margin: 0;
  color: var(--primary);
}

.member-level {
  background: var(--primary);
  color: #000;
  padding: 4px 8px;
  border-radius: 3px;
  font-weight: bold;
  font-size: 12px;
}

.member-info {
  margin-bottom: 12px;
  font-size: 13px;
}

.member-info p {
  margin: 5px 0;
  color: var(--text-muted);
}

.member-info strong {
  color: var(--text);
}

.member-actions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
}

.btn-select, .btn-heal, .btn-rest, .btn-export {
  padding: 6px 8px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-select {
  background: var(--accent-info);
  color: #fff;
}

.btn-select:hover {
  background: #2563eb;
}

.btn-heal {
  background: var(--accent-success);
  color: #000;
}

.btn-heal:hover {
  background: #22c55e;
}

.btn-rest {
  background: #8b5cf6;
  color: #fff;
}

.btn-rest:hover {
  background: #7c3aed;
}

.btn-export {
  background: #ec4899;
  color: #fff;
}

.btn-export:hover {
  background: #db2777;
}

.no-members {
  text-align: center;
  padding: 30px;
  color: var(--text-muted);
}

.party-actions {
  background: var(--bg-dark);
  padding: 15px;
  border-radius: 4px;
}

.party-actions h3 {
  margin: 0 0 15px 0;
  color: var(--primary);
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-action {
  background: var(--accent-info);
  color: #fff;
}

.btn-action:hover {
  background: #2563eb;
}

.modal-footer {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding: 20px;
  border-top: 1px solid #444;
  background: var(--bg-dark);
}

.btn-secondary {
  background: #555;
  color: var(--text);
}

.btn-secondary:hover {
  background: #666;
}
</style>