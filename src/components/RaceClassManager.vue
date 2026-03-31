<template>
  <div class="race-class-manager">
    <div class="manager-header">
      <h3>🎨 Manage Races & Classes</h3>
    </div>

    <div class="manager-content">
      <!-- Races Section -->
      <div class="section">
        <div class="section-header">
          <h4>Races</h4>
          <button @click="showAddRace = !showAddRace" class="btn btn-secondary">
            {{ showAddRace ? '✕' : '➕ Add Race' }}
          </button>
        </div>

        <!-- Add New Race Form -->
        <div v-if="showAddRace" class="add-form">
          <input 
            v-model="newRace.name" 
            type="text" 
            class="input-field"
            placeholder="Race name"
          >
          <div class="form-row">
            <select v-model="newRace.abilityMod" class="input-field">
              <option value="">Select Ability Mod</option>
              <option v-for="ability in abilities" :key="ability" :value="ability">
                {{ ability }}
              </option>
            </select>
            <input 
              v-model.number="newRace.abilityModValue" 
              type="number" 
              class="input-field"
              placeholder="Mod value"
            >
          </div>
          <button @click="addNewRace" class="btn btn-primary">Add Race</button>
        </div>

        <!-- Existing Races -->
        <div class="items-list">
          <div v-for="(race, key) in availableRaces" :key="key" class="item-card">
            <div class="item-header">
              <h5>{{ race.name }}</h5>
              <button @click="toggleRaceExpand(key)" class="btn-expand">
                {{ expandedRace === key ? '▼' : '▶' }}
              </button>
            </div>

            <div v-if="expandedRace === key" class="item-details">
              <p><strong>Ability Modifiers:</strong></p>
              <div class="mod-display">
                <span v-for="(value, ability) in race.abilityMods" :key="ability">
                  {{ ability }}: {{ value > 0 ? '+' : '' }}{{ value }}
                </span>
              </div>

              <!-- Sub-races -->
              <div class="subraces-section">
                <h6>Sub-races ({{ race.subraces.length }})</h6>
                <div class="subraces-list">
                  <div v-for="(subrace, idx) in race.subraces" :key="idx" class="subrace-item">
                    <span>{{ subrace.name }}</span>
                    <button @click="deleteSubrace(key, idx)" class="btn-delete">✕</button>
                  </div>
                </div>

                <!-- Add Subrace Form -->
                <div class="add-subrace">
                  <input 
                    v-model="newSubrace[key]" 
                    type="text" 
                    class="input-field"
                    placeholder="New sub-race name"
                  >
                  <button @click="addSubrace(key)" class="btn btn-primary">Add</button>
                </div>
              </div>

              <button @click="deleteRace(key)" class="btn btn-error">Delete Race</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Classes Section -->
      <div class="section">
        <div class="section-header">
          <h4>Classes</h4>
          <button @click="showAddClass = !showAddClass" class="btn btn-secondary">
            {{ showAddClass ? '✕' : '➕ Add Class' }}
          </button>
        </div>

        <!-- Add New Class Form -->
        <div v-if="showAddClass" class="add-form">
          <input 
            v-model="newClass.name" 
            type="text" 
            class="input-field"
            placeholder="Class name"
          >
          <select v-model="newClass.hitDice" class="input-field">
            <option value="">Select Hit Die</option>
            <option value="1d4">1d4</option>
            <option value="1d6">1d6</option>
            <option value="1d8">1d8</option>
            <option value="1d10">1d10</option>
            <option value="1d12">1d12</option>
          </select>
          <input 
            v-model.number="newClass.thac0Base" 
            type="number" 
            class="input-field"
            placeholder="Base THAC0"
          >
          <button @click="addNewClass" class="btn btn-primary">Add Class</button>
        </div>

        <!-- Existing Classes -->
        <div class="items-list">
          <div v-for="(cls, key) in availableClasses" :key="key" class="item-card">
            <div class="item-header">
              <h5>{{ cls.name }}</h5>
              <button @click="toggleClassExpand(key)" class="btn-expand">
                {{ expandedClass === key ? '▼' : '▶' }}
              </button>
            </div>

            <div v-if="expandedClass === key" class="item-details">
              <p><strong>Hit Die:</strong> {{ cls.hitDice }}</p>
              <p><strong>Base THAC0:</strong> {{ cls.thac0Base }}</p>
              <button @click="deleteClass(key)" class="btn btn-error">Delete Class</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Import/Export Custom Content -->
      <div class="section">
        <div class="section-header">
          <h4>Backup Custom Content</h4>
        </div>

        <div class="backup-actions">
          <button @click="exportCustomContent" class="btn btn-action">📄 Export</button>
          <button @click="importCustomContent" class="btn btn-action">📂 Import</button>
          <input 
            ref="fileInput" 
            type="file" 
            accept=".json" 
            style="display: none"
            @change="handleImportContent"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CHARACTER_CLASSES, CHARACTER_RACES } from '../utils/rules1e.js'

