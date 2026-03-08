/**
 * Apocalisse-specific rules and systems.
 */

export interface ApocalisseVirtue {
  id: string
  name: string
  nameOriginal: string
  description: string
  saveAdvantages: string[]
  damageResistance: string
}

export interface ApocalisseSin {
  id: string
  name: string
  nameOriginal: string
  description: string
  benefit: string
}

export interface MarkSpirit {
  id: string
  name: string
  nameOriginal: string
  description: string
}

export interface ApocalisseMark {
  id: string
  name: string
  nameOriginal: string
  description: string
  spirits: MarkSpirit[]
}

export interface ApocalisseLanguage {
  name: string
  nameOriginal: string
  description: string
}

export interface ApocalisseRules {
  maxLevel: number
  humanityStarting: number
  humanityMin: number
  markDiceProgression: { levelRange: [number, number]; die: string }[]
  virtues: ApocalisseVirtue[]
  sins: ApocalisseSin[]
  marks: ApocalisseMark[]
  languages: ApocalisseLanguage[]
}

export const MAX_LEVEL = 20

/**
 * Mark Dice progression: number of dice = proficiency bonus,
 * die size scales with level.
 */
const markDiceProgression = [
  { levelRange: [1, 2] as [number, number], die: 'd4' },
  { levelRange: [3, 5] as [number, number], die: 'd6' },
  { levelRange: [6, 9] as [number, number], die: 'd8' },
  { levelRange: [10, 14] as [number, number], die: 'd10' },
  { levelRange: [15, 20] as [number, number], die: 'd12' },
]

const virtues: ApocalisseVirtue[] = [
  {
    id: 'fortitude',
    name: 'Fortitude',
    nameOriginal: 'Fortezza',
    description: 'The virtue of inner strength and endurance, granting resilience against overwhelming force.',
    saveAdvantages: ['str', 'con'],
    damageResistance: 'force',
  },
  {
    id: 'prudence',
    name: 'Prudence',
    nameOriginal: 'Prudenza',
    description: 'The virtue of wisdom and careful thought, protecting the mind from assault.',
    saveAdvantages: ['int', 'wis'],
    damageResistance: 'psychic',
  },
  {
    id: 'temperance',
    name: 'Temperance',
    nameOriginal: 'Temperanza',
    description: 'The virtue of moderation and self-control, bringing calm amidst chaos.',
    saveAdvantages: ['dex', 'cha'],
    damageResistance: 'thunder',
  },
  {
    id: 'justice',
    name: 'Justice',
    nameOriginal: 'Giustizia',
    description: 'The virtue of righteousness and fairness, channeling divine judgment.',
    saveAdvantages: ['str', 'wis'],
    damageResistance: 'lightning',
  },
  {
    id: 'faith',
    name: 'Faith',
    nameOriginal: 'Fede',
    description: 'The virtue of unwavering belief, shielding against magical forces.',
    saveAdvantages: [],
    damageResistance: 'fire',
  },
  {
    id: 'hope',
    name: 'Hope',
    nameOriginal: 'Speranza',
    description: 'The virtue of eternal optimism, warming the soul against the cold of despair.',
    saveAdvantages: ['con', 'int'],
    damageResistance: 'cold',
  },
  {
    id: 'charity',
    name: 'Charity',
    nameOriginal: 'Carita\'',
    description: 'The virtue of selfless love, protecting against corrosive influences.',
    saveAdvantages: ['dex', 'cha'],
    damageResistance: 'acid',
  },
]

const sins: ApocalisseSin[] = [
  {
    id: 'pride',
    name: 'Pride',
    nameOriginal: 'Superbia',
    description: 'The sin of excessive self-regard, granting immunity to manipulation.',
    benefit: 'Advantage on saves against being charmed',
  },
  {
    id: 'greed',
    name: 'Greed',
    nameOriginal: 'Avarizia',
    description: 'The sin of avarice, granting exceptional carrying capacity.',
    benefit: 'Increased carrying capacity and proficiency bonus to related checks',
  },
  {
    id: 'lust',
    name: 'Lust',
    nameOriginal: 'Lussuria',
    description: 'The sin of desire, granting physical liberation.',
    benefit: 'Advantage on saves against being grappled; can complete a long rest in 6 hours',
  },
  {
    id: 'envy',
    name: 'Envy',
    nameOriginal: 'Invidia',
    description: 'The sin of jealousy, sharpening the senses against deprivation.',
    benefit: 'Advantage on saves against being blinded or deafened',
  },
  {
    id: 'gluttony',
    name: 'Gluttony',
    nameOriginal: 'Gola',
    description: 'The sin of excess consumption, granting resilience of body.',
    benefit: 'Advantage on saves against being poisoned and exhaustion',
  },
  {
    id: 'sloth',
    name: 'Sloth',
    nameOriginal: 'Accidia',
    description: 'The sin of laziness, granting resistance to incapacitation.',
    benefit: 'Advantage on saves against being stunned; need only half the normal food and water',
  },
  {
    id: 'wrath',
    name: 'Wrath',
    nameOriginal: 'Ira',
    description: 'The sin of fury, channeling rage into relentless action.',
    benefit: 'Advantage on saves against being paralyzed and frightened; can Dash as a bonus action',
  },
]

