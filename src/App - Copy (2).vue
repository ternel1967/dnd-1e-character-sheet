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
            />
          </div>
        </div>
      </div>
    </header>

    <div class="container">
      <!-- Character Tabs -->
      <div class="character-tabs">
        <div class="tabs-list">
          <button
            v-for="char in characters"
            :key="char.id"
            @click="setActiveCharacter(char.id)"
            :class="['tab-button', { active: activeCharacterId === char.id }]"
          >
            <span>{{ char.name }} ({{ char.classes[0].class }})</span>

            <button
              @click.stop="deleteCharacter(char.id)"
              class="tab-close"
              v-if="characters.length > 1"
            >
              ✕
            </button>
          </button>
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

    <!-- Modals -->
    <CharacterCreator
      v-if="showNewCharacter"
      @created="onCharacterCreated"
      @cancel="showNewCharacter = false"
    />

    <PartyManager
      v-if="showPartyManager"
      :characters="characters"
      @close="showPartyManager = false"
      @select="selectCharacter"
    />

    <div v-if="showRaceClassManager" class="modal-overlay" @click="showRaceClassManager = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>🎨 Manage Custom Races & Classes</h2>
          <button @click="showRaceClassManager = false" class="close-btn">✕</button>
        </div>

        <RaceClassManager
          @update-races="updateRaces"
          @update-classes="updateClasses"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useCharacterStore } from './store/characterStore.js'
import {
  exportCharacterToJSON,
  exportCharacterToCSV,
  importCharacterFromJSON
} from './utils/characterExport.js'

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

  setup() {
    const store = useCharacterStore()

    if (typeof window !== 'undefined') {
      store.loadFromLocalStorage()
    }

    return {
      characters: store.characters,
      activeCharacter: store.activeCharacter,
      activeCharacterId: store.activeCharacterId,
      setActiveCharacter: store.setActiveCharacter,
      deleteCharacter: store.deleteCharacter,
      addCharacter: store.addCharacter,
      saveToLocalStorage: store.saveToLocalStorage
    }
  },

  data() {
    return {
      showNewCharacter: false,
      showPartyManager: false,
      showRaceClassManager: false
    }
  },

  methods: {
    onCharacterCreated(character) {
      this.addCharacter(character)
      this.saveToLocalStorage()
      this.showNewCharacter = false
    },

    updateRaces() {
      this.saveToLocalStorage()
    },

    updateClasses() {
      this.saveToLocalStorage()
    },

    updateCharacter(updates) {
      const store = useCharacterStore()
      store.updateCharacter(this.activeCharacterId, updates)
      this.saveToLocalStorage()
    },

    exportActive(format) {
      if (!this.activeCharacter) {
        alert('No character selected')
        return
      }

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
        this.saveToLocalStorage()
        alert(`Character "${character.name}" imported successfully!`)
      } catch (error) {
        alert(`Import failed: ${error.message}`)
      }

      event.target.value = ''
    },

    openPartyManager() {
      this.showPartyManager = true
    },

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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.header-right {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 12px;
  cursor: pointer;
}

.character-tabs {
  margin: 20px 0;
}

.tabs-list {
  display: flex;
  gap: 5px;
}

.tab-button.active {
  font-weight: bold;
}

.empty-state {
  text-align: center;
  padding: 40px;
}

.empty-state .btn {
  margin-top: 20px;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #222;
  padding: 20px;
  border-radius: 8px;
}
</style>