export default {
  name: 'RaceClassManager',
  data() {
    return {
      availableRaces: { ...CHARACTER_RACES },
      availableClasses: { ...CHARACTER_CLASSES },
      showAddRace: false,
      showAddClass: false,
      expandedRace: null,
      expandedClass: null,
      abilities: ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'],
      newRace: {
        name: '',
        abilityMod: '',
        abilityModValue: 0
      },
      newClass: {
        name: '',
        hitDice: '1d8',
        thac0Base: 10
      },
      newSubrace: {}
    }
  },
  methods: {
    addNewRace() {
      if (!this.newRace.name) {
        alert('Please enter a race name')
        return
      }

      const mods = {}
      if (this.newRace.abilityMod) {
        mods[this.newRace.abilityMod] = this.newRace.abilityModValue
      }

      const key = this.newRace.name.toUpperCase().replace(/\s/g, '_')
      this.availableRaces[key] = {
        name: this.newRace.name,
        subraces: [{ name: this.newRace.name, abilityMods: {} }],
        abilityMods: mods,
        restrictions: []
      }

      this.saveCustomContent()
      this.newRace = { name: '', abilityMod: '', abilityModValue: 0 }
      this.showAddRace = false
      alert('Race added successfully!')
      this.$emit('update-races', this.availableRaces)
    },
    addSubrace(raceKey) {
      const subraceNames = this.newSubrace[raceKey]
      if (!subraceNames) {
        alert('Please enter a sub-race name')
        return
      }

      this.availableRaces[raceKey].subraces.push({
        name: subraceNames,
        abilityMods: {}
      })

      this.$set(this.newSubrace, raceKey, '')
      this.saveCustomContent()
      alert('Sub-race added!')
      this.$emit('update-races', this.availableRaces)
    },
    deleteSubrace(raceKey, idx) {
      this.availableRaces[raceKey].subraces.splice(idx, 1)
      this.saveCustomContent()
      this.$emit('update-races', this.availableRaces)
    },
    deleteRace(key) {
      if (confirm('Delete this race?')) {
        delete this.availableRaces[key]
        this.saveCustomContent()
        this.$emit('update-races', this.availableRaces)
      }
    },
    toggleRaceExpand(key) {
      this.expandedRace = this.expandedRace === key ? null : key
    },
    addNewClass() {
      if (!this.newClass.name || !this.newClass.hitDice) {
        alert('Please fill in all fields')
        return
      }

      const key = this.newClass.name.toUpperCase().replace(/\s/g, '_')
      this.availableClasses[key] = {
        name: this.newClass.name,
        hitDice: this.newClass.hitDice,
        thac0Base: this.newClass.thac0Base
      }

      this.saveCustomContent()
      this.newClass = { name: '', hitDice: '1d8', thac0Base: 10 }
      this.showAddClass = false
      alert('Class added successfully!')
      this.$emit('update-classes', this.availableClasses)
    },
    deleteClass(key) {
      if (confirm('Delete this class?')) {
        delete this.availableClasses[key]
        this.saveCustomContent()
        this.$emit('update-classes', this.availableClasses)
      }
    },
    toggleClassExpand(key) {
      this.expandedClass = this.expandedClass === key ? null : key
    },
    saveCustomContent() {
      const content = {
        races: this.availableRaces,
        classes: this.availableClasses
      }
      localStorage.setItem('custom_races_classes', JSON.stringify(content))
    },
    loadCustomContent() {
      const stored = localStorage.getItem('custom_races_classes')
      if (stored) {
        try {
          const content = JSON.parse(stored)
          if (content.races) {
            this.availableRaces = { ...CHARACTER_RACES, ...content.races }
          }
          if (content.classes) {
            this.availableClasses = { ...CHARACTER_CLASSES, ...content.classes }
          }
        } catch (error) {
          console.error('Failed to load custom content:', error)
        }
      }
    },
    exportCustomContent() {
      const content = {
        races: this.availableRaces,
        classes: this.availableClasses,
        exportDate: new Date().toISOString()
      }
      const json = JSON.stringify(content, null, 2)
      const element = document.createElement('a')
      element.setAttribute('href', `data:application/json;charset=utf-8,${encodeURIComponent(json)}`)
      element.setAttribute('download', `dnd-custom-content-${Date.now()}.json`)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      alert('Custom content exported!')
    },
    importCustomContent() {
      this.$refs.fileInput.click()
    },
    handleImportContent(event) {
      const file = event.target.files[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const content = JSON.parse(e.target.result)
          if (content.races) {
            this.availableRaces = { ...this.availableRaces, ...content.races }
          }
          if (content.classes) {
            this.availableClasses = { ...this.availableClasses, ...content.classes }
          }
          this.saveCustomContent()
          alert('Custom content imported!')
          this.$emit('update-races', this.availableRaces)
          this.$emit('update-classes', this.availableClasses)
        } catch (error) {
          alert('Failed to import: ' + error.message)
        }
      }
      reader.readAsText(file)
    }
  },
  mounted() {
    this.loadCustomContent()
  }
}
</script>

