<template>
  <div class="class-abilities">
    <div class="abilities-header">
      <h3>Class Abilities & Features</h3>
    </div>

    <div v-if="character.classes && character.classes.length > 0" class="abilities-content">
      <div v-for="classInfo in character.classes" :key="classInfo.classKey" class="class-section">
        <div class="class-title">
          <h4>{{ classInfo.class }} - Level {{ classInfo.level }}</h4>
        </div>

        <div class="abilities-grid">
          <div v-for="ability in getClassAbilities(classInfo.class)" :key="ability.name" class="ability-card">
            <h5>{{ ability.name }}</h5>
            <p class="ability-level">Unlocks at Level {{ ability.unlocksAt }}</p>
            <p class="ability-description">{{ ability.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="no-abilities">
      <p>No class selected</p>
    </div>
  </div>
</template>

<script>
const classAbilitiesData = {
  Fighter: [
    { name: 'Extra Attack', unlocksAt: 6, description: 'Gain an additional attack per round' },
    { name: 'Second Wind', unlocksAt: 1, description: 'Recover hit points during short rest' },
    { name: 'Fighting Style', unlocksAt: 1, description: 'Choose a combat specialization' },
    { name: 'Improved Critical', unlocksAt: 9, description: 'Critical hits on 19-20' },
    { name: 'Indomitable', unlocksAt: 7, description: 'Reroll a failed saving throw' }
  ],
  Thief: [
    { name: 'Sneak Attack', unlocksAt: 1, description: 'Extra damage when attacking from surprise' },
    { name: 'Cunning Action', unlocksAt: 2, description: 'Bonus action to Dash, Disengage, or Hide' },
    { name: 'Expertise', unlocksAt: 1, description: 'Double proficiency bonus on chosen skills' },
    { name: 'Evasion', unlocksAt: 7, description: 'Take half damage on successful Dex save' },
    { name: 'Uncanny Dodge', unlocksAt: 5, description: 'Use reaction to halve attack damage' }
  ],
  Cleric: [
    { name: 'Spellcasting', unlocksAt: 1, description: 'Cast spells from the cleric spell list' },
    { name: 'Channel Divinity', unlocksAt: 2, description: 'Use divine power to produce magical effects' },
    { name: 'Destroy Undead', unlocksAt: 5, description: 'Turn or destroy undead creatures' },
    { name: 'Divine Intervention', unlocksAt: 10, description: 'Call upon deity for aid' },
    { name: 'Improved Healing', unlocksAt: 6, description: 'Healing spells restore more hit points' }
  ],
  'Magic-User': [
    { name: 'Spellcasting', unlocksAt: 1, description: 'Cast spells from the wizard spell list' },
    { name: 'Arcane Recovery', unlocksAt: 1, description: 'Recover expended spell slots during rest' },
    { name: 'Wizard Tradition', unlocksAt: 2, description: 'Choose a school of magic specialization' },
    { name: 'Spell Mastery', unlocksAt: 6, description: 'Master specific spells for instant casting' },
    { name: 'Signature Spells', unlocksAt: 20, description: 'Cast signature spells at will' }
  ],
  Ranger: [
    { name: 'Favored Enemy', unlocksAt: 1, description: 'Extra damage against chosen enemy type' },
    { name: 'Spellcasting', unlocksAt: 5, description: 'Cast spells from the ranger spell list' },
    { name: 'Natural Explorer', unlocksAt: 1, description: 'Advantage in chosen terrain' },
    { name: 'Hunter\'s Mark', unlocksAt: 1, description: 'Focus your attacks on a single target' },
    { name: 'Extra Attack', unlocksAt: 5, description: 'Attack twice when you Attack action' }
  ],
  Paladin: [
    { name: 'Divine Sense', unlocksAt: 1, description: 'Sense celestials, fiends, and undead' },
    { name: 'Lay on Hands', unlocksAt: 1, description: 'Heal allies by touch' },
    { name: 'Divine Smite', unlocksAt: 2, description: 'Deal extra damage with divine power' },
    { name: 'Spellcasting', unlocksAt: 2, description: 'Cast spells from the paladin spell list' },
    { name: 'Aura of Protection', unlocksAt: 6, description: 'Allies gain bonus to saves near you' }
  ],
  Druid: [
    { name: 'Spellcasting', unlocksAt: 1, description: 'Cast spells from the druid spell list' },
    { name: 'Wild Shape', unlocksAt: 2, description: 'Transform into a beast' },
    { name: 'Timeless Body', unlocksAt: 18, description: 'Stop aging while in Wild Shape' },
    { name: 'Beast Spells', unlocksAt: 18, description: 'Cast spells while in Wild Shape' },
    { name: 'Unlimited Wild Shape', unlocksAt: 20, description: 'Unlimited uses of Wild Shape' }
  ],
  Bard: [
    { name: 'Spellcasting', unlocksAt: 1, description: 'Cast spells from the bard spell list' },
    { name: 'Bardic Inspiration', unlocksAt: 1, description: 'Grant allies inspiration dice' },
    { name: 'Jack of All Trades', unlocksAt: 2, description: 'Add half proficiency to untrained checks' },
    { name: 'Magical Secrets', unlocksAt: 6, description: 'Learn any spells from any class' },
    { name: 'Peerless Skill', unlocksAt: 20, description: 'Add inspiration to own d20 rolls' }
  ]
}

export default {
  name: 'ClassAbilities',
  props: {
    character: Object
  },
  methods: {
    getClassAbilities(className) {
      const abilities = classAbilitiesData[className] || []
      if (!this.character.classes) return abilities
      
      const classInfo = this.character.classes.find(c => c.class === className)
      if (!classInfo) return abilities
      
      // Filter to show only abilities unlocked at this level
      return abilities.filter(ability => ability.unlocksAt <= classInfo.level)
    }
  }
}
</script>

<style scoped>
.class-abilities {
  background: var(--bg-dark);
  padding: 20px;
  border-radius: 8px;
}

.abilities-header {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid var(--primary);
}

.abilities-header h3 {
  margin: 0;
  color: var(--primary);
}

.abilities-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.class-section {
  background: var(--bg-light);
  padding: 15px;
  border-radius: 4px;
  border-left: 4px solid var(--primary);
}

.class-title {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #444;
}

.class-title h4 {
  margin: 0;
  color: var(--primary);
}

.abilities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}

.ability-card {
  background: var(--bg-dark);
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #444;
}

.ability-card h5 {
  margin: 0 0 5px 0;
  color: var(--primary);
  font-size: 13px;
}

.ability-level {
  color: var(--text-muted);
  font-size: 11px;
  margin: 0 0 8px 0;
}

.ability-description {
  color: var(--text);
  font-size: 12px;
  margin: 0;
  line-height: 1.4;
}

.no-abilities {
  text-align: center;
  padding: 30px;
  color: var(--text-muted);
}
</style>