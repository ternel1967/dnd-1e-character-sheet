// 1st Edition D&D Rules Engine

export const CHARACTER_CLASSES = {
  FIGHTER: { name: 'Fighter', hitDice: '1d10', thac0Base: 10 },
  THIEF: { name: 'Thief', hitDice: '1d6', thac0Base: 10 },
  CLERIC: { name: 'Cleric', hitDice: '1d8', thac0Base: 10 },
  MAGIC_USER: { name: 'Magic-User', hitDice: '1d4', thac0Base: 10 },
  RANGER: { name: 'Ranger', hitDice: '1d10', thac0Base: 10 },
  PALADIN: { name: 'Paladin', hitDice: '1d10', thac0Base: 10 },
  DRUID: { name: 'Druid', hitDice: '1d8', thac0Base: 10 },
  BARD: { name: 'Bard', hitDice: '1d6', thac0Base: 10 }
}

export const CHARACTER_RACES = {
  HUMAN: { 
    name: 'Human', 
    subraces: [{ name: 'Standard Human', abilityMods: {} }],
    abilityMods: {}, 
    restrictions: [] 
  },
  DWARF: { 
    name: 'Dwarf', 
    subraces: [
      { name: 'Mountain Dwarf', abilityMods: { STR: 1, CHA: -1 } },
      { name: 'Hill Dwarf', abilityMods: { WIS: 1, CHA: -1 } }
    ],
    abilityMods: { CON: 1, CHA: -1 }, 
    restrictions: ['Paladin', 'Ranger'] 
  },
  ELF: { 
    name: 'Elf', 
    subraces: [
      { name: 'High Elf', abilityMods: { INT: 1, CON: -1 } },
      { name: 'Wood Elf', abilityMods: { WIS: 1, CON: -1, STR: 1, DEX: 1 } },
      { name: 'Drow', abilityMods: { DEX: 1, CHA: 1, STR: -1 } },
      { name: 'Wild Elf', abilityMods: { DEX: 2, INT: -1, WIS: -1 } }
    ],
    abilityMods: { DEX: 1, CON: -1 }, 
    restrictions: ['Cleric'] 
  },
  GNOME: { 
    name: 'Gnome', 
    subraces: [
      { name: 'Forest Gnome', abilityMods: { DEX: 1, WIS: -1, INT: 1 } },
      { name: 'Rock Gnome', abilityMods: { STR: 1, CON: 1, INT: 1, CHA: -2 } }
    ],
    abilityMods: { INT: 1, WIS: -1 }, 
    restrictions: ['Cleric', 'Ranger'] 
  },
  HALFLING: { 
    name: 'Halfling', 
    subraces: [
      { name: 'Lightfoot', abilityMods: { DEX: 2, STR: -1, CON: 1 } },
      { name: 'Stout', abilityMods: { CON: 1, DEX: 1, STR: -1 } }
    ],
    abilityMods: { DEX: 1, STR: -1 }, 
    restrictions: ['Cleric', 'Druid', 'Ranger', 'Paladin'] 
  },
  HALF_ORC: { 
    name: 'Half-Orc', 
    subraces: [{ name: 'Standard Half-Orc', abilityMods: { STR: 2, INT: -1, WIS: -1, CHA: -2 } }],
    abilityMods: { STR: 1, INT: -1, CHA: -2 }, 
    restrictions: [] 
  },
  HALF_ELF: { 
    name: 'Half-Elf', 
    subraces: [
      { name: 'Ranger-Born', abilityMods: { DEX: 1, INT: 1 } },
      { name: 'Urban Half-Elf', abilityMods: { CHA: 1, INT: 1 } }
    ],
    abilityMods: {}, 
    restrictions: [] 
  }
}

export const EXPERIENCE_TABLES = {
  Fighter: [0, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000],
  Thief: [0, 1250, 2500, 5000, 10000, 20000, 40000, 80000, 160000, 320000, 640000],
  Cleric: [0, 1500, 3000, 6000, 12000, 24000, 48000, 96000, 192000, 384000, 768000],
  'Magic-User': [0, 2500, 5000, 10000, 20000, 40000, 80000, 160000, 320000, 640000, 1280000],
  Ranger: [0, 2250, 4500, 9000, 18000, 36000, 75000, 150000, 300000, 600000, 1200000],
  Paladin: [0, 2750, 5500, 12000, 24000, 50000, 100000, 200000, 400000, 800000, 1600000],
  Druid: [0, 2000, 4000, 7500, 12500, 20000, 35000, 60000, 90000, 135000, 250000],
  Bard: [0, 1250, 2500, 5000, 10000, 20000, 40000, 80000, 160000, 320000, 640000]
}

