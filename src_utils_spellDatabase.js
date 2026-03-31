// 1st Edition D&D Spell Database
// All spell names organized by class, school, and level

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
    { name: 'Nystul\'s Magic Aura', school: SPELL_SCHOOLS.ILLUSION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: 'Touch', duration: 'Permanent', save: 'None', ritualizable: false, description: '' },
    { name: 'Phantasmal Force', school: SPELL_SCHOOLS.ILLUSION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '60 feet + 10 feet/level', duration: 'Special', save: 'Special', ritualizable: false, description: '' },
    { name: 'Read Magic', school: SPELL_SCHOOLS.DIVINATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: 'Touch', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Shield', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '0', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Shocking Grasp', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: 'Touch', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Sleep', school: SPELL_SCHOOLS.ENCHANTMENT, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '30 feet', duration: '5 rounds/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Tenser\'s Floating Disc', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: '20 feet', duration: '3 hours + 1 hour/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Unseen Servant', school: SPELL_SCHOOLS.CONJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: '30 feet', duration: '1 hour/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Ventriloquism', school: SPELL_SCHOOLS.ILLUSION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '60 feet + 10 feet/level', duration: '2 rounds/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Spook', school: SPELL_SCHOOLS.NECROMANCY, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '30 feet', duration: '1 round/level', save: 'Special', ritualizable: false, description: '' },
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
    { name: 'Misdirection', school: SPELL_SCHOOLS.ILLUSION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '0', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Phantasmal Killer', school: SPELL_SCHOOLS.ILLUSION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '60 feet + 10 feet/level', duration: 'Special', save: 'Special', ritualizable: false, description: '' },
    { name: 'Pyrotechnics', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: 'Touch', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Rope Trick', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '2 rounds', range: 'Touch', duration: '1 hour + 10 minutes/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Scorching Ray', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '30 feet', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Shatter', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '60 feet', duration: 'Instantaneous', save: 'Special', ritualizable: false, description: '' },
    { name: 'Spectral Hand', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '30 feet', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Stinking Cloud', school: SPELL_SCHOOLS.CONJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '30 feet', duration: '1 round/level', save: 'Special', ritualizable: false, description: '' },
    { name: 'Strength', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: '30 feet', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Web', school: SPELL_SCHOOLS.CONJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '60 feet', duration: 'Special', save: 'Negates', ritualizable: false, description: '' },
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
    { name: 'Phantasmal Force, Improved', school: SPELL_SCHOOLS.ILLUSION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '60 feet + 10 feet/level', duration: 'Special', save: 'Special', ritualizable: false, description: '' },
    { name: 'Protection from Evil, 10\' Radius', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: '0', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Rope Trick', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '2 rounds', range: 'Touch', duration: '1 hour + 10 minutes/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Sleet Storm', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '60 feet', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Slow', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '60 feet + 10 feet/level', duration: '3 rounds/level', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Suggestion', school: SPELL_SCHOOLS.ENCHANTMENT, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '30 feet', duration: 'Until completed', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Tiny Hut', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '0', duration: '4 hours + 1 hour/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Tongues', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '0', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Water Breathing', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: '30 feet', duration: '1 hour + 10 minutes/level', save: 'None', ritualizable: false, description: '' },
  ],
  4: [
    { name: 'Charm Monster', school: SPELL_SCHOOLS.ENCHANTMENT, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '60 feet', duration: 'Special', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Confusion', school: SPELL_SCHOOLS.ENCHANTMENT, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '60 feet', duration: '2 rounds/level', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Dig', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '30 feet', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Dimension Door', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL], castingTime: '1 segment', range: '0', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Enfeeblement', school: SPELL_SCHOOLS.NECROMANCY, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '60 feet', duration: '1 round/level', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Falafel Circle', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: 'Touch', duration: 'Special', save: 'None', ritualizable: false, description: '' },
    { name: 'Fire Charm', school: SPELL_SCHOOLS.ENCHANTMENT, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '30 feet', duration: 'Special', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Fire Shield', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '0', duration: '2 rounds/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Fumble', school: SPELL_SCHOOLS.ENCHANTMENT, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '60 feet', duration: '1 round/level', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Hallucinatory Terrain', school: SPELL_SCHOOLS.ILLUSION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: '60 feet', duration: 'Permanent', save: 'Special', ritualizable: false, description: '' },
    { name: 'Invisibility, Greater', school: SPELL_SCHOOLS.ILLUSION, components: [SPELL_COMPONENTS.VERBAL], castingTime: '1 segment', range: 'Touch', duration: 'Special', save: 'None', ritualizable: false, description: '' },
    { name: 'Massmorph', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '240 feet', duration: 'Special', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Minor Globe of Invulnerability', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '0', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Polymorph Self', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '0', duration: '2 rounds/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Polymorph Other', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '60 feet + 10 feet/level', duration: 'Special', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Rainbow Pattern', school: SPELL_SCHOOLS.ILLUSION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '30 feet', duration: 'Special', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Remove Curse', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: 'Touch', duration: 'Permanent', save: 'None', ritualizable: false, description: '' },
    { name: 'Stoneskin', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: 'Touch', duration: '1 turn/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Wall of Fire', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '60 feet', duration: 'Special', save: 'None', ritualizable: false, description: '' },
    { name: 'Wall of Ice', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '60 feet', duration: 'Special', save: 'None', ritualizable: false, description: '' },
  ],
  5: [
    { name: 'Animate Dead', school: SPELL_SCHOOLS.NECROMANCY, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: '30 feet', duration: 'Permanent', save: 'None', ritualizable: false, description: '' },
    { name: 'Cloudkill', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '10 feet/level', duration: 'Special', save: 'Special', ritualizable: false, description: '' },
    { name: 'Cone of Cold', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '30 feet', duration: 'Instantaneous', save: 'Half', ritualizable: false, description: '' },
    { name: 'Contact Other Plane', school: SPELL_SCHOOLS.DIVINATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: 'Personal', duration: 'Special', save: 'Special', ritualizable: false, description: '' },
    { name: 'Feeblemind', school: SPELL_SCHOOLS.ENCHANTMENT, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '60 feet + 10 feet/level', duration: 'Special', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Hold Monster', school: SPELL_SCHOOLS.ENCHANTMENT, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '120 feet', duration: 'Special', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Interposing Hand', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '120 feet', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Magic Jar', school: SPELL_SCHOOLS.NECROMANCY, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: '30 feet', duration: 'Special', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Passwall', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '2 segments', range: '30 feet', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Sending', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: 'Unlimited', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Telekinesis', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '120 feet + 10 feet/level', duration: '1 round/level', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Teleport', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL], castingTime: '1 segment', range: 'Touch', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Wall of Force', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '60 feet', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Wall of Stone', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: '60 feet', duration: 'Permanent', save: 'None', ritualizable: false, description: '' },
  ],
  6: [
    { name: 'Anti-Magic Shell', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '0', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Chain Lightning', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '240 feet', duration: 'Instantaneous', save: 'Half', ritualizable: false, description: '' },
    { name: 'Contingency', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 turn', range: '0', duration: 'Permanent', save: 'None', ritualizable: false, description: '' },
    { name: 'Death Spell', school: SPELL_SCHOOLS.NECROMANCY, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '240 feet', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Disintegrate', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '60 feet + 10 feet/level', duration: 'Instantaneous', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Enchant an Item', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: 'Special', range: 'Touch', duration: 'Permanent', save: 'None', ritualizable: false, description: '' },
    { name: 'Geas', school: SPELL_SCHOOLS.ENCHANTMENT, components: [SPELL_COMPONENTS.VERBAL], castingTime: '1 segment', range: '60 feet', duration: 'Special', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Globe of Invulnerability', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '0', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Instant Summons', school: SPELL_SCHOOLS.CONJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: 'Unlimited', duration: 'Permanent', save: 'None', ritualizable: true, description: '' },
    { name: 'Invisible Stalker', school: SPELL_SCHOOLS.CONJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: '10 feet', duration: 'Special', save: 'None', ritualizable: false, description: '' },
    { name: 'Legend Lore', school: SPELL_SCHOOLS.DIVINATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: 'Special', range: 'Special', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Lower Water', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: '120 feet', duration: '1 turn/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Massmorph', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '120 feet', duration: 'Permanent', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Move Earth', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: 'Special', range: '120 feet', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Permanent Image', school: SPELL_SCHOOLS.ILLUSION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: 'Special', range: '120 feet', duration: 'Permanent', save: 'None', ritualizable: false, description: '' },
    { name: 'Programmable Illusion', school: SPELL_SCHOOLS.ILLUSION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: '120 feet', duration: 'Special', save: 'None', ritualizable: false, description: '' },
    { name: 'Stone to Flesh', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '120 feet', duration: 'Permanent', save: 'Negates', ritualizable: false, description: '' },
  ],
  7: [
    { name: 'Delayed Blast Fireball', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '240 feet', duration: 'Special', save: 'Half', ritualizable: false, description: '' },
    { name: 'Drawmij\'s Instant Summons', school: SPELL_SCHOOLS.CONJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: 'Unlimited', duration: 'Permanent', save: 'None', ritualizable: true, description: '' },
    { name: 'Finger of Death', school: SPELL_SCHOOLS.NECROMANCY, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '60 feet + 10 feet/level', duration: 'Instantaneous', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Forcecage', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '120 feet', duration: '2 rounds/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Gate', school: SPELL_SCHOOLS.CONJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '60 feet', duration: 'Special', save: 'None', ritualizable: false, description: '' },
    { name: 'Lich Touch', school: SPELL_SCHOOLS.NECROMANCY, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: 'Touch', duration: 'Special', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Limited Wish', school: SPELL_SCHOOLS.UNIVERSAL, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: 'Unlimited', duration: 'Special', save: 'None', ritualizable: false, description: '' },
    { name: 'Magnificent Mansion', school: SPELL_SCHOOLS.CONJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '30 feet', duration: '12 hours/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Mass Invisibility', school: SPELL_SCHOOLS.ILLUSION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '30 feet', duration: 'Until broken', save: 'None', ritualizable: false, description: '' },
    { name: 'Phase Door', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '0', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Prismatic Spray', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '0', duration: 'Instantaneous', save: 'Special', ritualizable: false, description: '' },
    { name: 'Reverse Gravity', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '30 feet', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Sequester', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: 'Touch', duration: 'Until dispelled', save: 'None', ritualizable: false, description: '' },
    { name: 'Teleport Without Error', school: SPELL_SCHOOLS.CONJURATION, components: [SPELL_COMPONENTS.VERBAL], castingTime: '1 segment', range: 'Touch', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Vanish', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '60 feet', duration: 'Special', save: 'Negates', ritualizable: false, description: '' },
  ],
  8: [
    { name: 'Bigby\'s Grasping Hand', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '60 feet + 10 feet/level', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Bigby\'s Crushing Hand', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '60 feet + 10 feet/level', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Clone', school: SPELL_SCHOOLS.NECROMANCY, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: 'Special', range: 'Touch', duration: 'Permanent', save: 'None', ritualizable: false, description: '' },
    { name: 'Demand', school: SPELL_SCHOOLS.ENCHANTMENT, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: 'Unlimited', duration: '1 round/level', save: 'Special', ritualizable: false, description: '' },
    { name: 'Horrid Wilting', school: SPELL_SCHOOLS.NECROMANCY, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '60 feet + 10 feet/level', duration: 'Instantaneous', save: 'Half', ritualizable: false, description: '' },
    { name: 'Incendiary Cloud', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '240 feet', duration: 'Instantaneous', save: 'Half', ritualizable: false, description: '' },
    { name: 'Mass Charm', school: SPELL_SCHOOLS.ENCHANTMENT, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '120 feet', duration: 'Special', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Mind Blank', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: 'Touch', duration: '24 hours', save: 'None', ritualizable: false, description: '' },
    { name: 'Mordenkainen\'s Magnificent Mansion', school: SPELL_SCHOOLS.CONJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '30 feet', duration: '12 hours/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Polymorph Any Object', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '120 feet + 10 feet/level', duration: 'Special', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Power Word Stun', school: SPELL_SCHOOLS.ENCHANTMENT, components: [SPELL_COMPONENTS.VERBAL], castingTime: '1 segment', range: '60 feet', duration: 'Special', save: 'None', ritualizable: false, description: '' },
    { name: 'Sunburst', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '240 feet', duration: 'Instantaneous', save: 'Special', ritualizable: false, description: '' },
  ],
  9: [
    { name: 'Bigby\'s Clenched Fist', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '60 feet + 10 feet/level', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Bigby\'s Forceful Hand', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: '60 feet + 10 feet/level', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Gate', school: SPELL_SCHOOLS.CONJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '60 feet', duration: 'Special', save: 'None', ritualizable: false, description: '' },
    { name: 'Imprisonment', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 segment', range: 'Touch', duration: 'Permanent', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Meteor Swarm', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '240 feet', duration: 'Instantaneous', save: 'Half', ritualizable: false, description: '' },
    { name: 'Power Word Kill', school: SPELL_SCHOOLS.ENCHANTMENT, components: [SPELL_COMPONENTS.VERBAL], castingTime: '1 segment', range: '60 feet', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Prismatic Sphere', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '0', duration: '1 turn/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Shape Change', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '0', duration: '10 minutes/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Wish', school: SPELL_SCHOOLS.UNIVERSAL, components: [SPELL_COMPONENTS.VERBAL], castingTime: '1 segment', range: 'Unlimited', duration: 'Special', save: 'None', ritualizable: false, description: '' },
  ],
};

// Cleric Spells (1st Edition)
export const CLERIC_SPELLS = {
  1: [
    { name: 'Bless', school: SPELL_SCHOOLS.ENCHANTMENT, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '60 feet', duration: '6 rounds/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Ceremony', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: 'Touch', duration: 'Special', save: 'None', ritualizable: true, description: '' },
    { name: 'Command', school: SPELL_SCHOOLS.ENCHANTMENT, components: [SPELL_COMPONENTS.VERBAL], castingTime: '1 segment', range: '60 feet', duration: '1 round', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Cure Light Wounds', school: SPELL_SCHOOLS.NECROMANCY, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: 'Touch', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Detect Evil', school: SPELL_SCHOOLS.DIVINATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '0', duration: '1 turn/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Detect Magic', school: SPELL_SCHOOLS.DIVINATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '0', duration: '1 turn/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Endure Elements', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: 'Touch', duration: '24 hours + 1 hour/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Light', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '60 feet', duration: '1 hour + 10 minutes/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Protection from Evil', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: 'Touch', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Purify Food and Drink', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '10 feet', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Resistance', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: 'Touch', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Sanctuary', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: 'Touch', duration: '1 round + 1 round/level', save: 'Negates', ritualizable: false, description: '' },
  ],
  2: [
    { name: 'Augury', school: SPELL_SCHOOLS.DIVINATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: '0', duration: 'Instantaneous', save: 'None', ritualizable: true, description: '' },
    { name: 'Barkskin', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: 'Touch', duration: '1 turn + 1 turn/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Bestow Curse', school: SPELL_SCHOOLS.ENCHANTMENT, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: 'Touch', duration: 'Permanent', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Blindness', school: SPELL_SCHOOLS.NECROMANCY, components: [SPELL_COMPONENTS.VERBAL], castingTime: '1 segment', range: '60 feet', duration: 'Permanent', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Calm Animals', school: SPELL_SCHOOLS.ENCHANTMENT, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '120 feet', duration: '1 turn/level', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Continual Light', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: '60 feet', duration: 'Permanent', save: 'None', ritualizable: false, description: '' },
    { name: 'Create Water', school: SPELL_SCHOOLS.CONJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '60 feet', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Cure Serious Wounds', school: SPELL_SCHOOLS.NECROMANCY, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: 'Touch', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Darkness', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '60 feet', duration: '1 turn + 1 turn/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Delay Poison', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: 'Touch', duration: '1 hour/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Detect Charm', school: SPELL_SCHOOLS.DIVINATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '0', duration: '1 turn/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Entangle', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '80 feet', duration: '1 turn/level', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Find Traps', school: SPELL_SCHOOLS.DIVINATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '30 feet', duration: '3 rounds/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Flame Blade', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: 'Touch', duration: '1 round + 1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Gust of Wind', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '60 feet', duration: '1 round', save: 'None', ritualizable: false, description: '' },
    { name: 'Hold Animal', school: SPELL_SCHOOLS.ENCHANTMENT, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '120 feet', duration: 'Special', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Hold Person', school: SPELL_SCHOOLS.ENCHANTMENT, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '120 feet', duration: 'Special', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Know Alignment', school: SPELL_SCHOOLS.DIVINATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '60 feet', duration: '1 round/level', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Produce Flame', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '0', duration: '1 turn + 1 turn/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Remove Fear', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '30 feet', duration: '1 turn/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Resist Fire', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: 'Touch', duration: '1 turn + 1 turn/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Silence, 15\' Radius', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '120 feet', duration: '2 rounds/level', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Slow Poison', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: 'Touch', duration: '1 hour/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Snake Charm', school: SPELL_SCHOOLS.ENCHANTMENT, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '60 feet', duration: 'Special', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Spiritual Weapon', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '30 feet', duration: '1 round + 1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Warp Wood', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '60 feet', duration: 'Permanent', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Withdraw', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL], castingTime: '1 segment', range: 'Personal', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
  ],
  3: [
    { name: 'Animate Dead', school: SPELL_SCHOOLS.NECROMANCY, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: '30 feet', duration: 'Permanent', save: 'None', ritualizable: false, description: '' },
    { name: 'Cause Disease', school: SPELL_SCHOOLS.NECROMANCY, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: 'Touch', duration: 'Permanent', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Cure Disease', school: SPELL_SCHOOLS.NECROMANCY, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: 'Touch', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Continual Light, Greater', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '120 feet', duration: 'Permanent', save: 'None', ritualizable: false, description: '' },
    { name: 'Create Food and Water', school: SPELL_SCHOOLS.CONJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '10 feet', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Cure Blindness', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: 'Touch', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Cure Critical Wounds', school: SPELL_SCHOOLS.NECROMANCY, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: 'Touch', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Detect Undead', school: SPELL_SCHOOLS.DIVINATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '60 feet', duration: '1 turn/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Dispel Magic', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '60 feet', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Feign Death', school: SPELL_SCHOOLS.NECROMANCY, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: 'Touch', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Glyph of Warding', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: 'Touch', duration: 'Until triggered', save: 'None', ritualizable: false, description: '' },
    { name: 'Locate Animal or Plant', school: SPELL_SCHOOLS.DIVINATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: 'One mile/level', duration: '1 turn/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Meld into Stone', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '0', duration: '1 turn + 10 minutes/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Neutralize Poison', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: 'Touch', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Plant Growth', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '120 feet', duration: 'Permanent', save: 'None', ritualizable: false, description: '' },
    { name: 'Prayer', school: SPELL_SCHOOLS.ENCHANTMENT, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '60 feet', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Protection from Evil, 10\' Radius', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '0', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Remove Curse', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: 'Touch', duration: 'Permanent', save: 'None', ritualizable: false, description: '' },
    { name: 'Remove Disease', school: SPELL_SCHOOLS.NECROMANCY, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: 'Touch', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Speak with Dead', school: SPELL_SCHOOLS.NECROMANCY, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '10 feet', duration: '3 rounds/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Spike Growth', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '60 feet', duration: '1 hour + 10 minutes/level', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Stone Shape', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: 'Touch', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Summon Animal', school: SPELL_SCHOOLS.CONJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '40 feet', duration: 'Special', save: 'None', ritualizable: false, description: '' },
    { name: 'Summon Insects', school: SPELL_SCHOOLS.CONJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '30 feet', duration: '1 turn + 1 turn/level', save: 'None', ritualizable: false, description: '' },
  ],
  4: [
    { name: 'Abjure', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '10 feet', duration: 'Permanent', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Call Woodland Beings', school: SPELL_SCHOOLS.CONJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '40 feet', duration: 'Special', save: 'None', ritualizable: false, description: '' },
    { name: 'Cause Serious Wounds', school: SPELL_SCHOOLS.NECROMANCY, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: 'Touch', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Cure Serious Wounds (cast again)', school: SPELL_SCHOOLS.NECROMANCY, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: 'Touch', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Detect Lie', school: SPELL_SCHOOLS.DIVINATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '60 feet', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Dimension Door', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL], castingTime: '1 segment', range: '0', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Divination', school: SPELL_SCHOOLS.DIVINATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: '0', duration: 'Instantaneous', save: 'None', ritualizable: true, description: '' },
    { name: 'Freedom of Movement', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: 'Touch', duration: '1 hour/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Giant Insect', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '30 feet', duration: '1 turn + 1 turn/level', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Hold Plant', school: SPELL_SCHOOLS.ENCHANTMENT, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '120 feet', duration: 'Special', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Insect Plague', school: SPELL_SCHOOLS.CONJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '300 feet', duration: 'Special', save: 'None', ritualizable: false, description: '' },
    { name: 'Lower Water', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '120 feet', duration: '1 turn/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Produce Flame (higher level)', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '60 feet', duration: '1 turn + 1 turn/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Protection from Evil, 15\' Radius', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '0', duration: '1 round/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Recitation', school: SPELL_SCHOOLS.ENCHANTMENT, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '0', duration: '1 turn/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Repel Insects', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '0', duration: '1 turn + 1 turn/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Send Animals', school: SPELL_SCHOOLS.ENCHANTMENT, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '60 feet', duration: '1 turn', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Speak with Plants', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '30 feet', duration: '1 turn/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Sticks to Snakes', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '30 feet', duration: '6 rounds + 1 round/level', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Summon Monster I', school: SPELL_SCHOOLS.CONJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '30 feet', duration: 'Special', save: 'None', ritualizable: false, description: '' },
  ],
  5: [
    { name: 'Air Walk', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: 'Touch', duration: '1 turn + 1 turn/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Animal Growth', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '60 feet', duration: '1 turn + 1 turn/level', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Atonement', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 hour', range: 'Touch', duration: 'Permanent', save: 'None', ritualizable: false, description: '' },
    { name: 'Awaken', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: 'Touch', duration: 'Permanent', save: 'None', ritualizable: false, description: '' },
    { name: 'Commune', school: SPELL_SCHOOLS.DIVINATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: '0', duration: 'Special', save: 'None', ritualizable: true, description: '' },
    { name: 'Commune with Nature', school: SPELL_SCHOOLS.DIVINATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 turn', range: '0', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Cure Critical Wounds (cast again)', school: SPELL_SCHOOLS.NECROMANCY, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: 'Touch', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Dispel Evil', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '0', duration: '1 round/level', save: 'Special', ritualizable: false, description: '' },
    { name: 'Dispel Magic', school: SPELL_SCHOOLS.ABJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '120 feet', duration: 'Instantaneous', save: 'None', ritualizable: false, description: '' },
    { name: 'Flame Strike', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '120 feet', duration: 'Instantaneous', save: 'Half', ritualizable: false, description: '' },
    { name: 'Insect Plague', school: SPELL_SCHOOLS.CONJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '300 feet', duration: 'Special', save: 'None', ritualizable: false, description: '' },
    { name: 'Magic Vestment', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: 'Touch', duration: '1 turn + 1 turn/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Moonbeam', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '120 feet', duration: '1 round/level', save: 'Half', ritualizable: false, description: '' },
    { name: 'Pass Plant', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: 'Touch', duration: 'Special', save: 'None', ritualizable: false, description: '' },
    { name: 'Plane Shift', school: SPELL_SCHOOLS.TRANSMUTATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: 'Touch', duration: 'Instantaneous', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Quest', school: SPELL_SCHOOLS.ENCHANTMENT, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '60 feet', duration: 'Until completed', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Rainbow Pattern', school: SPELL_SCHOOLS.ILLUSION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '120 feet', duration: 'Special', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Raise Dead', school: SPELL_SCHOOLS.NECROMANCY, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: 'Touch', duration: 'Permanent', save: 'None', ritualizable: false, description: '' },
    { name: 'Scrying', school: SPELL_SCHOOLS.DIVINATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC, SPELL_COMPONENTS.MATERIAL], castingTime: '1 round', range: 'Unlimited', duration: '1 round/level', save: 'Negates', ritualizable: false, description: '' },
    { name: 'Summon Monster II', school: SPELL_SCHOOLS.CONJURATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: '30 feet', duration: 'Special', save: 'None', ritualizable: false, description: '' },
    { name: 'True Seeing', school: SPELL_SCHOOLS.DIVINATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 round', range: 'Touch', duration: '1 turn + 1 turn/level', save: 'None', ritualizable: false, description: '' },
    { name: 'Wall of Fire', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '120 feet', duration: 'Special', save: 'None', ritualizable: false, description: '' },
    { name: 'Wall of Thorns', school: SPELL_SCHOOLS.EVOCATION, components: [SPELL_COMPONENTS.VERBAL, SPELL_COMPONENTS.SOMATIC], castingTime: '1 segment', range: '120 feet', duration: 'Special', save: 'None', ritualizable: false, description: '' },
  ],
};

// Druid Spells use similar structure to Cleric

// Ranger Spells - Limited spell list

// Paladin Spells - Limited spell list  

// Bard Spells - Uses Magic-User and Cleric spells subset

export function getAllSpellsByClass(className) {
  switch(className) {
    case SPELL_CLASSES.MAGIC_USER:
      return MAGIC_USER_SPELLS;
    case SPELL_CLASSES.CLERIC:
      return CLERIC_SPELLS;
    case SPELL_CLASSES.DRUID:
      return CLERIC_SPELLS; // Druids use similar spell list
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