<template>
  <div class="spell-manager">
    <div class="spell-header">
      <h3>{{ character.name }} - Spells</h3>
      <div class="spell-filters">
        <select v-model="selectedLevel" class="filter-select">
          <option value="">All Levels</option>
          <option v-for="level in availableSpellLevels" :key="level" :value="level">
            Level {{ level }}
          </option>
        </select>
        
        <select v-model="selectedSchool" class="filter-select">
          <option value="">All Schools</option>
          <option v-for="school in Object.values(SPELL_SCHOOLS)" :key="school" :value="school">
            {{ school }}
          </option>
        </select>

        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search spells..."
          class="search-input"
        >
      </div>
    </div>

    <div class="spell-tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab"
        @click="activeTab = tab"
        :class="['tab-button', { active: activeTab === tab }]"
      >
        {{ tab }}
      </button>
    </div>

    <div class="spell-content">
      <!-- Available Spells -->
      <div v-if="activeTab === 'Available'" class="available-spells">
        <div class="spell-list">
          <div 
            v-for="spell in filteredAvailableSpells" 
            :key="spell.name"
            class="spell-item"
          >
            <div class="spell-info">
              <h4>{{ spell.name }}</h4>
              <p class="spell-level">Level {{ selectedLevel || 'Varies' }}</p>
              <p class="spell-school">{{ spell.school }}</p>
              <p class="spell-components">{{ formatComponents(spell.components) }}</p>
              <p v-if="spell.description" class="spell-description">{{ spell.description }}</p>
            </div>
            <button @click="addSpellToMemory(spell)" class="btn-add">
              ➕ Add
            </button>
          </div>
        </div>
      </div>

      <!-- Memorized Spells -->
      <div v-if="activeTab === 'Memorized'" class="memorized-spells">
        <div class="spell-slots">
          <div v-for="level in 9" :key="level" class="spell-level-section">
            <h3>Level {{ level }} Spells</h3>
            <p class="slot-info">
              Memorized: {{ countMemorizedSpells(level) }} / {{ getMaxSpellSlots(level) }}
            </p>
            
            <div class="spell-list">
              <div 
                v-for="spell in getMemorizedSpellsByLevel(level)" 
                :key="`${spell.name}-${spell.id}`"
                class="spell-item memorized"
              >
                <div class="spell-info">
                  <h4>{{ spell.name }}</h4>
                  <p class="spell-school">{{ spell.school }}</p>
                  <p class="spell-cast">Cast: {{ spell.cast ? '✓' : '○' }}</p>
                </div>
                <div class="spell-actions">
                  <button 
                    @click="toggleSpellCast(spell.id)"
                    :class="['btn-cast', { cast: spell.cast }]"
                  >
                    {{ spell.cast ? '✓ Cast' : 'Ready' }}
                  </button>
                  <button @click="removeSpellFromMemory(spell.id)" class="btn-remove">
                    ✕
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Spell Details -->
      <div v-if="activeTab === 'Details'" class="spell-details">
        <div v-if="selectedSpell" class="detail-panel">
          <h2>{{ selectedSpell.name }}</h2>
          <div class="detail-grid">
            <div><strong>School:</strong> {{ selectedSpell.school }}</div>
            <div><strong>Level:</strong> {{ selectedSpellLevel }}</div>
            <div><strong>Casting Time:</strong> {{ selectedSpell.castingTime }}</div>
            <div><strong>Range:</strong> {{ selectedSpell.range }}</div>
            <div><strong>Components:</strong> {{ formatComponents(selectedSpell.components) }}</div>
            <div><strong>Duration:</strong> {{ selectedSpell.duration }}</div>
            <div><strong>Saving Throw:</strong> {{ selectedSpell.save }}</div>
            <div v-if="selectedSpell.ritualizable"><strong>Ritualizable:</strong> Yes</div>
          </div>
          <div class="spell-description-full">
            <strong>Description:</strong>
            <textarea v-model="selectedSpell.description" placeholder="Add spell description..." rows="5"></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Custom Spell -->
    <div class="add-custom-spell">
      <button @click="showCustomSpellForm = !showCustomSpellForm" class="btn-secondary">
        {{ showCustomSpellForm ? '✕ Cancel' : '➕ Add Custom Spell' }}
      </button>
      
      <div v-if="showCustomSpellForm" class="custom-spell-form">
        <input v-model="newSpell.name" placeholder="Spell Name" class="input-field">
        <select v-model="newSpell.level" class="input-field">
          <option value="">Select Level</option>
          <option v-for="n in 9" :key="n" :value="n">Level {{ n }}</option>
        </select>
        <select v-model="newSpell.school" class="input-field">
          <option value="">Select School</option>
          <option v-for="school in Object.values(SPELL_SCHOOLS)" :key="school" :value="school">
            {{ school }}
          </option>
        </select>
        <textarea v-model="newSpell.description" placeholder="Description" class="input-field" rows="3"></textarea>
        <button @click="saveCustomSpell" class="btn-primary">Save Custom Spell</button>
      </div>
    </div>
  </div>
