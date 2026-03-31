// 1st Edition D&D Spell Database

export const SPELL_SCHOOLS = {
  ABJURATION: 'Abjuration',
  CONJURATION: 'Conjuration',
  DIVINATION: 'Divination',
  ENCHANTMENT: 'Enchantment',
  EVOCATION: 'Evocation',
  ILLUSION: 'Illusion',
  NECROMANCY: 'Necromancy',
  TRANSMUTATION: 'Transmutation',
  UNIVERSAL: 'Universal'
};

export const SPELL_COMPONENTS = {
  VERBAL: 'V',
  SOMATIC: 'S',
  MATERIAL: 'M',
  FOCUS: 'F',
  DIVINE_FOCUS: 'DF'
};

export const SPELL_CLASSES = {
  MAGIC_USER: 'Magic-User',
  CLERIC: 'Cleric',
  DRUID: 'Druid',
  RANGER: 'Ranger',
  PALADIN: 'Paladin',
  BARD: 'Bard'
};

// Magic-User Spells (1st Edition)
export const MAGIC_USER_SPELLS = {
  1: [
    { name: 'Armor', school: SPELL_SCHOOLS.CONJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: 'Touch', duration: '12 hours + 1 hour/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Burning Hands', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '0', duration: 'Instantaneous', save: 'Half', ritualizable: false, description: '' },
    { name: 'Charm Person', school: SPELL_SCHOOLS.ENCHANTMENT, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '120 feet', duration: 'Special', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Color Spray', school: SPELL_SCHOOLS.ILLUSION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '0', duration: 'Special', save: 'Special', ritualizable: false, description: '' },
    { name: 'Comprehend Languages', school: SPELL_SCHOOLS.DIVINATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: 'Touch', duration: '5 rounds/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Detect Magic', school: SPELL_SCHOOLS.DIVINATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '0', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Erase', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '30 feet', duration: 'Permanent', save: 'Special', ritualizable: false, description: '' },
    { name: 'Feather Fall', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '60 feet (20 feet/level)', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Find Familiar', school: SPELL_SCHOOLS.CONJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 hour', range: '0', duration: 'Permanent', save: 'None', ritualizable: true, description: '' },
    { name: 'Floating Disc', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: '20 feet', duration: '3 hours + 1 hour/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Grease', school: SPELL_SCHOOLS.CONJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '60 feet', duration: '3 rounds/level', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Identify', school: SPELL_SCHOOLS.DIVINATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: 'Touch', duration: 'Special', save: 'None', ritualizable: true, description: '' },
    { name: 'Light', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '60 feet', duration: '1 hour + 10 minutes/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Mage Armor', school: SPELL_SCHOOLS.CONJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: 'Touch', duration: '12 hours + 1 hour/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Magic Missile', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '150 feet + 10 feet/level', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Mending', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '10 feet', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Message', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '60 feet + 10 feet/level', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Mount', school: SPELL_SCHOOLS.CONJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: '10 feet', duration: '2 hours/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Phantasmal Force', school: SPELL_SCHOOLS.ILLUSION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '60 feet + 10 feet/level', duration: 'Special', save: 'Special', ritualizable: false, description: '' },
    { name: 'Read Magic', school: SPELL_SCHOOLS.DIVINATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: 'Touch', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Shield', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '0', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Shocking Grasp', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: 'Touch', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Sleep', school: SPELL_SCHOOLS.ENCHANTMENT, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '30 feet', duration: '5 rounds/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Unseen Servant', school: SPELL_SCHOOLS.CONJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: '30 feet', duration: '1 hour/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Ventriloquism', school: SPELL_SCHOOLS.ILLUSION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '60 feet + 10 feet/level', duration: '2 rounds/level', save: 'None', ritualizable: false, description: '' }
  ],
  2: [
    { name: 'Alter Self', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '0', duration: '10 rounds/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Blur', school: SPELL_SCHOOLS.ILLUSION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '0', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Continual Light', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: '60 feet', duration: 'Permanent', save: 'None', ritualizable: false, description: '' },
    { name: 'Darkness, 15\' Radius', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '60 feet', duration: '10 rounds/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Detect Invisibility', school: SPELL_SCHOOLS.DIVINATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '0', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'ESP', school: SPELL_SCHOOLS.DIVINATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '0', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Invisibility', school: SPELL_SCHOOLS.ILLUSION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: 'Touch', duration: 'Until broken', save: 'None', ritualizable: false, description: '' },
    { name: 'Knock', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '60 feet', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Levitate', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '60 feet + 10 feet/level', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Locate Object', school: SPELL_SCHOOLS.DIVINATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: '60 feet + 10 feet/level', duration: '3 rounds/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Magic Mouth', school: SPELL_SCHOOLS.ILLUSION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '2 rounds', range: '30 feet', duration: 'Special', save: 'None', ritualizable: false, description: '' },
    { name: 'Mirror Image', school: SPELL_SCHOOLS.ILLUSION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '0', duration: '2 rounds/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Phantasmal Killer', school: SPELL_SCHOOLS.ILLUSION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '60 feet + 10 feet/level', duration: 'Special', save: 'Special', ritualizable: false, description: '' },
    { name: 'Pyrotechnics', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: 'Touch', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Rope Trick', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '2 rounds', range: 'Touch', duration: '1 hour + 10 minutes/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Shatter', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '60 feet', duration: 'Instantaneous', save: 'Special', ritualizable: false, description: '' },
    { name: 'Stinking Cloud', school: SPELL_SCHOOLS.CONJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '30 feet', duration: '1 round/level', save: 'Special', ritualizable: false, description: '' },
    { name: 'Strength', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: '30 feet', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Web', school: SPELL_SCHOOLS.CONJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '60 feet', duration: 'Special', save: 'Negates', ritualizable: false, description: '' }
  ],
  3: [
    { name: 'Blink', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '0', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Clairvoyance', school: SPELL_SCHOOLS.DIVINATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: '60 feet + 10 feet/level', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Dispel Magic', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '60 feet', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Explosive Runes', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: 'Touch', duration: 'Until triggered', save: 'Half', ritualizable: false, description: '' },
    { name: 'Feign Death', school: SPELL_SCHOOLS.NECROMANCY, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: 'Touch', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Fireball', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '160 feet + 10 feet/level', duration: 'Instantaneous', save: 'Half', ritualizable: false, description: '' },
    { name: 'Fly', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: 'Touch', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Gust of Wind', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '60 feet', duration: '1 round', save: 'None', ritualizable: false, description: '' },
    { name: 'Haste', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '60 feet', duration: '3 rounds/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Infravision', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: 'Touch', duration: '1 hour/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Invisibility, 10\' Radius', school: SPELL_SCHOOLS.ILLUSION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: 'Touch', duration: 'Until broken', save: 'None', ritualizable: false, description: '' },
    { name: 'Lightning Bolt', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '160 feet + 10 feet/level', duration: 'Instantaneous', save: 'Half', ritualizable: false, description: '' },
    { name: 'Protection from Evil, 10\' Radius', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: '0', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Sleet Storm', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '60 feet', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Slow', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '60 feet + 10 feet/level', duration: '3 rounds/level', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Suggestion', school: SPELL_SCHOOLS.ENCHANTMENT, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '30 feet', duration: 'Until completed', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Tiny Hut', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '0', duration: '4 hours + 1 hour/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Tongues', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '0', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Water Breathing', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: '30 feet', duration: '1 hour + 10 minutes/level', save: 'None', ritualizable: false, description: '' }
  ]
};

// Cleric Spells (simplified for space)
export const CLERIC_SPELLS = {
  1: [
    { name: 'Bless', school: SPELL_SCHOOLS.ENCHANTMENT, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '60 feet', duration: '6 rounds/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Cure Light Wounds', school: SPELL_SCHOOLS.NECROMANCY, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: 'Touch', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Detect Evil', school: SPELL_SCHOOLS.DIVINATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '0', duration: '1 turn/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Detect Magic', school: SPELL_SCHOOLS.DIVINATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '0', duration: '1 turn/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Light', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '60 feet', duration: '1 hour + 10 minutes/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Protection from Evil', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: 'Touch', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Purify Food and Drink', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '10 feet', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Sanctuary', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: 'Touch', duration: '1 round + 1 round/level', save: 'Negates', ritualizable: false, description: '' }
  ]
};

export function getAllSpellsByClass(className) {
  switch(className) {
    case SPELL_CLASSES.MAGIC_USER:
      return MAGIC_USER_SPELLS;
    case SPELL_CLASSES.CLERIC:
      return CLERIC_SPELLS;
    case SPELL_CLASSES.DRUID:
      return CLERIC_SPELLS;
    default:
      return {};
  }
}

export function getSpellsForLevel(spellBook, level) {
  return spellBook[level] || [];
}

export function searchSpells(spellList, query) {
  return spellList.filter(spell => 
    spell.name.toLowerCase().includes(query.toLowerCase())
  );
}

export function addCustomSpell(spellBook, level, spell) {
  if (!spellBook[level]) {
    spellBook[level] = [];
  }
  spellBook[level].push(spell);
}