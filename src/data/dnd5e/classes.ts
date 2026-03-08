import type { AbilityScores } from '@/stores/character'

export type AbilityKey = keyof AbilityScores
export type CasterType = 'full' | 'half' | 'third' | 'pact'

export interface ClassFeature {
  id: string
  name: string
  level: number
  description: string
}

export interface Subclass {
  id: string
  name: string
  description: string
  features: ClassFeature[]
}

export interface SpellcastingInfo {
  ability: AbilityKey
  /** Number of cantrips known at each character level (index 0 = level 1). Length 20. */
  cantripsKnown: number[]
  /** Number of spells known per level (for known-casters like Bard/Sorcerer/Ranger/Warlock); null for prepared-casters */
  spellsKnown: number[] | null
  /** Whether this class prepares spells from the full class list (Cleric/Druid/Paladin/Wizard) */
  preparedCaster: boolean
  casterType: CasterType
}

export interface CharacterClass {
  id: string
  name: string
  description: string
  hitDie: number
  primaryAbility: AbilityKey[]
  savingThrows: [AbilityKey, AbilityKey]
  armorProficiencies: string[]
  weaponProficiencies: string[]
  toolProficiencies: string[]
  skillChoices: string[]
  numSkillChoices: number
  startingEquipment: string[]
  subclassLevel: number
  subclassName: string
  features: ClassFeature[]
  subclasses: Subclass[]
  spellcasting: SpellcastingInfo | null
}

// ─────────────────────────────────────────────────────────────────────────────
// Cantrips-known progression tables (index 0 = level 1, through index 19 = level 20)
// ─────────────────────────────────────────────────────────────────────────────

