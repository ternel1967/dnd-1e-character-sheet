<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>Create New Character</h2>
        <button @click="$emit('cancel')" class="close-btn">✕</button>
      </div>

      <div class="modal-body">
        <div class="form-section">
          <h3>Basic Information</h3>
          <div class="form-group">
            <label>Character Name</label>
            <input v-model="form.name" type="text" class="input-field" placeholder="Enter character name">
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Race</label>
              <select v-model="form.race" class="input-field">
                <option value="">Select Race</option>
                <option v-for="(race, key) in CHARACTER_RACES" :key="key" :value="key">
                  {{ race.name }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Class</label>
              <select v-model="form.class" class="input-field">
                <option value="">Select Class</option>
                <option v-for="(cls, key) in CHARACTER_CLASSES" :key="key" :value="key">
                  {{ cls.name }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>Ability Scores</h3>
          <div class="ability-method">
            <button 
              @click="abilityMethod = 'roll'" 
              :class="['method-btn', { active: abilityMethod === 'roll' }]"
            >
              🎲 Roll 4d6
            </button>
            <button 
              @click="abilityMethod = 'standard'" 
              :class="['method-btn', { active: abilityMethod === 'standard' }]"
            >
              📊 Standard Array
            </button>
            <button 
              @click="abilityMethod = 'manual'" 
              :class="['method-btn', { active: abilityMethod === 'manual' }]"
            >
              ✏️ Manual
            </button>
          </div>

          <div v-if="abilityMethod === 'roll'" class="ability-section">
            <button @click="rollAbilities" class="btn btn-primary">Roll Abilities</button>
            <div v-if="form.abilities.STR" class="ability-display">
              <div v-for="ability in ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']" :key="ability" class="ability-row">
                <span>{{ ability }}:</span>
                <span class="value">{{ form.abilities[ability] }}</span>
              </div>
            </div>
          </div>

          <div v-if="abilityMethod === 'standard'" class="ability-section">
            <p class="info">Standard array: 15, 14, 13, 12, 10, 8</p>
            <div class="ability-inputs">
              <div v-for="ability in ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']" :key="ability" class="ability-input">
                <label>{{ ability }}</label>
                <input 
                  v-model.number="form.abilities[ability]" 
                  type="number" 
                  class="input-field"
                  min="1"
                  max="20"
                >
              </div>
            </div>
          </div>

          <div v-if="abilityMethod === 'manual'" class="ability-section">
            <div class="ability-inputs">
              <div v-for="ability in ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']" :key="ability" class="ability-input">
                <label>{{ ability }}</label>
                <input 
                  v-model.number="form.abilities[ability]" 
                  type="number" 
                  class="input-field"
                  min="1"
                  max="20"
                  placeholder="3-18"
                >
              </div>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>Starting Options</h3>
          <div class="form-group">
            <label>Starting Gold</label>
            <input v-model.number="form.startingGold" type="number" class="input-field" min="0">
          </div>

          <div class="form-group">
            <label>Alignment</label>
            <select v-model="form.alignment" class="input-field">
              <option value="LG">Lawful Good</option>
              <option value="NG">Neutral Good</option>
              <option value="CG">Chaotic Good</option>
              <option value="LN">Lawful Neutral</option>
              <option value="N">Neutral</option>
              <option value="CN">Chaotic Neutral</option>
              <option value="LE">Lawful Evil</option>
              <option value="NE">Neutral Evil</option>
              <option value="CE">Chaotic Evil</option>
            </select>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button @click="$emit('cancel')" class="btn btn-secondary">Cancel</button>
        <button @click="createCharacter" class="btn btn-primary">Create Character</button>
      </div>
    </div>
  </div>
</template>

<script>
import { CHARACTER_CLASSES, CHARACTER_RACES, rollAbilityScores } from '../utils/rules1e.js'

export default {
  name: 'CharacterCreator',
  data() {
    return {
      CHARACTER_CLASSES,
      CHARACTER_RACES,
      abilityMethod: 'roll',
      form: {
        name: '',
        race: 'HUMAN',
        class: 'FIGHTER',
        abilities: {
          STR: 10,
          DEX: 10,
          CON: 10,
          INT: 10,
          WIS: 10,
          CHA: 10
        },
        startingGold: 0,
        alignment: 'NG'
      }
    }
  },
  methods: {
    rollAbilities() {
      const scores = rollAbilityScores()
      this.form.abilities = {
        STR: scores[0],
        DEX: scores[1],
        CON: scores[2],
        INT: scores[3],
        WIS: scores[4],
        CHA: scores[5]
      }
    },
    createCharacter() {
      if (!this.form.name || !this.form.race || !this.form.class) {
        alert('Please fill in all required fields')
        return
      }

      const character = {
        name: this.form.name,
        race: this.CHARACTER_RACES[this.form.race].name,
        class: this.CHARACTER_CLASSES[this.form.class].name,
        stats: this.form.abilities,
        level: 1,
        experience: 0,
        gold: this.form.startingGold,
        alignment: this.form.alignment,
        hitPoints: 10,
        maxHitPoints: 10,
        armorClass: 10,
        equipment: [],
        skills: []
      }

      this.$emit('created', character)
    },
    closeModal() {
      this.$emit('cancel')
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
  max-width: 800px;
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

.form-section {
  margin-bottom: 30px;
}

.form-section h3 {
  color: var(--primary);
  margin: 0 0 15px 0;
  font-size: 16px;
  border-bottom: 1px solid #444;
  padding-bottom: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.form-group label {
  display: block;
  color: var(--text);
  margin-bottom: 5px;
  font-weight: 500;
}

.input-field {
  width: 100%;
  padding: 8px 12px;
  background: var(--bg-dark);
  border: 1px solid #444;
  color: var(--text);
  border-radius: 4px;
  font-family: inherit;
}

.input-field:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
}

.ability-method {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
}

.method-btn {
  padding: 10px 15px;
  background: var(--bg-dark);
  border: 2px solid #444;
  color: var(--text-muted);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.method-btn:hover {
  border-color: var(--primary);
}

.method-btn.active {
  background: var(--primary);
  color: #000;
  border-color: var(--primary);
}

.ability-section {
  background: var(--bg-dark);
  padding: 15px;
  border-radius: 4px;
}

.info {
  color: var(--text-muted);
  font-size: 13px;
  margin-bottom: 15px;
}

.ability-display {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.ability-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background: var(--bg-light);
  border-radius: 4px;
}

.ability-row .value {
  color: var(--primary);
  font-weight: bold;
  font-size: 18px;
}

.ability-inputs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.ability-input {
  display: flex;
  flex-direction: column;
}

.ability-input label {
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 5px;
}

.modal-footer {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding: 20px;
  border-top: 1px solid #444;
  background: var(--bg-dark);
}

.btn {
  padding: 10px 20px;
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
  background: #555;
  color: var(--text);
}

.btn-secondary:hover {
  background: #666;
}
</style>