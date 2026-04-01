<template>
  <div class="app-container">
    <header class="app-header">
      <div class="header-left">
        <h1>⚔️ D&D 1st Edition Character Sheet</h1>
        <p class="subtitle">Multi-Character Manager</p>
      </div>
      <div class="header-right">
        <button @click="showNewCharacter = true" class="btn btn-primary">
          ➕ New Character
        </button>
        <button @click="openPartyManager" class="btn btn-secondary">
          👥 Party
        </button>
        <div class="dropdown">
          <button class="btn btn-secondary">⬇️ Import/Export</button>
          <div class="dropdown-menu">
            <button @click="showRaceClassManager = true" class="btn btn-secondary">
              🎨 Manage Races/Classes
            </button>
            <button @click="exportActive('json')">📄 Export as JSON</button>
            <button @click="exportActive('csv')">📊 Export as CSV</button>
            <button @click="triggerImport">📂 Import Character</button>
            <input 
              ref="fileInput" 
              type="file" 
              accept=".json" 
              style="display: none"
              @change="handleImport"
            >
          </div>
        </div>
      </div>
    </header>

    <div class="container">
      <!-- Character Tabs -->
      <div class="character-tabs">
        <div class="tabs-list">
          <div 
            v-for="char in characters" 
            :key="char.id"
            class="tab-button-wrapper"
            :class="{ active: activeCharacterId === char.id }"
            style="display: flex; align-items: center;"
          >
            <button
              @click="setActiveCharacter(char.id)"
              :class="['tab-button', { active: activeCharacterId === char.id }]"
            >
              <span>{{ char.name }} ({{ char.classes[0].class }})</span>
            </button>
            <button 
              @click.stop="deleteCharacter(char.id)"
              class="tab-close"
              v-if="characters.length > 1"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div v-if="activeCharacter" class="character-sheet">
        <CharacterSheet :character="activeCharacter" @update="updateCharacter" />
      </div>

      <div v-else class="empty-state">
        <h2>No Character Selected</h2>
        <p>Create a new character or load an existing one</p>
        <button @click="showNewCharacter = true" class="btn btn-primary">
          Create Character
        </button>
      </div>
    </div>

    <!-- New Character Modal -->
    <CharacterCreator 
      v-if="showNewCharacter"
      @created="onCharacterCreated"
      @cancel="showNewCharacter = false"
    />

    <!-- Party Manager Modal -->
    <PartyManager 
      v-if="showPartyManager"
      :characters="characters"
      @close="showPartyManager = false"
      @select="selectCharacter"
    />
    <!-- Race/Class Manager Modal -->
    <div v-if="showRaceClassManager" class="modal-overlay" @click="showRaceClassManager = false">
      <div class="modal-content" @click.stop style="max-width: 1200px; max-height: 90vh; overflow-y: auto;">
        <div class="modal-header">
          <h2>🎨 Manage Custom Races & Classes</h2>
          <button @click="showRaceClassManager = false" class="close-btn">✕</button>
        </div>
        <RaceClassManager @update-races="updateRaces" @update-classes="updateClasses" />
      </div>
    </div>
  </div>
</template>

<script>
import { useCharacterStore } from './store/characterStore.js'
import { exportCharacterToJSON, exportCharacterToCSV, importCharacterFromJSON } from './utils/characterExport.js'
import CharacterSheet from './components/CharacterSheet.vue'
import CharacterCreator from './components/CharacterCreator.vue'
import PartyManager from './components/PartyManager.vue'
import RaceClassManager from './components/RaceClassManager.vue'