const marks: ApocalisseMark[] = [
  {
    id: 'mark-of-the-lord',
    name: 'Mark of the Lord',
    nameOriginal: 'Marchio del Signore',
    description:
      'The Mark of the Penitent, granted by the forces of the Throne. Those who bear it channel divine power through seven angelic spirits.',
    spirits: [
      { id: 'militancy', name: 'Spirit of Militancy', nameOriginal: 'Spirito di Militanza', description: 'Grants martial prowess and zeal in combat for the Lord\'s cause.' },
      { id: 'expertise', name: 'Spirit of Expertise', nameOriginal: 'Spirito di Perizia', description: 'Grants exceptional skill and precision in all endeavors.' },
      { id: 'triumph', name: 'Spirit of Triumph', nameOriginal: 'Spirito di Trionfo', description: 'Grants the power to overcome impossible odds and claim victory.' },
      { id: 'righteousness', name: 'Spirit of Righteousness', nameOriginal: 'Spirito di Rettitudine', description: 'Grants moral clarity and the power to smite the wicked.' },
      { id: 'firmness', name: 'Spirit of Firmness', nameOriginal: 'Spirito di Fermezza', description: 'Grants unshakable resolve and resistance to corruption.' },
      { id: 'lore', name: 'Spirit of Lore', nameOriginal: 'Spirito di Sapienza', description: 'Grants ancient knowledge and understanding of sacred texts.' },
      { id: 'bravery', name: 'Spirit of Bravery', nameOriginal: 'Spirito di Coraggio', description: 'Grants fearlessness and inspires courage in allies.' },
    ],
  },
  {
    id: 'mark-of-the-beast',
    name: 'Mark of the Beast',
    nameOriginal: 'Marchio della Bestia',
    description:
      'The Mark of the Corrupted, granted by the forces of the Abyss. Those who bear it channel infernal power through seven demonic spirits.',
    spirits: [
      { id: 'savagery', name: 'Spirit of Savagery', nameOriginal: 'Spirito di Ferocia', description: 'Grants brutal strength and primal fury in battle.' },
      { id: 'deception', name: 'Spirit of Deception', nameOriginal: 'Spirito di Inganno', description: 'Grants mastery of lies and the power to mislead.' },
      { id: 'turmoil', name: 'Spirit of Turmoil', nameOriginal: 'Spirito di Tumulto', description: 'Grants the power to spread chaos and disorder.' },
      { id: 'stubbornness', name: 'Spirit of Stubbornness', nameOriginal: 'Spirito di Caparbietà', description: 'Grants relentless determination that borders on madness.' },
      { id: 'frenzy', name: 'Spirit of Frenzy', nameOriginal: 'Spirito di Frenesia', description: 'Grants uncontrollable speed and ferocity.' },
      { id: 'falsehood', name: 'Spirit of Falsehood', nameOriginal: 'Spirito di Menzogna', description: 'Grants the power to twist truth and corrupt minds.' },
      { id: 'desolation', name: 'Spirit of Desolation', nameOriginal: 'Spirito di Desolazione', description: 'Grants the power to bring ruin and despair to all around.' },
    ],
  },
]

const languages: ApocalisseLanguage[] = [
  { name: 'Babel Tongue', nameOriginal: 'Lingua di Babele', description: 'The common tongue spoken across the Plain of Armageddon, a chaotic mix of old languages.' },
  { name: 'Old World Tongue', nameOriginal: 'Lingua del Vecchio Mondo', description: 'The refined language of the civilization before the Apocalypse.' },
  { name: 'Enochian', nameOriginal: 'Enochiano', description: 'The language of angels, spoken by those who serve the Throne.' },
  { name: 'Thronian', nameOriginal: 'Troniano', description: 'The liturgical language of the Lord\'s servants and holy texts.' },
  { name: 'Abyssal', nameOriginal: 'Abissale', description: 'The language of demons and the creatures of the Abyss.' },
  { name: 'Infernal', nameOriginal: 'Infernale', description: 'The language of Hell and its denizens.' },
  { name: 'Primal Tongue', nameOriginal: 'Lingua Primigenia', description: 'The ancient tongue of nature spirits and primal beasts.' },
  { name: 'Celestial', nameOriginal: 'Celestiale', description: 'The language of the heavens, used by celestial beings.' },
]

export const apocalisseRules: ApocalisseRules = {
  maxLevel: MAX_LEVEL,
  humanityStarting: 10,
  humanityMin: 0,
  markDiceProgression,
  virtues,
  sins,
  marks,
  languages,
}
