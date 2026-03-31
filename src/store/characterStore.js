import { ref, computed } from 'vue'

// State
const characters = ref([])
const activeCharacterId = ref(null)

// Getters
const activeCharacter = computed(() => {
  return characters.value.find(char => char.id === activeCharacterId.value)
})

// Actions
export function useCharacterStore() {
  return {
    characters,
    activeCharacterId,
    activeCharacter,
    
    setActiveCharacter(id) {
      activeCharacterId.value = id
    },
    
    addCharacter(character) {
      character.id = Date.now()
      characters.value.push(character)
      activeCharacterId.value = character.id
    },
    
    updateCharacter(id, updates) {
      const character = characters.value.find(char => char.id === id)
      if (character) {
        Object.assign(character, updates)
      }
    },
    
    deleteCharacter(id) {
      characters.value = characters.value.filter(char => char.id !== id)
      if (activeCharacterId.value === id) {
        activeCharacterId.value = characters.value[0]?.id || null
      }
    },
    
    saveToLocalStorage() {
      localStorage.setItem('dnd_characters', JSON.stringify(characters.value))
    },
    
    loadFromLocalStorage() {
      const stored = localStorage.getItem('dnd_characters')
      if (stored) {
        try {
          characters.value = JSON.parse(stored)
          if (characters.value.length > 0) {
            activeCharacterId.value = characters.value[0].id
          }
        } catch (error) {
          console.error('Failed to load characters:', error)
        }
      }
    },
    
    exportCharacter(id) {
      const character = characters.value.find(char => char.id === id)
      return character ? JSON.stringify(character, null, 2) : null
    },
    
    importCharacter(characterData) {
      try {
        const character = typeof characterData === 'string' ? JSON.parse(characterData) : characterData
        this.addCharacter(character)
        return true
      } catch (error) {
        console.error('Failed to import character:', error)
        return false
      }
    }
  }
}

export function setupAutoSave(store, interval = 60000) {
  if (interval > 0) {
    setInterval(() => {
      store.saveToLocalStorage()
    }, interval)
  }
}