export default {
  components: {
    CharacterSheet,
    CharacterCreator,
    PartyManager,
    RaceClassManager
  },
  data() {
    return {
      store: useCharacterStore(),
      showNewCharacter: false,
      showPartyManager: false,
      showRaceClassManager: false
    }
  },
  computed: {
    characters()      { return this.store.characters },
    activeCharacter() { return this.store.activeCharacter },
    activeCharacterId(){ return this.store.activeCharacterId }
  },
  created() {
    if (typeof window !== 'undefined') {
      this.store.loadFromLocalStorage()
    }
  },
  methods: {
    setActiveCharacter(id)   { this.store.setActiveCharacter(id) },
    updateCharacter(updates) { 
      this.store.updateCharacter(this.activeCharacterId, updates); 
      this.saveToLocalStorage();
    },
    deleteCharacter(id)      { this.store.deleteCharacter(id); this.saveToLocalStorage(); },
    addCharacter(character)  { this.store.addCharacter(character); this.saveToLocalStorage(); },
    saveToLocalStorage()     { this.store.saveToLocalStorage() },

    onCharacterCreated(character) {
      this.addCharacter(character);
      this.showNewCharacter = false;
    },
    updateRaces(races)   { this.saveToLocalStorage() },
    updateClasses(classes){ this.saveToLocalStorage() },
    exportActive(format) {
      if (!this.activeCharacter) { alert('No character selected'); return }
      if (format === 'json') {
        exportCharacterToJSON(this.activeCharacter)
      } else if (format === 'csv') {
        exportCharacterToCSV(this.activeCharacter)
      }
    },
    triggerImport() {
      this.$refs.fileInput.click()
    },
    async handleImport(event) {
      const file = event.target.files[0]
      if (!file) return

      try {
        const character = await importCharacterFromJSON(file)
        this.addCharacter(character)
        alert(`Character "${character.name}" imported successfully!`)
      } catch (error) {
        alert(`Import failed: ${error.message}`)
      }

      event.target.value = ''
    },
    openPartyManager() { this.showPartyManager = true },
    selectCharacter(id) {
      this.setActiveCharacter(id)
      this.showPartyManager = false
    }
  }
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background: var(--bg-darker);
}

.app-header {
  background: linear-gradient(135deg, var(--bg-dark) 0%, var(--bg-light) 100%);
  border-bottom: 3px solid var(--primary);
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left h1 {
  margin: 0;
  color: var(--primary);
  font-size: 32px;
}

.subtitle {
  color: var(--text-muted);
  margin: 5px 0 0 0;
  font-size: 14px;
}

.header-right {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 16px;
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

.btn-secondary {
  background: var(--accent-info);
  color: #fff;
}

.btn-secondary:hover {
  background: #2563eb;
}

.dropdown {
  position: relative;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--bg-light);
  border: 2px solid var(--primary);
  border-radius: 4px;
  min-width: 150px;
  z-index: 100;
  margin-top: 5px;
}

.dropdown:hover .dropdown-menu {
  display: flex;
  flex-direction: column;
}

.dropdown-menu button {
  padding: 10px 15px;
  background: none;
  border: none;
  color: var(--text);
  cursor: pointer;
  text-align: left;
  font-weight: 500;
  transition: all 0.2s;
}

.dropdown-menu button:hover {
  background: var(--bg-dark);
  color: var(--primary);
}

.character-tabs {
  margin: 20px 0;
  background: var(--bg-light);
  border-radius: 8px 8px 0 0;
  padding: 0;
}

.tabs-list {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 10px;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  background: var(--bg-dark);
  border: 1px solid #444;
  border-radius: 4px 4px 0 0;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.tab-button:hover {
  color: var(--text);
  border-color: var(--primary);
}

.tab-button.active {
  background: var(--bg-light);
  color: var(--primary);
  border-color: var(--primary);
  border-bottom-color: var(--bg-light);
}

.tab-close {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0;
  margin-left: 5px;
  font-size: 14px;
}

.tab-close:hover {
  color: var(--accent-error);
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-muted);
}

.empty-state h2 {
  color: var(--text);
  margin-bottom: 10px;
}

.empty-state .btn {
  margin-top: 20px;
}

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
  padding: 20px;
}

.modal-content {
  background: var(--bg-light);
  border: 2px solid var(--primary);
  border-radius: 8px;
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
</style>