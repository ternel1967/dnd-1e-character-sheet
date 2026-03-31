<template>
  <div class="skill-tracker">
    <div class="skills-header">
      <h3>Skills</h3>
      <button @click="showAddSkill = !showAddSkill" class="btn btn-secondary">
        {{ showAddSkill ? '✕ Cancel' : '➕ Add Skill' }}
      </button>
    </div>

    <div v-if="showAddSkill" class="add-skill-form">
      <input 
        v-model="newSkill.name" 
        type="text" 
        class="input-field"
        placeholder="Skill name"
      >
      <select v-model="newSkill.linkedAbility" class="input-field">
        <option value="STR">Strength</option>
        <option value="DEX">Dexterity</option>
        <option value="CON">Constitution</option>
        <option value="INT">Intelligence</option>
        <option value="WIS">Wisdom</option>
        <option value="CHA">Charisma</option>
      </select>
      <input 
        v-model.number="newSkill.bonus" 
        type="number" 
        class="input-field"
        placeholder="Bonus"
      >
      <button @click="addSkill" class="btn btn-primary">Add</button>
    </div>

    <div class="skills-grid">
      <div v-if="character.skills && character.skills.length > 0" class="skill-list">
        <div v-for="skill in character.skills" :key="skill.id" class="skill-item">
          <div class="skill-info">
            <h4>{{ skill.name }}</h4>
            <p class="skill-detail">{{ skill.linkedAbility }} + {{ skill.bonus }}</p>
          </div>
          <div class="skill-actions">
            <button @click="rollSkill(skill)" class="btn-roll-skill">Roll</button>
            <button @click="removeSkill(skill.id)" class="btn-remove">✕</button>
          </div>
        </div>
      </div>
      <div v-else class="empty">
        <p>No skills added yet</p>
      </div>
    </div>

    <div class="common-skills">
      <h4>Add Common Skills</h4>
      <div class="common-skills-grid">
        <button v-for="skill in commonSkills" :key="skill.name" @click="addCommonSkill(skill)" class="btn-common">
          {{ skill.name }}
        </button>
      </div>
    </div>

    <!-- Thief Abilities -->
    <div v-if="isThief" class="thief-abilities">
      <h4>Thief Special Abilities</h4>
      <div class="thief-abilities-grid">
        <div class="thief-ability-section">
          <label>Backstab Multiplier</label>
          <div class="backstab-info">
            <span class="multiplier">x{{ backstabMultiplier }}</span>
            <p class="description">Surprise attack damage multiplier</p>
          </div>
        </div>

        <div class="thief-ability-section">
          <label>Hide in Shadows</label>
          <div class="hide-info">
            <p>Success Chance: {{ hideChance }}%</p>
            <button @click="rollThiefSkill('Hide')" class="btn-roll-skill">Hide</button>
          </div>
        </div>

        <div class="thief-ability-section">
          <label>Move Silently</label>
          <div class="move-info">
            <p>Success Chance: {{ moveChance }}%</p>
            <button @click="rollThiefSkill('Move Silently')" class="btn-roll-skill">Move</button>
          </div>
        </div>
      </div>

      <div class="thieving-skills">
        <h4 style="margin-top: 20px;">Thieving Skills</h4>
        <div class="skills-row">
          <div class="thief-skill">
            <span>Pick Locks</span>
            <div class="skill-roll">
              <button @click="rollThiefSkill('Pick Locks')" class="btn-roll-skill">Roll 1d100</button>
              <span class="dc">Base DC: 40%</span>
            </div>
          </div>
          <div class="thief-skill">
            <span>Find Traps</span>
            <div class="skill-roll">
              <button @click="rollThiefSkill('Find Traps')" class="btn-roll-skill">Roll 1d100</button>
              <span class="dc">Base DC: 40%</span>
            </div>
          </div>
          <div class="thief-skill">
            <span>Disarm Traps</span>
            <div class="skill-roll">
              <button @click="rollThiefSkill('Disarm Traps')" class="btn-roll-skill">Roll 1d100</button>
              <span class="dc">Base DC: 50%</span>
            </div>
          </div>
          <div class="thief-skill">
            <span>Pickpocket</span>
            <div class="skill-roll">
              <button @click="rollThiefSkill('Pickpocket')" class="btn-roll-skill">Roll 1d100</button>
              <span class="dc">Base DC: 50%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { calculateModifier } from '../utils/rules1e.js'

