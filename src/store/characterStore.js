import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCharacterStore = defineStore('character', () => {
  const characters = ref([])
  const activeCharacterId = ref(null)

  const activeCharacter = computed(() => 
    characters.value.find(c => c.id === activeCharacterId.value)
  )

  const addCharacter = (character) => {
    const newChar = {
      id: Date.now(),
      createdAt: new Date(),
      ...character
    }
    characters.value.push(newChar)
    activeCharacterId.value = newChar.id
    return newChar
  }

  const updateCharacter = (id, updates) => {
    const char = characters.value.find(c => c.id === id)
    if (char) {
      Object.assign(char, updates)
    }
  }

  const deleteCharacter = (id) => {
    characters.value = characters.value.filter(c => c.id !== id)
    if (activeCharacterId.value === id) {
      activeCharacterId.value = characters.value[0]?.id || null
    }
  }

  const setActiveCharacter = (id) => {
    activeCharacterId.value = id
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('dndCharacters', JSON.stringify(characters.value))
  }

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('dndCharacters')
    if (saved) {
      characters.value = JSON.parse(saved)
      if (characters.value.length > 0) {
        activeCharacterId.value = characters.value[0].id
      }
    }
  }

  return {
    characters,
    activeCharacter,
    activeCharacterId,
    addCharacter,
    updateCharacter,
    deleteCharacter,
    setActiveCharacter,
    saveToLocalStorage,
    loadFromLocalStorage
  }
})