export const ARMOR_CLASS = {
  Naked: 10,
  Leather: 8,
  'Studded Leather': 7,
  Chainmail: 5,
  Plate: 3,
  'Plate + Shield': 2
}

export function calculateModifier(ability) {
  return Math.floor((ability - 10) / 2)
}

export function calculateThac0(level, classKey) {
  const classData = CHARACTER_CLASSES[classKey]
  if (!classData) return 20
  
  const thac0 = classData.thac0Base - Math.floor((level - 1) / 3)
  return Math.max(1, thac0)
}

export function calculateLevel(exp, classKey) {
  const table = EXPERIENCE_TABLES[classKey] || EXPERIENCE_TABLES.Fighter
  
  for (let i = table.length - 1; i >= 0; i--) {
    if (exp >= table[i]) {
      return i + 1
    }
  }
  return 1
}

export function calculateHitPoints(level, conMod, classKey) {
  const classData = CHARACTER_CLASSES[classKey]
  if (!classData) return 1
  
  const diceSize = parseInt(classData.hitDice.match(/\d+/)[0])
  const baseHP = diceSize + (conMod * level)
  
  return Math.max(1, baseHP + ((level - 1) * (diceSize / 2)) + (conMod * (level - 1)))
}

export function calculateSpellSlots(level, ability, abilityMod) {
  const slots = {}
  
  for (let spellLevel = 1; spellLevel <= 9; spellLevel++) {
    if (spellLevel > level) {
      slots[spellLevel] = 0
    } else {
      const baseSlots = spellLevel === 1 ? 1 : Math.floor((level - spellLevel + 1) / 2)
      const bonusSlots = abilityMod >= spellLevel ? 1 : 0
      slots[spellLevel] = Math.max(0, baseSlots + bonusSlots)
    }
  }
  
  return slots
}

export function rollAbilityScores() {
  const scores = []
  for (let i = 0; i < 6; i++) {
    const rolls = []
    for (let j = 0; j < 4; j++) {
      rolls.push(Math.floor(Math.random() * 6) + 1)
    }
    rolls.sort((a, b) => b - a)
    scores.push(rolls[0] + rolls[1] + rolls[2])
  }
  return scores.sort((a, b) => b - a)
}

export function addCustomClass(classData) {
  CHARACTER_CLASSES[classData.key] = {
    name: classData.name,
    hitDice: classData.hitDice,
    thac0Base: classData.thac0Base
  }
}

export function addCustomRace(raceData) {
  CHARACTER_RACES[raceData.key] = {
    name: raceData.name,
    subraces: raceData.subraces || [{ name: raceData.name, abilityMods: {} }],
    abilityMods: raceData.abilityMods || {},
    restrictions: raceData.restrictions || []
  }
}

export function calculateMulticlassHP(levels, classKeys, conMod) {
  let totalHP = 0
  
  classKeys.forEach((key, idx) => {
    const classData = CHARACTER_CLASSES[key]
    const diceSize = parseInt(classData.hitDice.match(/\d+/)[0])
    const classLevel = levels[idx] || 1
    const baseHP = diceSize + (conMod * classLevel)
    totalHP += baseHP + ((classLevel - 1) * (diceSize / 2)) + (conMod * (classLevel - 1))
  })

  return Math.max(1, Math.floor(totalHP / classKeys.length))
}

export function calculateMulticlassThac0(levels, classKeys) {
  let avgThac0 = 0
  classKeys.forEach((key, idx) => {
    const level = levels[idx] || 1
    avgThac0 += calculateThac0(level, key)
  })
  return Math.round(avgThac0 / classKeys.length)
}

export function calculateCombinedExperience(multiclassData) {
  let totalExp = 0
  Object.entries(multiclassData).forEach(([className, level]) => {
    const table = EXPERIENCE_TABLES[className] || EXPERIENCE_TABLES.Fighter
    totalExp += table[level - 1] || 0
  })
  return totalExp
}