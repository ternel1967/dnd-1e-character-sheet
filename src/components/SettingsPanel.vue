<template>
  <div class="settings-panel">
    <div class="settings-header">
      <h3>⚙️ Settings</h3>
    </div>

    <div class="settings-content">
      <!-- Theme Toggle -->
      <div class="setting-group">
        <h4>Appearance</h4>
        <div class="setting-item">
          <label>Dark Mode</label>
          <button @click="toggleTheme" :class="['theme-toggle', { active: isDarkMode }]">
            {{ isDarkMode ? '🌙 Dark' : '☀️ Light' }}
          </button>
        </div>
      </div>

      <!-- Auto-Save -->
      <div class="setting-group">
        <h4>Auto-Save</h4>
        <div class="setting-item">
          <label>Auto-Save Interval</label>
          <select v-model.number="autoSaveInterval" class="input-field">
            <option value="0">Disabled</option>
            <option value="30000">30 seconds</option>
            <option value="60000">1 minute</option>
            <option value="300000">5 minutes</option>
          </select>
        </div>
        <p class="last-save" v-if="lastSaveTime">Last saved: {{ lastSaveTime }}</p>
      </div>

      <!-- Dice History -->
      <div class="setting-group">
        <h4>Dice Roll History</h4>
        <div class="dice-history">
          <div v-if="diceHistory.length > 0" class="history-list">
            <div v-for="(roll, idx) in diceHistory.slice(-10)" :key="idx" class="history-item">
              <span class="roll-notation">{{ roll.notation }}</span>
              <span class="roll-result">= {{ roll.total }}</span>
              <span class="roll-time">{{ roll.time }}</span>
            </div>
          </div>
          <div v-else class="empty">No rolls yet</div>
        </div>
        <button @click="clearDiceHistory" class="btn btn-secondary" v-if="diceHistory.length > 0">
          Clear History
        </button>
      </div>

      <!-- Backups -->
      <div class="setting-group">
        <h4>Backups & Export</h4>
        <div class="backup-actions">
          <button @click="createBackup" class="btn btn-action">💾 Create Backup</button>
          <button @click="downloadBackup" class="btn btn-action">⬇️ Download All</button>
          <button @click="exportStatistics" class="btn btn-action">📊 Export Stats</button>
        </div>
      </div>

      <!-- Storage Info -->
      <div class="setting-group">
        <h4>Storage</h4>
        <div class="storage-info">
          <p>Characters stored: {{ storageInfo.characters }}</p>
          <p>Storage used: {{ storageInfo.used }} KB</p>
          <button @click="clearAllData" class="btn btn-error">🗑️ Clear All Data</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingsPanel',
  props: {
    characters: Array,
    diceHistory: Array
  },
  data() {
    return {
      isDarkMode: true,
      autoSaveInterval: 60000,
      lastSaveTime: null,
      autoSaveTimer: null
    }
  },
  computed: {
    storageInfo() {
      const stored = JSON.stringify(this.characters || []).length
      return {
        characters: this.characters?.length || 0,
        used: (stored / 1024).toFixed(2)
      }
    }
  },
  watch: {
    autoSaveInterval(newVal) {
      this.setAutoSave(newVal)
      localStorage.setItem('autoSaveInterval', newVal)
    }
  },
  mounted() {
    this.isDarkMode = localStorage.getItem('theme') !== 'light'
    this.autoSaveInterval = parseInt(localStorage.getItem('autoSaveInterval') || '60000')
  },
  methods: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode
      const theme = this.isDarkMode ? 'dark' : 'light'
      localStorage.setItem('theme', theme)
      document.documentElement.setAttribute('data-theme', theme)
    },
    setAutoSave(interval) {
      if (this.autoSaveTimer) clearInterval(this.autoSaveTimer)
      if (interval > 0) {
        this.autoSaveTimer = setInterval(() => {
          this.$emit('auto-save')
          this.lastSaveTime = new Date().toLocaleTimeString()
        }, interval)
      }
    },
    clearDiceHistory() {
      if (confirm('Clear all dice roll history?')) {
        this.$emit('clear-dice-history')
      }
    },
    createBackup() {
      const backup = {
        timestamp: new Date().toISOString(),
        characters: this.characters
      }
      localStorage.setItem(`backup_${Date.now()}`, JSON.stringify(backup))
      alert('Backup created!')
    },
    downloadBackup() {
      const backup = {
        characters: this.characters,
        diceHistory: this.diceHistory,
        exportDate: new Date().toISOString()
      }
      const json = JSON.stringify(backup, null, 2)
      const element = document.createElement('a')
      element.setAttribute('href', `data:application/json;charset=utf-8,${encodeURIComponent(json)}`)
      element.setAttribute('download', `dnd-backup-${Date.now()}.json`)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    },
    exportStatistics() {
      const stats = {
        totalCharacters: this.characters?.length || 0,
        totalRolls: this.diceHistory?.length || 0,
        averageCharacterLevel: this.getAverageLevel(),
        exportDate: new Date().toISOString()
      }
      const json = JSON.stringify(stats, null, 2)
      alert('Statistics:\n' + json)
    },
    getAverageLevel() {
      if (!this.characters || this.characters.length === 0) return 0
      const total = this.characters.reduce((sum, char) => sum + char.level, 0)
      return (total / this.characters.length).toFixed(1)
    },
    clearAllData() {
      if (confirm('This will delete all characters and settings. Are you sure?')) {
        localStorage.clear()
        this.$emit('clear-all')
        alert('All data cleared!')
      }
    }
  }
}
</script>

