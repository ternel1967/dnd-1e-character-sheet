export const SPELL_SCHOOLS = {
  EVOCATION: 'Evocation',
  ABJURATION: 'Abjuration',
  ENCHANTMENT: 'Enchantment',
  ILLUSION: 'Illusion',
  NECROMANCY: 'Necromancy',
  DIVINATION: 'Divination',
  TRANSMUTATION: 'Transmutation',
  CONJURATION: 'Conjuration'
}

export const SPELL_DETAILS = {
  'Magic Missile': {
    level: 1,
    school: 'Evocation',
    castingTime: '1 action',
    range: '120 feet',
    components: 'V, S',
    duration: 'Instantaneous',
    description: 'You hurl a mote of glowing energy at a creature you can see within range. Make a ranged spell attack against the target.'
  },
  'Shield': {
    level: 1,
    school: 'Abjuration',
    castingTime: '1 reaction',
    range: 'Self',
    components: 'V, S',
    duration: '1 round',
    description: 'An invisible barrier of magical force springs into existence to protect you. Until the start of your next turn, you have a +5 bonus to AC, including against the triggering attack.'
  },
  'Burning Hands': {
    level: 1,
    school: 'Evocation',
    castingTime: '1 action',
    range: 'Self (15-foot cone)',
    components: 'V, S',
    duration: 'Instantaneous',
    description: 'As you hold your hands with thumbs touching and fingers spread, a thin sheet of flames springs from your joined hands. Each creature in a 15-foot cone must make a Dexterity saving throw.'
  },
  'Sleep': {
    level: 1,
    school: 'Enchantment',
    castingTime: '1 action',
    range: '90 feet',
    components: 'V, S, M',
    duration: '1 minute',
    description: 'This spell sends creatures into a magical slumber. Roll 5d8; the total is how many hit points of creatures this spell can affect.'
  },
  'Fireball': {
    level: 3,
    school: 'Evocation',
    castingTime: '1 action',
    range: '150 feet',
    components: 'V, S, M',
    duration: 'Instantaneous',
    description: 'A bright streak flashes from your pointing finger to a point of your choice within range and then blossoms with a low roar into an explosion of flame.'
  },
  'Lightning Bolt': {
    level: 3,
    school: 'Evocation',
    castingTime: '1 action',
    range: 'Self (100-foot line)',
    components: 'V, S, M',
    duration: 'Instantaneous',
    description: 'A stroke of lightning forming a line of 100 feet long and 5 feet wide blasts out from you in a direction you choose.'
  },
  'Invisibility': {
    level: 2,
    school: 'Illusion',
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, S, M',
    duration: 'Concentration, up to 1 hour',
    description: 'A creature you touch becomes invisible until the spell ends. Anything the target is wearing or carrying is invisible as long as it is on the target\'s person.'
  },
  'Cure Light Wounds': {
    level: 1,
    school: 'Necromancy',
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, S',
    duration: 'Instantaneous',
    description: 'A creature you touch regains hit points equal to 1d8 + your spellcasting ability modifier.'
  },
  'Bless': {
    level: 1,
    school: 'Enchantment',
    castingTime: '1 action',
    range: '30 feet',
    components: 'V, S, M',
    duration: 'Concentration, up to 1 minute',
    description: 'You bless up to three creatures of your choice within range. Whenever a target makes an attack roll or a saving throw before the spell ends, the target can roll a d4 and add the number rolled to the attack roll or saving throw.'
  },
  'Detect Magic': {
    level: 1,
    school: 'Divination',
    castingTime: '1 action',
    range: 'Self',
    components: 'V, S',
    duration: 'Concentration, up to 10 minutes',
    description: 'For the spell\'s duration, you sense the presence of magic within 30 feet of you. If you sense magic in this way, you can use your action to see a faint aura around any visible creature or object in the area that bears magic.'
  }
}

export function getSpellDetails(spellName) {
  return SPELL_DETAILS[spellName] || null
}

export function getSpellsByLevel(level) {
  return Object.entries(SPELL_DETAILS)
    .filter(([name, details]) => details.level === level)
    .map(([name, details]) => ({ name, ...details }))
}

export function searchSpells(query) {
  const lowercaseQuery = query.toLowerCase()
  return Object.entries(SPELL_DETAILS)
    .filter(([name]) => name.toLowerCase().includes(lowercaseQuery))
    .map(([name, details]) => ({ name, ...details }))
}