export default {
  name: 'SkillTracker',
  props: {
    character: Object
  },
  data() {
    return {
      showAddSkill: false,
      newSkill: {
        name: '',
        linkedAbility: 'DEX',
        bonus: 0
      },
      commonSkills: [
        { name: 'Climb', linkedAbility: 'STR', bonus: 0 },
        { name: 'Hide', linkedAbility: 'DEX', bonus: 0 },
        { name: 'Move Silently', linkedAbility: 'DEX', bonus: 0 },
        { name: 'Backstab', linkedAbility: 'DEX', bonus: 0 },
        { name: 'Hear Noise', linkedAbility: 'WIS', bonus: 0 },
        { name: 'Open Locks', linkedAbility: 'DEX', bonus: 0 },
        { name: 'Sleight of Hand', linkedAbility: 'DEX', bonus: 0 },
        { name: 'Intimidate', linkedAbility: 'CHA', bonus: 0 },
        { name: 'Persuasion', linkedAbility: 'CHA', bonus: 0 },
        { name: 'Knowledge (Arcana)', linkedAbility: 'INT', bonus: 0 }
      ]
    }
  },
  computed: {
    isThief() {
      if (!this.character.classes) return false
      return this.character.classes.some(c => c.class === 'Thief')
    },
    backstabMultiplier() {
      if (!this.character.classes) return 2
      const thief = this.character.classes.find(c => c.class === 'Thief')
      if (!thief) return 2
      
      const level = thief.level
      if (level <= 4) return 2
      if (level <= 8) return 3
      if (level <= 12) return 4
      if (level <= 16) return 5
      return 6
    },
    hideChance() {
      if (!this.character.classes) return 0
      const thief = this.character.classes.find(c => c.class === 'Thief')
      if (!thief) return 0
      
      const baseChance = {
        1: 10, 2: 15, 3: 20, 4: 25, 5: 30, 6: 35, 7: 40, 8: 45, 9: 50,
        10: 55, 11: 60, 12: 65, 13: 70, 14: 75, 15: 80, 16: 85, 17: 90, 18: 95
      }
      return baseChance[thief.level] || 95
    },
    moveChance() {
      if (!this.character.classes) return 0
      const thief = this.character.classes.find(c => c.class === 'Thief')
      if (!thief) return 0
      
      const baseChance = {
        1: 10, 2: 15, 3: 20, 4: 25, 5: 30, 6: 35, 7: 40, 8: 45, 9: 50,
        10: 55, 11: 60, 12: 65, 13: 70, 14: 75, 15: 80, 16: 85, 17: 90, 18: 95
      }
      return baseChance[thief.level] || 95
    }
  },
  methods: {
    addSkill() {
      if (!this.newSkill.name) {
        alert('Please enter a skill name')
        return
      }

      if (!this.character.skills) {
        this.character.skills = []
      }

      const skill = {
        id: Date.now(),
        ...this.newSkill
      }

      this.character.skills.push(skill)
      this.$emit('update', { skills: this.character.skills })

      this.newSkill = { name: '', linkedAbility: 'DEX', bonus: 0 }
      this.showAddSkill = false
    },
    addCommonSkill(skill) {
      if (!this.character.skills) {
        this.character.skills = []
      }

      const newSkill = {
        id: Date.now(),
        ...skill
      }

      this.character.skills.push(newSkill)
      this.$emit('update', { skills: this.character.skills })
    },
    removeSkill(id) {
      this.character.skills = this.character.skills.filter(s => s.id !== id)
      this.$emit('update', { skills: this.character.skills })
    },
    rollSkill(skill) {
      const abilityMod = calculateModifier(this.character.stats[skill.linkedAbility])
      const roll = Math.floor(Math.random() * 20) + 1
      const total = roll + abilityMod + skill.bonus
      alert(`${skill.name}: Rolled ${roll} + ${abilityMod} (${skill.linkedAbility}) + ${skill.bonus} = ${total}`)
    },
    rollThiefSkill(skillName) {
      const roll = Math.floor(Math.random() * 100) + 1
      let successChance = 50

      switch(skillName) {
        case 'Pick Locks':
          successChance = 40
          break
        case 'Find Traps':
          successChance = 40
          break
        case 'Disarm Traps':
          successChance = 50
          break
        case 'Pickpocket':
          successChance = 50
          break
        case 'Hide':
          successChance = this.hideChance
          break
        case 'Move Silently':
          successChance = this.moveChance
          break
      }

      const success = roll <= successChance
      alert(`${skillName}: Rolled ${roll} vs ${successChance}% - ${success ? '✓ SUCCESS' : '✗ FAILED'}`)
    }
  }
}
</script>