</template>

<script>
import { SPELL_SCHOOLS, SPELL_CLASSES, getAllSpellsByClass, getSpellsForLevel } from '../utils/spellDatabase.js';

export default {
  name: 'SpellManager',
  props: {
    character: Object,
  },
  data() {
    return {
      SPELL_SCHOOLS,
      SPELL_CLASSES,
      activeTab: 'Available',
      tabs: ['Available', 'Memorized', 'Details'],
      selectedLevel: '',
      selectedSchool: '',
      searchQuery: '',
      selectedSpell: null,
      selectedSpellLevel: null,
      showCustomSpellForm: false,
      memorizedSpells: [],
      newSpell: {
        name: '',
        level: '',
        school: '',
        description: ''
      }
    };
  },
  computed: {
    availableSpellLevels() {
      const spells = getAllSpellsByClass(this.character.class);
      return Object.keys(spells).map(Number).sort((a, b) => a - b);
    },
    allAvailableSpells() {
      const spellBook = getAllSpellsByClass(this.character.class);
      let spells = [];
      
      for (const level in spellBook) {
        spellBook[level].forEach(spell => {
          spells.push({ ...spell, level: parseInt(level) });
        });
      }
      return spells;
    },
    filteredAvailableSpells() {
      let filtered = this.allAvailableSpells;
      
      if (this.selectedLevel) {
        filtered = filtered.filter(s => s.level === parseInt(this.selectedLevel));
      }
      
      if (this.selectedSchool) {
        filtered = filtered.filter(s => s.school === this.selectedSchool);
      }
      
      if (this.searchQuery) {
        filtered = filtered.filter(s => 
          s.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      
      return filtered;
    }
  },
  methods: {
    formatComponents(components) {
      return components.join(', ');
    },
    addSpellToMemory(spell) {
      const id = `${spell.name}-${Date.now()}`;
      this.memorizedSpells.push({
        ...spell,
        id,
        cast: false
      });
      alert(`${spell.name} added to memorized spells!`);
    },
    removeSpellFromMemory(id) {
      this.memorizedSpells = this.memorizedSpells.filter(s => s.id !== id);
    },
    toggleSpellCast(id) {
      const spell = this.memorizedSpells.find(s => s.id === id);
      if (spell) {
        spell.cast = !spell.cast;
      }
    },
    getMemorizedSpellsByLevel(level) {
      return this.memorizedSpells.filter(s => s.level === level);
    },
    countMemorizedSpells(level) {
      return this.getMemorizedSpellsByLevel(level).length;
    },
    getMaxSpellSlots(level) {
      // Simple calculation - adjust based on character stats
      const charLevel = this.character.level;
      const intMod = Math.floor((this.character.stats.INT - 10) / 2);
      
      if (level > charLevel) return 0;
      if (charLevel < 4 && level > 1) return 0;
      
      return Math.max(1, intMod + level);
    },
    saveCustomSpell() {
      if (this.newSpell.name && this.newSpell.level && this.newSpell.school) {
        this.memorizedSpells.push({
          ...this.newSpell,
          id: `custom-${Date.now()}`,
          level: parseInt(this.newSpell.level),
          components: ['V', 'S'],
          castingTime: '1 segment',
          range: '0',
          duration: 'Special',
          save: 'None',
          cast: false
        });
        
        this.newSpell = { name: '', level: '', school: '', description: '' };
        this.showCustomSpellForm = false;
        alert('Custom spell added!');
      }
    }
  }
};
</script>

<style scoped>
.spell-manager {
  background: #1e1e2e;
  padding: 20px;
  border-radius: 8px;
  color: #e0e0e0;
}

.spell-header {
  margin-bottom: 20px;
}

.spell-header h3 {
  margin: 0 0 15px 0;
  color: #ffd700;
}

.spell-filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.filter-select, .search-input {
  padding: 8px 12px;
  background: #2d2d44;
  border: 1px solid #444;
  color: #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
}

.search-input {
  flex: 1;
  min-width: 200px;
}

.spell-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 2px solid #444;
}

.tab-button {
  padding: 10px 20px;
  background: transparent;
  border: none;
  color: #999;
  cursor: pointer;
  font-weight: 500;
  border-bottom: 3px solid transparent;
  transition: all 0.3s;
}

.tab-button.active {
  color: #ffd700;
  border-bottom-color: #ffd700;
}

.tab-button:hover {
  color: #e0e0e0;
}

.spell-content {
  min-height: 300px;
}

.available-spells, .memorized-spells {
  overflow-y: auto;
  max-height: 600px;
}

.spell-list {
  display: grid;
  gap: 10px;
}

.spell-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: #2d2d44;
  padding: 12px;
  border-radius: 4px;
  border-left: 3px solid #ffd700;
  gap: 15px;
}