<style scoped>
.settings-panel {
  background: var(--bg-dark);
  padding: 20px;
  border-radius: 8px;
}

.settings-header {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid var(--primary);
}

.settings-header h3 {
  margin: 0;
  color: var(--primary);
}

.settings-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.setting-group {
  background: var(--bg-light);
  padding: 15px;
  border-radius: 4px;
}

.setting-group h4 {
  margin: 0 0 15px 0;
  color: var(--primary);
  font-size: 14px;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.setting-item label {
  color: var(--text);
  font-weight: 500;
}

.theme-toggle {
  padding: 8px 16px;
  background: var(--bg-dark);
  border: 2px solid #444;
  color: var(--text);
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
}

.theme-toggle:hover {
  border-color: var(--primary);
}

.theme-toggle.active {
  background: var(--primary);
  color: #000;
  border-color: var(--primary);
}

.input-field {
  padding: 8px 12px;
  background: var(--bg-dark);
  border: 1px solid #444;
  color: var(--text);
  border-radius: 4px;
}

.last-save {
  color: var(--text-muted);
  font-size: 12px;
  margin: 10px 0 0 0;
}

.dice-history {
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 10px;
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
  padding: 8px;
  background: var(--bg-dark);
  border-radius: 3px;
  font-size: 12px;
}

.roll-notation {
  color: var(--text-muted);
  font-family: monospace;
}

.roll-result {
  color: var(--primary);
  font-weight: bold;
}

.roll-time {
  color: var(--text-muted);
  font-size: 10px;
}

.empty {
  text-align: center;
  padding: 20px;
  color: var(--text-muted);
  font-size: 12px;
}

.backup-actions {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  font-size: 13px;
}

.btn-action {
  background: var(--accent-info);
  color: #fff;
}

.btn-action:hover {
  background: #2563eb;
}

.btn-secondary {
  background: #555;
  color: var(--text);
}

.btn-secondary:hover {
  background: #666;
}

.btn-error {
  background: var(--accent-error);
  color: #fff;
}

.btn-error:hover {
  background: #dc2626;
}

.storage-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.storage-info p {
  color: var(--text-muted);
  font-size: 13px;
  margin: 0;
}
</style>