<style scoped>
.skill-tracker {
  background: var(--bg-dark);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.skills-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid var(--primary);
}

.skills-header h3 {
  margin: 0;
  color: var(--primary);
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.btn-secondary {
  background: var(--accent-info);
  color: #fff;
}

.add-skill-form {
  background: var(--bg-light);
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: 10px;
  align-items: flex-end;
}

.input-field {
  padding: 8px 12px;
  background: var(--bg-dark);
  border: 1px solid #444;
  color: var(--text);
  border-radius: 4px;
}

.btn-primary {
  background: var(--primary);
  color: #000;
}

.skills-grid {
  margin-bottom: 20px;
}

.skill-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

.skill-item {
  background: var(--bg-light);
  padding: 15px;
  border-radius: 4px;
  border-left: 3px solid var(--primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skill-info h4 {
  margin: 0 0 5px 0;
  color: var(--primary);
}

.skill-detail {
  color: var(--text-muted);
  font-size: 12px;
  margin: 0;
}

.skill-actions {
  display: flex;
  gap: 5px;
}

.btn-roll-skill {
  padding: 6px 10px;
  background: var(--accent-info);
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
}

.btn-remove {
  padding: 6px 8px;
  background: var(--accent-error);
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.empty {
  text-align: center;
  padding: 30px;
  color: var(--text-muted);
}

.common-skills {
  background: var(--bg-light);
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.common-skills h4 {
  margin: 0 0 15px 0;
  color: var(--primary);
  font-size: 13px;
}

.common-skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 8px;
}

.btn-common {
  padding: 8px 12px;
  background: var(--bg-dark);
  border: 1px solid #444;
  color: var(--text);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 12px;
}

.btn-common:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.thief-abilities {
  background: var(--bg-light);
  padding: 15px;
  border-radius: 4px;
  margin-top: 20px;
}

.thief-abilities h4 {
  margin: 0 0 15px 0;
  color: var(--primary);
}

.thief-abilities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.thief-ability-section {
  background: var(--bg-dark);
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #444;
}

.thief-ability-section label {
  display: block;
  color: var(--primary);
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 13px;
}

.backstab-info, .hide-info, .move-info {
  text-align: center;
}

.multiplier {
  display: block;
  color: var(--accent-info);
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}

.description {
  color: var(--text-muted);
  font-size: 11px;
  margin: 0;
}

.hide-info p, .move-info p {
  color: var(--text-muted);
  margin: 0 0 8px 0;
  font-size: 12px;
}

.thieving-skills {
  background: var(--bg-dark);
  padding: 15px;
  border-radius: 4px;
}

.thieving-skills h4 {
  margin: 0 0 15px 0;
  color: var(--primary);
  font-size: 13px;
}

.skills-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}

.thief-skill {
  background: var(--bg-light);
  padding: 8px;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.thief-skill span {
  color: var(--text);
  font-weight: 500;
}

.skill-roll {
  display: flex;
  gap: 8px;
  align-items: center;
}

.dc {
  color: var(--text-muted);
  font-size: 10px;
  white-space: nowrap;
}
</style>