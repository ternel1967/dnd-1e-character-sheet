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
            <span>{{ char.name }} ({{ char.class }})</span>
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

    <!-- New Character Modal -->
    <CharacterCreator 
      v-if="showNewCharacter"
      @created="onCharacterCreated"
      @cancel="showNewCharacter = false"
    />
  </div>
</template>

<script>
import { useCharacterStore } from './store/characterStore.js'
import CharacterSheet from './components/CharacterSheet.vue'
import CharacterCreator from './components/CharacterCreator.vue'

export default {
  components: {
    CharacterSheet,
    CharacterCreator
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
      updateCharacter: store.updateCharacter,
      deleteCharacter: store.deleteCharacter,
      addCharacter: store.addCharacter,
      saveToLocalStorage: store.saveToLocalStorage
    }
  },
  data() {
    return {
      showNewCharacter: false
    }
  },
  methods: {
    onCharacterCreated(character) {
      this.addCharacter(character)
      this.saveToLocalStorage()
      this.showNewCharacter = false
    },
    updateCharacter(updates) {
      this.updateCharacter(this.activeCharacterId, updates)
      this.saveToLocalStorage()
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