.spell-item.memorized {
  border-left-color: #4ade80;
}

.spell-info {
  flex: 1;
}

.spell-info h4 {
  margin: 0 0 5px 0;
  color: #ffd700;
}

.spell-level, .spell-school, .spell-components, .spell-cast {
  margin: 3px 0;
  font-size: 13px;
  color: #999;
}

.spell-description {
  margin-top: 8px;
  font-size: 12px;
  color: #bbb;
  font-style: italic;
}

.btn-add, .btn-remove, .btn-cast {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-add {
  background: #4ade80;
  color: #000;
}

.btn-add:hover {
  background: #22c55e;
}

.btn-remove {
  background: #ef4444;
  color: #fff;
}

.btn-remove:hover {
  background: #dc2626;
}

.btn-cast {
  background: #3b82f6;
  color: #fff;
  min-width: 80px;
}

.btn-cast.cast {
  background: #4ade80;
}

.spell-level-section {
  margin-bottom: 25px;
  background: #2d2d44;
  padding: 15px;
  border-radius: 4px;
}

.spell-level-section h3 {
  margin: 0 0 8px 0;
  color: #ffd700;
  font-size: 16px;
}

.slot-info {
  margin: 0 0 10px 0;
  font-size: 13px;
  color: #999;
}

.spell-actions {
  display: flex;
  gap: 8px;
}

.spell-details {
  background: #2d2d44;
  padding: 20px;
  border-radius: 4px;
}

.detail-panel h2 {
  margin: 0 0 20px 0;
  color: #ffd700;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.detail-grid div {
  background: #1e1e2e;
  padding: 10px;
  border-radius: 4px;
}

.spell-description-full {
  margin-top: 20px;
}

.spell-description-full textarea {
  width: 100%;
  background: #1e1e2e;
  border: 1px solid #444;
  color: #e0e0e0;
  padding: 10px;
  border-radius: 4px;
  font-family: inherit;
}

.add-custom-spell {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #444;
}

.btn-secondary {
  padding: 10px 20px;
  background: #6366f1;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.btn-secondary:hover {
  background: #4f46e5;
}

.custom-spell-form {
  background: #2d2d44;
  padding: 15px;
  border-radius: 4px;
  margin-top: 15px;
  display: grid;
  gap: 10px;
}

.input-field {
  padding: 8px 12px;
  background: #1e1e2e;
  border: 1px solid #444;
  color: #e0e0e0;
  border-radius: 4px;
  font-family: inherit;
}

.btn-primary {
  padding: 10px 20px;
  background: #ffd700;
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.btn-primary:hover {
  background: #ffed4e;
}
</style>