const bardCantrips =     [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
const clericCantrips =   [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
const druidCantrips =    [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
const sorcererCantrips = [4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
const warlockCantrips =  [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
const wizardCantrips =   [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]

// Fighter (Eldritch Knight) and Rogue (Arcane Trickster) cantrips (gained at level 3)
const thirdCasterCantrips = [0, 0, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]

// ─────────────────────────────────────────────────────────────────────────────
// Spells-known progression tables
// ─────────────────────────────────────────────────────────────────────────────

const bardSpellsKnown =     [4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 15, 16, 18, 19, 19, 20, 22, 22, 22]
const sorcererSpellsKnown = [2, 3, 4, 5, 6, 7, 8,  9, 10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15]
const rangerSpellsKnown =   [0, 2, 3, 3, 4, 4, 5,  5,  6,  6,  7,  7,  8,  8,  9,  9, 10, 10, 11, 11]
const warlockSpellsKnown =  [2, 3, 4, 5, 6, 7, 8,  9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15]
const eldritchKnightSpellsKnown = [0, 0, 3, 4, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10, 10, 11, 11, 11, 12, 13]
const arcaneTricksterSpellsKnown = [0, 0, 3, 4, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10, 10, 11, 11, 11, 12, 13]

// No cantrips for Paladin/Ranger (half-casters without cantrips)
const noCantrips = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

// ─────────────────────────────────────────────────────────────────────────────
// Class Definitions
// ─────────────────────────────────────────────────────────────────────────────

export const classes: readonly CharacterClass[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // Barbarian
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'barbarian',
    name: 'Barbarian',
    description: 'A fierce warrior who can enter a battle rage.',
    hitDie: 12,
    primaryAbility: ['str'],
    savingThrows: ['str', 'con'],
    armorProficiencies: ['light', 'medium', 'shields'],
    weaponProficiencies: ['simple', 'martial'],
    toolProficiencies: [],
    skillChoices: ['animal-handling', 'athletics', 'intimidation', 'nature', 'perception', 'survival'],
    numSkillChoices: 2,
    startingEquipment: [
      'greataxe',
      'two handaxes',
      'explorer-pack',
      'four javelins',
    ],
    subclassLevel: 3,
    subclassName: 'Primal Path',
    spellcasting: null,
    features: [
      { id: 'rage', name: 'Rage', level: 1, description: 'In battle, you fight with primal ferocity. You can enter a rage as a bonus action, gaining advantage on STR checks and saving throws, bonus rage damage, and resistance to bludgeoning, piercing, and slashing damage.' },
      { id: 'unarmored-defense-barb', name: 'Unarmored Defense', level: 1, description: 'While not wearing armor, your AC equals 10 + DEX modifier + CON modifier. You can use a shield and still gain this benefit.' },
      { id: 'reckless-attack', name: 'Reckless Attack', level: 2, description: 'You can throw aside all concern for defense to attack with fierce desperation. You gain advantage on melee weapon attack rolls using STR during this turn, but attack rolls against you have advantage until your next turn.' },
      { id: 'danger-sense', name: 'Danger Sense', level: 2, description: 'You have advantage on DEX saving throws against effects that you can see, such as traps and spells. You cannot be blinded, deafened, or incapacitated to gain this benefit.' },
      { id: 'primal-path', name: 'Primal Path', level: 3, description: 'You choose a path that shapes the nature of your rage.' },
    ],
    subclasses: [
      {
        id: 'berserker',
        name: 'Path of the Berserker',
        description: 'A path that channels rage into a violent battle frenzy.',
        features: [
          { id: 'frenzy', name: 'Frenzy', level: 3, description: 'You can go into a frenzy when you rage. If you do so, for the duration of your rage you can make a single melee weapon attack as a bonus action on each of your turns after this one. When your rage ends, you suffer one level of exhaustion.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Bard
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'bard',
    name: 'Bard',
    description: 'An inspiring magician whose power echoes the music of creation.',
    hitDie: 8,
    primaryAbility: ['cha'],
    savingThrows: ['dex', 'cha'],
    armorProficiencies: ['light'],
    weaponProficiencies: ['simple', 'hand crossbow', 'longsword', 'rapier', 'shortsword'],
    toolProficiencies: ['three musical instruments of your choice'],
    skillChoices: [
      'acrobatics', 'animal-handling', 'arcana', 'athletics', 'deception',
      'history', 'insight', 'intimidation', 'investigation', 'medicine',
      'nature', 'perception', 'performance', 'persuasion', 'religion',
      'sleight-of-hand', 'stealth', 'survival',
    ],
    numSkillChoices: 3,
    startingEquipment: [
      'rapier',
      'diplomat-pack',
      'lute',
      'leather armor',
      'dagger',
    ],
    subclassLevel: 3,
    subclassName: 'Bard College',
    spellcasting: {
      ability: 'cha',
      cantripsKnown: bardCantrips,
      spellsKnown: bardSpellsKnown,
      preparedCaster: false,
      casterType: 'full',
    },
    features: [
      { id: 'spellcasting-bard', name: 'Spellcasting', level: 1, description: 'You have learned to untangle and reshape the fabric of reality in harmony with your wishes and music. Charisma is your spellcasting ability.' },
      { id: 'bardic-inspiration', name: 'Bardic Inspiration', level: 1, description: 'You can inspire others through stirring words or music. A creature within 60 feet that can hear you gains one Bardic Inspiration die (d6). The creature can roll the die and add the number rolled to one ability check, attack roll, or saving throw it makes.' },
      { id: 'jack-of-all-trades', name: 'Jack of All Trades', level: 2, description: 'You can add half your proficiency bonus, rounded down, to any ability check you make that doesn\'t already include your proficiency bonus.' },
      { id: 'song-of-rest', name: 'Song of Rest', level: 2, description: 'You can use soothing music or oration to help revitalize your wounded allies during a short rest. If you or any friendly creatures who can hear your performance regain hit points at the end of the short rest by spending Hit Dice, each of those creatures regains an extra 1d6 hit points.' },
      { id: 'bard-college', name: 'Bard College', level: 3, description: 'You delve into the advanced techniques of a bard college of your choice.' },
      { id: 'expertise-bard', name: 'Expertise', level: 3, description: 'Choose two of your skill proficiencies. Your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies.' },
    ],
    subclasses: [
      {
        id: 'lore',
        name: 'College of Lore',
        description: 'Bards who pursue knowledge and collect bits of information from diverse sources.',
        features: [
          { id: 'bonus-proficiencies-lore', name: 'Bonus Proficiencies', level: 3, description: 'You gain proficiency with three skills of your choice.' },
          { id: 'cutting-words', name: 'Cutting Words', level: 3, description: 'You learn how to use your wit to distract, confuse, and otherwise sap the confidence and competence of others. When a creature you can see within 60 feet makes an attack roll, ability check, or damage roll, you can use your reaction to expend one Bardic Inspiration die, rolling it and subtracting the result from the creature\'s roll.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Cleric
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'cleric',
    name: 'Cleric',
    description: 'A priestly champion who wields divine magic in service of a higher power.',
    hitDie: 8,
    primaryAbility: ['wis'],
    savingThrows: ['wis', 'cha'],
    armorProficiencies: ['light', 'medium', 'shields'],
    weaponProficiencies: ['simple'],
    toolProficiencies: [],
    skillChoices: ['history', 'insight', 'medicine', 'persuasion', 'religion'],
    numSkillChoices: 2,
    startingEquipment: [
      'mace',
      'scale mail',
      'light crossbow and 20 bolts',
      'priest-pack',
      'shield',
      'holy symbol',
    ],
    subclassLevel: 1,
    subclassName: 'Divine Domain',
    spellcasting: {
      ability: 'wis',
      cantripsKnown: clericCantrips,
      spellsKnown: null,
      preparedCaster: true,
      casterType: 'full',
    },
    features: [
      { id: 'spellcasting-cleric', name: 'Spellcasting', level: 1, description: 'As a conduit for divine power, you can cast cleric spells. Wisdom is your spellcasting ability.' },
      { id: 'divine-domain', name: 'Divine Domain', level: 1, description: 'Choose one domain related to your deity. Your choice grants you domain spells and other features at 1st level and again at 2nd, 6th, 8th, and 17th level.' },
      { id: 'channel-divinity', name: 'Channel Divinity', level: 2, description: 'You gain the ability to channel divine energy directly from your deity, using that energy to fuel magical effects. You start with Turn Undead and an effect determined by your domain.' },
      { id: 'turn-undead', name: 'Channel Divinity: Turn Undead', level: 2, description: 'As an action, you present your holy symbol and speak a prayer censuring the undead. Each undead that can see or hear you within 30 feet must make a Wisdom saving throw. If the creature fails, it is turned for 1 minute or until it takes any damage.' },
    ],
    subclasses: [
      {
        id: 'life',
        name: 'Life Domain',
        description: 'The Life domain focuses on the vibrant positive energy that sustains all life.',
        features: [
          { id: 'bonus-proficiency-life', name: 'Bonus Proficiency', level: 1, description: 'When you choose this domain at 1st level, you gain proficiency with heavy armor.' },
          { id: 'disciple-of-life', name: 'Disciple of Life', level: 1, description: 'Your healing spells are more effective. Whenever you use a spell of 1st level or higher to restore hit points to a creature, the creature regains additional hit points equal to 2 + the spell\'s level.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Druid
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'druid',
    name: 'Druid',
    description: 'A priest of the Old Faith, wielding the powers of nature and adopting animal forms.',
    hitDie: 8,
    primaryAbility: ['wis'],
    savingThrows: ['int', 'wis'],
    armorProficiencies: ['light', 'medium', 'shields'],
    weaponProficiencies: ['club', 'dagger', 'dart', 'javelin', 'mace', 'quarterstaff', 'scimitar', 'sickle', 'sling', 'spear'],
    toolProficiencies: ['herbalism kit'],
    skillChoices: ['arcana', 'animal-handling', 'insight', 'medicine', 'nature', 'perception', 'religion', 'survival'],
    numSkillChoices: 2,
    startingEquipment: [
      'wooden shield',
      'scimitar',
      'leather armor',
      'explorer-pack',
      'druidic focus',
    ],
    subclassLevel: 2,
    subclassName: 'Druid Circle',
    spellcasting: {
      ability: 'wis',
      cantripsKnown: druidCantrips,
      spellsKnown: null,
      preparedCaster: true,
      casterType: 'full',
    },
    features: [
      { id: 'druidic', name: 'Druidic', level: 1, description: 'You know Druidic, the secret language of druids. You can speak the language and use it to leave hidden messages.' },
      { id: 'spellcasting-druid', name: 'Spellcasting', level: 1, description: 'Drawing on the divine essence of nature itself, you can cast spells to shape that essence to your will. Wisdom is your spellcasting ability.' },
      { id: 'wild-shape', name: 'Wild Shape', level: 2, description: 'You can use your action to magically assume the shape of a beast that you have seen before. You can use this feature twice, regaining expended uses after a short or long rest.' },
      { id: 'druid-circle', name: 'Druid Circle', level: 2, description: 'You choose to identify with a circle of druids.' },
    ],
    subclasses: [
      {
        id: 'land',
        name: 'Circle of the Land',
        description: 'Druids who are members of the Circle of the Land are mystics and sages who safeguard ancient knowledge and rites.',
        features: [
          { id: 'bonus-cantrip-land', name: 'Bonus Cantrip', level: 2, description: 'You learn one additional druid cantrip of your choice.' },
          { id: 'natural-recovery', name: 'Natural Recovery', level: 2, description: 'During a short rest, you choose expended spell slots to recover. The spell slots can have a combined level that is equal to or less than half your druid level (rounded up), and none of the slots can be 6th level or higher.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Fighter
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'fighter',
    name: 'Fighter',
    description: 'A master of martial combat, skilled with a variety of weapons and armor.',
    hitDie: 10,
    primaryAbility: ['str', 'dex'],
    savingThrows: ['str', 'con'],
    armorProficiencies: ['light', 'medium', 'heavy', 'shields'],
    weaponProficiencies: ['simple', 'martial'],
    toolProficiencies: [],
    skillChoices: ['acrobatics', 'animal-handling', 'athletics', 'history', 'insight', 'intimidation', 'perception', 'survival'],
    numSkillChoices: 2,
    startingEquipment: [
      'chain mail',
      'martial weapon and shield',
      'light crossbow and 20 bolts',
      'dungeoneer-pack',
    ],
    subclassLevel: 3,
    subclassName: 'Martial Archetype',
    // Spellcasting info for Eldritch Knight subclass; base Fighter has none.
    // We include the EK table here so the UI can reference it when that subclass is chosen.
    spellcasting: {
      ability: 'int',
      cantripsKnown: thirdCasterCantrips,
      spellsKnown: eldritchKnightSpellsKnown,
      preparedCaster: false,
      casterType: 'third',
    },
    features: [
      { id: 'fighting-style-fighter', name: 'Fighting Style', level: 1, description: 'You adopt a particular style of fighting as your specialty. Choose one fighting style option. You cannot take a Fighting Style option more than once, even if you later get to choose again.' },
      { id: 'second-wind', name: 'Second Wind', level: 1, description: 'You have a limited well of stamina that you can draw on to protect yourself from harm. On your turn, you can use a bonus action to regain hit points equal to 1d10 + your fighter level. Once you use this feature, you must finish a short or long rest before you can use it again.' },
      { id: 'action-surge', name: 'Action Surge', level: 2, description: 'You can push yourself beyond your normal limits for a moment. On your turn, you can take one additional action. Once you use this feature, you must finish a short or long rest before you can use it again.' },
      { id: 'martial-archetype', name: 'Martial Archetype', level: 3, description: 'You choose an archetype that you strive to emulate in your combat styles and techniques.' },
    ],
    subclasses: [
      {
        id: 'champion',
        name: 'Champion',
        description: 'The archetypal Champion focuses on the development of raw physical power honed to deadly perfection.',
        features: [
          { id: 'improved-critical', name: 'Improved Critical', level: 3, description: 'Your weapon attacks score a critical hit on a roll of 19 or 20.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Monk
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'monk',
    name: 'Monk',
    description: 'A master of martial arts, harnessing the power of the body in pursuit of physical and spiritual perfection.',
    hitDie: 8,
    primaryAbility: ['dex', 'wis'],
    savingThrows: ['str', 'dex'],
    armorProficiencies: [],
    weaponProficiencies: ['simple', 'shortsword'],
    toolProficiencies: ['one artisan\'s tools or one musical instrument'],
    skillChoices: ['acrobatics', 'athletics', 'history', 'insight', 'religion', 'stealth'],
    numSkillChoices: 2,
    startingEquipment: [
      'shortsword',
      'dungeoneer-pack',
      '10 darts',
    ],
    subclassLevel: 3,
    subclassName: 'Monastic Tradition',
    spellcasting: null,
    features: [
      { id: 'unarmored-defense-monk', name: 'Unarmored Defense', level: 1, description: 'While you are wearing no armor and not wielding a shield, your AC equals 10 + your Dexterity modifier + your Wisdom modifier.' },
      { id: 'martial-arts', name: 'Martial Arts', level: 1, description: 'Your practice of martial arts gives you mastery of combat styles that use unarmed strikes and monk weapons. You gain benefits while unarmed or wielding only monk weapons and not wearing armor or a shield.' },
      { id: 'ki', name: 'Ki', level: 2, description: 'Your training allows you to harness the mystic energy of ki. You have a number of ki points equal to your monk level. You can spend these points to fuel ki features: Flurry of Blows, Patient Defense, and Step of the Wind.' },
      { id: 'unarmored-movement', name: 'Unarmored Movement', level: 2, description: 'Your speed increases by 10 feet while you are not wearing armor or wielding a shield. This bonus increases as you gain monk levels.' },
      { id: 'monastic-tradition', name: 'Monastic Tradition', level: 3, description: 'You commit yourself to a monastic tradition.' },
      { id: 'deflect-missiles', name: 'Deflect Missiles', level: 3, description: 'You can use your reaction to deflect or catch the missile when you are hit by a ranged weapon attack. The damage is reduced by 1d10 + your Dexterity modifier + your monk level.' },
    ],
    subclasses: [
      {
        id: 'open-hand',
        name: 'Way of the Open Hand',
        description: 'Monks who follow the Way of the Open Hand are the ultimate masters of martial arts combat.',
        features: [
          { id: 'open-hand-technique', name: 'Open Hand Technique', level: 3, description: 'Whenever you hit a creature with one of the attacks granted by your Flurry of Blows, you can impose one of several effects: the target must succeed on a DEX save or be knocked prone, make a STR save or be pushed up to 15 feet, or it cannot take reactions until the end of your next turn.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Paladin
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'paladin',
    name: 'Paladin',
    description: 'A holy warrior bound to a sacred oath.',
    hitDie: 10,
    primaryAbility: ['str', 'cha'],
    savingThrows: ['wis', 'cha'],
    armorProficiencies: ['light', 'medium', 'heavy', 'shields'],
    weaponProficiencies: ['simple', 'martial'],
    toolProficiencies: [],
    skillChoices: ['athletics', 'insight', 'intimidation', 'medicine', 'persuasion', 'religion'],
    numSkillChoices: 2,
    startingEquipment: [
      'martial weapon and shield',
      'five javelins',
      'priest-pack',
      'chain mail',
      'holy symbol',
    ],
    subclassLevel: 3,
    subclassName: 'Sacred Oath',
    spellcasting: {
      ability: 'cha',
      cantripsKnown: noCantrips,
      spellsKnown: null,
      preparedCaster: true,
      casterType: 'half',
    },
    features: [
      { id: 'divine-sense', name: 'Divine Sense', level: 1, description: 'The presence of strong evil registers on your senses like a noxious odor. As an action, you can open your awareness to detect such forces. You know the location of any celestial, fiend, or undead within 60 feet that is not behind total cover.' },
      { id: 'lay-on-hands', name: 'Lay on Hands', level: 1, description: 'Your blessed touch can heal wounds. You have a pool of healing power that replenishes when you take a long rest. With that pool, you can restore a total number of hit points equal to your paladin level x 5.' },
      { id: 'fighting-style-paladin', name: 'Fighting Style', level: 2, description: 'You adopt a particular style of fighting as your specialty.' },
      { id: 'spellcasting-paladin', name: 'Spellcasting', level: 2, description: 'You have learned to draw on divine magic through meditation and prayer to cast spells. Charisma is your spellcasting ability.' },
      { id: 'divine-smite', name: 'Divine Smite', level: 2, description: 'When you hit a creature with a melee weapon attack, you can expend one spell slot to deal radiant damage to the target, in addition to the weapon\'s damage. The extra damage is 2d8 for a 1st-level spell slot, plus 1d8 for each spell level higher than 1st, to a maximum of 5d8.' },
      { id: 'divine-health', name: 'Divine Health', level: 3, description: 'The divine magic flowing through you makes you immune to disease.' },
      { id: 'sacred-oath', name: 'Sacred Oath', level: 3, description: 'You swear the oath that binds you as a paladin forever. Your oath grants you oath spells and the Channel Divinity feature.' },
    ],
    subclasses: [
      {
        id: 'devotion',
        name: 'Oath of Devotion',
        description: 'Paladins who swear the Oath of Devotion hold themselves to the highest standards of conduct.',
        features: [
          { id: 'sacred-weapon', name: 'Channel Divinity: Sacred Weapon', level: 3, description: 'As an action, you can imbue one weapon you are holding with positive energy. For 1 minute, you add your Charisma modifier to attack rolls made with that weapon (minimum bonus of +1). The weapon also emits bright light in a 20-foot radius.' },
          { id: 'turn-the-unholy', name: 'Channel Divinity: Turn the Unholy', level: 3, description: 'As an action, each fiend or undead that can see or hear you within 30 feet must make a Wisdom saving throw. If the creature fails, it is turned for 1 minute or until it takes damage.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Ranger
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'ranger',
    name: 'Ranger',
    description: 'A warrior who combats threats on the edges of civilization.',
    hitDie: 10,
    primaryAbility: ['dex', 'wis'],
    savingThrows: ['str', 'dex'],
    armorProficiencies: ['light', 'medium', 'shields'],
    weaponProficiencies: ['simple', 'martial'],
    toolProficiencies: [],
    skillChoices: ['animal-handling', 'athletics', 'insight', 'investigation', 'nature', 'perception', 'stealth', 'survival'],
    numSkillChoices: 3,
    startingEquipment: [
      'scale mail',
      'two shortswords',
      'dungeoneer-pack',
      'longbow and quiver of 20 arrows',
    ],
    subclassLevel: 3,
    subclassName: 'Ranger Archetype',
    spellcasting: {
      ability: 'wis',
      cantripsKnown: noCantrips,
      spellsKnown: rangerSpellsKnown,
      preparedCaster: false,
      casterType: 'half',
    },
    features: [
      { id: 'favored-enemy', name: 'Favored Enemy', level: 1, description: 'You have significant experience studying, tracking, hunting, and even talking to a certain type of enemy. Choose a type of favored enemy. You have advantage on Wisdom (Survival) checks to track and on Intelligence checks to recall information about them.' },
      { id: 'natural-explorer', name: 'Natural Explorer', level: 1, description: 'You are particularly familiar with one type of natural environment and are adept at traveling and surviving in such regions.' },
      { id: 'fighting-style-ranger', name: 'Fighting Style', level: 2, description: 'You adopt a particular style of fighting as your specialty.' },
      { id: 'spellcasting-ranger', name: 'Spellcasting', level: 2, description: 'You have learned to use the magical essence of nature to cast spells, much as a druid does. Wisdom is your spellcasting ability.' },
      { id: 'ranger-archetype', name: 'Ranger Archetype', level: 3, description: 'You choose an archetype that you strive to emulate.' },
      { id: 'primeval-awareness', name: 'Primeval Awareness', level: 3, description: 'You can use your action and expend one ranger spell slot to focus your awareness on the region around you. For 1 minute per level of the spell slot you expend, you can sense whether certain creature types are present within 1 mile (or 6 miles in your favored terrain).' },
    ],
    subclasses: [
      {
        id: 'hunter',
        name: 'Hunter',
        description: 'Emulating the Hunter archetype means accepting your place as a bulwark between civilization and the terrors of the wilderness.',
        features: [
          { id: 'hunters-prey', name: 'Hunter\'s Prey', level: 3, description: 'You gain one of the following features of your choice: Colossus Slayer (extra 1d8 damage once per turn to injured targets), Giant Killer (reaction attack when Large or larger creature misses you), or Horde Breaker (additional attack against a second creature near your first target).' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Rogue
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'rogue',
    name: 'Rogue',
    description: 'A scoundrel who uses stealth and trickery to overcome obstacles and enemies.',
    hitDie: 8,
    primaryAbility: ['dex'],
    savingThrows: ['dex', 'int'],
    armorProficiencies: ['light'],
    weaponProficiencies: ['simple', 'hand crossbow', 'longsword', 'rapier', 'shortsword'],
    toolProficiencies: ['thieves\' tools'],
    skillChoices: ['acrobatics', 'athletics', 'deception', 'insight', 'intimidation', 'investigation', 'perception', 'performance', 'persuasion', 'sleight-of-hand', 'stealth'],
    numSkillChoices: 4,
    startingEquipment: [
      'rapier',
      'shortbow and quiver of 20 arrows',
      'burglar-pack',
      'leather armor',
      'two daggers',
      'thieves\' tools',
    ],
    subclassLevel: 3,
    subclassName: 'Roguish Archetype',
    // Spellcasting info for Arcane Trickster subclass
    spellcasting: {
      ability: 'int',
      cantripsKnown: thirdCasterCantrips,
      spellsKnown: arcaneTricksterSpellsKnown,
      preparedCaster: false,
      casterType: 'third',
    },
    features: [
      { id: 'expertise-rogue', name: 'Expertise', level: 1, description: 'Choose two of your skill proficiencies, or one of your skill proficiencies and your proficiency with thieves\' tools. Your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies.' },
      { id: 'sneak-attack', name: 'Sneak Attack', level: 1, description: 'You know how to strike subtly and exploit a foe\'s distraction. Once per turn, you can deal an extra 1d6 damage to one creature you hit with an attack if you have advantage on the attack roll. The attack must use a finesse or a ranged weapon.' },
      { id: 'thieves-cant', name: 'Thieves\' Cant', level: 1, description: 'During your rogue training you learned thieves\' cant, a secret mix of dialect, jargon, and code that allows you to hide messages in seemingly normal conversation.' },
      { id: 'cunning-action', name: 'Cunning Action', level: 2, description: 'Your quick thinking and agility allow you to move and act quickly. You can take a bonus action on each of your turns in combat to take the Dash, Disengage, or Hide action.' },
      { id: 'roguish-archetype', name: 'Roguish Archetype', level: 3, description: 'You choose an archetype that you emulate in the exercise of your rogue abilities.' },
    ],
    subclasses: [
      {
        id: 'thief',
        name: 'Thief',
        description: 'You hone your skills in the larcenous arts.',
        features: [
          { id: 'fast-hands', name: 'Fast Hands', level: 3, description: 'You can use the bonus action granted by your Cunning Action to make a Dexterity (Sleight of Hand) check, use your thieves\' tools to disarm a trap or open a lock, or take the Use an Object action.' },
          { id: 'second-story-work', name: 'Second-Story Work', level: 3, description: 'You gain the ability to climb faster than normal; climbing no longer costs you extra movement. In addition, when you make a running jump, the distance you cover increases by a number of feet equal to your Dexterity modifier.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Sorcerer
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'sorcerer',
    name: 'Sorcerer',
    description: 'A spellcaster who draws on inherent magic from a gift or bloodline.',
    hitDie: 6,
    primaryAbility: ['cha'],
    savingThrows: ['con', 'cha'],
    armorProficiencies: [],
    weaponProficiencies: ['dagger', 'dart', 'sling', 'quarterstaff', 'light crossbow'],
    toolProficiencies: [],
    skillChoices: ['arcana', 'deception', 'insight', 'intimidation', 'persuasion', 'religion'],
    numSkillChoices: 2,
    startingEquipment: [
      'light crossbow and 20 bolts',
      'component pouch',
      'dungeoneer-pack',
      'two daggers',
    ],
    subclassLevel: 1,
    subclassName: 'Sorcerous Origin',
    spellcasting: {
      ability: 'cha',
      cantripsKnown: sorcererCantrips,
      spellsKnown: sorcererSpellsKnown,
      preparedCaster: false,
      casterType: 'full',
    },
    features: [
      { id: 'spellcasting-sorcerer', name: 'Spellcasting', level: 1, description: 'An event in your past, or in the life of a parent or ancestor, left an indelible mark on you, infusing you with arcane magic. Charisma is your spellcasting ability.' },
      { id: 'sorcerous-origin', name: 'Sorcerous Origin', level: 1, description: 'Choose a sorcerous origin, which describes the source of your innate magical power.' },
      { id: 'font-of-magic', name: 'Font of Magic', level: 2, description: 'You tap into a deep wellspring of magic within yourself. This wellspring is represented by sorcery points, which allow you to create a variety of magical effects. You have 2 sorcery points at level 2, and gain 1 more per sorcerer level.' },
      { id: 'metamagic', name: 'Metamagic', level: 3, description: 'You gain the ability to twist your spells to suit your needs. You gain two Metamagic options of your choice. You gain another one at 10th and 17th level.' },
    ],
    subclasses: [
      {
        id: 'draconic',
        name: 'Draconic Bloodline',
        description: 'Your innate magic comes from draconic magic that was mingled with your blood or that of your ancestors.',
        features: [
          { id: 'dragon-ancestor', name: 'Dragon Ancestor', level: 1, description: 'You choose one type of dragon as your ancestor. The damage type associated with your draconic ancestry is used by features you gain later. You can speak, read, and write Draconic, and your proficiency bonus is doubled for Charisma checks when interacting with dragons.' },
          { id: 'draconic-resilience', name: 'Draconic Resilience', level: 1, description: 'As magic flows through your body, it causes physical traits of your dragon ancestors to emerge. Your hit point maximum increases by 1 for each sorcerer level. Additionally, when you aren\'t wearing armor, your AC equals 13 + your Dexterity modifier.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Warlock
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'warlock',
    name: 'Warlock',
    description: 'A wielder of magic that is derived from a bargain with an extraplanar entity.',
    hitDie: 8,
    primaryAbility: ['cha'],
    savingThrows: ['wis', 'cha'],
    armorProficiencies: ['light'],
    weaponProficiencies: ['simple'],
    toolProficiencies: [],
    skillChoices: ['arcana', 'deception', 'history', 'intimidation', 'investigation', 'nature', 'religion'],
    numSkillChoices: 2,
    startingEquipment: [
      'light crossbow and 20 bolts',
      'component pouch',
      'scholar-pack',
      'leather armor',
      'simple weapon',
      'two daggers',
    ],
    subclassLevel: 1,
    subclassName: 'Otherworldly Patron',
    spellcasting: {
      ability: 'cha',
      cantripsKnown: warlockCantrips,
      spellsKnown: warlockSpellsKnown,
      preparedCaster: false,
      casterType: 'pact',
    },
    features: [
      { id: 'otherworldly-patron', name: 'Otherworldly Patron', level: 1, description: 'You have struck a bargain with an otherworldly being of your choice. Your choice grants you features at 1st level and again at 6th, 10th, and 14th level.' },
      { id: 'pact-magic', name: 'Pact Magic', level: 1, description: 'Your arcane research and the magic bestowed on you by your patron have given you facility with spells. You know two cantrips and a number of warlock spells. Your spell slots recover on a short rest, and all slots are the same level.' },
      { id: 'eldritch-invocations', name: 'Eldritch Invocations', level: 2, description: 'In your study of occult lore, you have unearthed eldritch invocations, fragments of forbidden knowledge that imbue you with an abiding magical ability. You gain two invocations of your choice.' },
      { id: 'pact-boon', name: 'Pact Boon', level: 3, description: 'Your otherworldly patron bestows a gift upon you for your loyal service. You gain one of the following features: Pact of the Chain, Pact of the Blade, or Pact of the Tome.' },
    ],
    subclasses: [
      {
        id: 'fiend',
        name: 'The Fiend',
        description: 'You have made a pact with a fiend from the lower planes of existence.',
        features: [
          { id: 'dark-ones-blessing', name: 'Dark One\'s Blessing', level: 1, description: 'When you reduce a hostile creature to 0 hit points, you gain temporary hit points equal to your Charisma modifier + your warlock level (minimum of 1).' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Wizard
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'wizard',
    name: 'Wizard',
    description: 'A scholarly magic-user capable of manipulating the structures of reality.',
    hitDie: 6,
    primaryAbility: ['int'],
    savingThrows: ['int', 'wis'],
    armorProficiencies: [],
    weaponProficiencies: ['dagger', 'dart', 'sling', 'quarterstaff', 'light crossbow'],
    toolProficiencies: [],
    skillChoices: ['arcana', 'history', 'insight', 'investigation', 'medicine', 'religion'],
    numSkillChoices: 2,
    startingEquipment: [
      'quarterstaff',
      'component pouch',
      'scholar-pack',
      'spellbook',
    ],
    subclassLevel: 2,
    subclassName: 'Arcane Tradition',
    spellcasting: {
      ability: 'int',
      cantripsKnown: wizardCantrips,
      spellsKnown: null,
      preparedCaster: true,
      casterType: 'full',
    },
    features: [
      { id: 'spellcasting-wizard', name: 'Spellcasting', level: 1, description: 'As a student of arcane magic, you have a spellbook containing spells that show the first glimmerings of your true power. Intelligence is your spellcasting ability.' },
      { id: 'arcane-recovery', name: 'Arcane Recovery', level: 1, description: 'You have learned to regain some of your magical energy by studying your spellbook. Once per day when you finish a short rest, you can choose expended spell slots to recover. The spell slots can have a combined level that is equal to or less than half your wizard level (rounded up), and none of the slots can be 6th level or higher.' },
      { id: 'arcane-tradition', name: 'Arcane Tradition', level: 2, description: 'You choose an arcane tradition, shaping your practice of magic through one of the eight schools of magic.' },
    ],
    subclasses: [
      {
        id: 'evocation',
        name: 'School of Evocation',
        description: 'You focus your study on magic that creates powerful elemental effects.',
        features: [
          { id: 'evocation-savant', name: 'Evocation Savant', level: 2, description: 'The gold and time you must spend to copy an evocation spell into your spellbook is halved.' },
          { id: 'sculpt-spells', name: 'Sculpt Spells', level: 2, description: 'You can create pockets of relative safety within the effects of your evocation spells. When you cast an evocation spell that affects other creatures you can see, you can choose a number of them equal to 1 + the spell\'s level. The chosen creatures automatically succeed on their saving throws against the spell, and they take no damage if they would normally take half damage on a successful save.' },
        ],
      },
    ],
  },
]

export function getClassById(id: string): CharacterClass | undefined {
  return classes.find(c => c.id === id)
}

export function getSubclassById(classId: string, subclassId: string): Subclass | undefined {
  const cls = getClassById(classId)
  return cls?.subclasses.find(s => s.id === subclassId)
}

export function getFeaturesForLevel(classId: string, level: number): ClassFeature[] {
  const cls = getClassById(classId)
  if (!cls) return []
  return cls.features.filter(f => f.level <= level)
}