<style scoped>
.race-class-manager {
  background: var(--bg-dark);
  padding: 20px;
  border-radius: 8px;
}

.manager-header {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid var(--primary);
}

.manager-header h3 {
  margin: 0;
  color: var(--primary);
}

.manager-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
}

.section {
  background: var(--bg-light);
  padding: 15px;
  border-radius: 4px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #444;
}

.section-header h4 {
  margin: 0;
  color: var(--primary);
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  font-size: 12px;
}

.btn-secondary {
  background: var(--accent-info);
  color: #fff;
}

.btn-secondary:hover {
  background: #2563eb;
}

.add-form {
  background: var(--bg-dark);
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 8px;
}

.input-field {
  padding: 8px 12px;
  background: var(--bg-darker);
  border: 1px solid #444;
  color: var(--text);
  border-radius: 4px;
  font-family: inherit;
}

.btn-primary {
  background: var(--primary);
  color: #000;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.item-card {
  background: var(--bg-dark);
  padding: 12px;
  border-radius: 4px;
  border-left: 3px solid var(--primary);
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.item-header h5 {
  margin: 0;
  color: var(--primary);
  font-size: 14px;
}

.btn-expand {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 12px;
}

.item-details {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #555;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item-details p {
  margin: 0;
  color: var(--text-muted);
  font-size: 12px;
}

.mod-display {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.mod-display span {
  background: var(--bg-light);
  padding: 3px 8px;
  border-radius: 3px;
  font-size: 11px;
  color: var(--text);
}

.subraces-section {
  background: var(--bg-light);
  padding: 10px;
  border-radius: 4px;
}

.subraces-section h6 {
  margin: 0 0 8px 0;
  color: var(--primary);
  font-size: 12px;
}

.subraces-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 8px;
}

.subrace-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  background: var(--bg-dark);
  border-radius: 3px;
  font-size: 11px;
}

.btn-delete {
  background: var(--accent-error);
  color: #fff;
  border: none;
  padding: 3px 6px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 11px;
}

.add-subrace {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 5px;
}

.btn-error {
  background: var(--accent-error);
  color: #fff;
  margin-top: 8px;
}

.backup-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.btn-action {
  background: var(--accent-info);
  color: #fff;
}

.btn-action:hover {
  background: #2563eb;
}
</style>