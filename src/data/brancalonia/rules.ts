// ─────────────────────────────────────────────────────────────────────────────
// Brancalonia-specific rules and constants
// ─────────────────────────────────────────────────────────────────────────────

/** Maximum character level in Brancalonia. After level 6, characters gain feats instead of leveling up. */
export const MAX_LEVEL = 6

// ─── Currency ───────────────────────────────────────────────────────────────

/** Brancalonia uses a silver standard: the base currency is silver, not gold. */
export const CURRENCY_STANDARD = 'silver' as const

export interface CurrencyConversion {
  name: string
  abbreviation: string
  /** Value in silver pieces */
  valueInSilver: number
}

export const currencies: readonly CurrencyConversion[] = [
  { name: 'Copper Piece', abbreviation: 'cp', valueInSilver: 0.1 },
  { name: 'Silver Piece', abbreviation: 'sp', valueInSilver: 1 },
  { name: 'Gold Piece', abbreviation: 'gp', valueInSilver: 10 },
  { name: 'Platinum Piece', abbreviation: 'pp', valueInSilver: 100 },
] as const

// ─── Shoddy Equipment ──────────────────────────────────────────────────────

export type EquipmentCondition = 'fine' | 'shoddy' | 'broken'

export interface ShoddyEquipmentRule {
  condition: EquipmentCondition
  description: string
  mechanicalEffect: string
}

export const shoddyEquipmentRules: readonly ShoddyEquipmentRule[] = [
  {
    condition: 'fine',
    description: 'The equipment is in good working order.',
    mechanicalEffect: 'No penalties. Equipment functions as described in its stat block.',
  },
  {
    condition: 'shoddy',
    description: 'The equipment is worn, patched, rusted, or otherwise degraded. Most starting equipment in Brancalonia is shoddy.',
    mechanicalEffect: 'Shoddy weapons deal -1 damage (minimum 1). Shoddy armor grants -1 AC. On a natural 1 attack roll with a shoddy weapon, it breaks. On a natural 20 attack against someone wearing shoddy armor, it breaks.',
  },
  {
    condition: 'broken',
    description: 'The equipment is no longer functional and must be repaired or replaced.',
    mechanicalEffect: 'Broken weapons cannot be used to attack. Broken armor provides no AC bonus. Repairs cost half the item\'s base price.',
  },
] as const

// ─── Brawling System ────────────────────────────────────────────────────────

export interface WhacksLevel {
  level: number
  name: string
  description: string
  mechanicalEffect: string
}

/**
 * The Whacks system tracks non-lethal brawling damage.
 * Characters accumulate Whacks levels as they take brawling damage.
 */
export const whacksLevels: readonly WhacksLevel[] = [
  {
    level: 0,
    name: 'Unharmed',
    description: 'No brawling damage sustained.',
    mechanicalEffect: 'No penalties.',
  },
  {
    level: 1,
    name: 'Bruised',
    description: 'You have taken a few hits and are starting to feel it.',
    mechanicalEffect: 'No mechanical penalty yet, but you look roughed up.',
  },
  {
    level: 2,
    name: 'Battered',
    description: 'You are visibly hurt, with bruises and minor cuts.',
    mechanicalEffect: 'Disadvantage on Charisma (Persuasion) checks.',
  },
  {
    level: 3,
    name: 'Beaten',
    description: 'You are in bad shape, struggling to stay on your feet.',
    mechanicalEffect: 'Disadvantage on all ability checks.',
  },
  {
    level: 4,
    name: 'Bashed',
    description: 'You are severely injured from the brawl.',
    mechanicalEffect: 'Disadvantage on all ability checks and attack rolls.',
  },
  {
    level: 5,
    name: 'Broken',
    description: 'You can barely stand, one more hit and you are done.',
    mechanicalEffect: 'Disadvantage on all ability checks, attack rolls, and saving throws. Speed halved.',
  },
  {
    level: 6,
    name: 'Unconscious',
    description: 'You have been knocked out cold.',
    mechanicalEffect: 'You fall unconscious for 1d4 hours. When you wake, you have 1 hit point and one level of exhaustion.',
  },
] as const

// ─── Modified Rests ─────────────────────────────────────────────────────────

export interface RestRule {
  type: 'short' | 'long'
  name: string
  duration: string
  description: string
}

export const restRules: readonly RestRule[] = [
  {
    type: 'short',
    name: 'Short Rest',
    duration: '1 night (8 hours)',
    description: 'In Brancalonia, a short rest requires a full night of sleep in a reasonably safe location. Characters can spend Hit Dice to recover hit points and regain short-rest features as normal.',
  },
  {
    type: 'long',
    name: 'Long Rest (Rollicking)',
    duration: '1 week of rollicking',
    description: 'A long rest in Brancalonia requires a full week of rollicking -- carousing, feasting, gambling, and general debauchery in a settlement. During this time, characters spend coin on food, drink, and entertainment. At the end of the week, they regain all hit points, spent Hit Dice, and long-rest features. The cost of rollicking is 10 sp per character level.',
  },
] as const

// ─── Languages ──────────────────────────────────────────────────────────────

export interface BrancaloniaLanguage {
  id: string
  name: string
  description: string
  speakers: string
}

export const languages: readonly BrancaloniaLanguage[] = [
  {
    id: 'vernacular',
    name: 'Vernacular',
    description: 'The common tongue spoken across the Boot. Every person in Brancalonia speaks Vernacular, though regional dialects can make communication amusing.',
    speakers: 'All peoples of Brancalonia',
  },
  {
    id: 'draconian',
    name: 'Draconian',
    description: 'The ancient language of the dragons and the old empire. Used in legal documents, academic texts, and by those who wish to appear learned.',
    speakers: 'Scholars, bureaucrats, dragons',
  },
  {
    id: 'macaronic',
    name: 'Macaronic',
    description: 'A pidgin language mixing Vernacular with Draconian, used by semi-literate scholars, traveling merchants, and charlatans who want to sound impressive.',
    speakers: 'Merchants, charlatans, half-educated folk',
  },
  {
    id: 'bedamn',
    name: 'Bedamn',
    description: 'The language of the infernal realms, spoken by devils, Malebranches, and those who traffic with the powers below. It is harsh, guttural, and unpleasant to hear.',
    speakers: 'Malebranches, devils, diabolists',
  },
  {
    id: 'lingua-ignota',
    name: 'Lingua Ignota',
    description: 'The secret language of nature, spoken by Sylvans, druids, and the creatures of the wild. It has no written form and cannot be learned from books.',
    speakers: 'Sylvans, druids, fey creatures',
  },
  {
    id: 'petroglyphic',
    name: 'Petroglyphic',
    description: 'An ancient pictographic language found carved in cave walls, standing stones, and ruins throughout the Boot. Only scholars and certain druids can read it.',
    speakers: 'Ancient peoples (extinct), scholars',
  },
  {
    id: 'racket',
    name: 'Racket',
    description: 'A secret thieves\' argot used by the criminal underworld of Brancalonia. Similar in concept to Thieves\' Cant but unique to the Boot. Messages can be hidden in graffiti, hand gestures, and seemingly innocent conversation.',
    speakers: 'Criminals, brigands, rogues',
  },
] as const

// ─── Post-Level-6 Advancement ───────────────────────────────────────────────

export interface PostLevelAdvancement {
  description: string
  options: string[]
}

export const postLevelAdvancement: PostLevelAdvancement = {
  description:
    'After reaching level 6, characters no longer gain class levels. Instead, each time they would level up, they gain a feat or ability score improvement. This represents the idea that in Brancalonia, true heroes are rare and power is capped at a more grounded level.',
  options: [
    'Gain one feat of your choice',
    'Increase one ability score by 2 (maximum 20)',
    'Increase two ability scores by 1 each (maximum 20)',
  ],
}

// ─── Consolidated Rules Reference ───────────────────────────────────────────

export interface BrancaloniaRules {
  maxLevel: number
  currencyStandard: typeof CURRENCY_STANDARD
  currencies: readonly CurrencyConversion[]
  shoddyEquipment: readonly ShoddyEquipmentRule[]
  whacksLevels: readonly WhacksLevel[]
  restRules: readonly RestRule[]
  languages: readonly BrancaloniaLanguage[]
  postLevelAdvancement: PostLevelAdvancement
}

export const brancaloniaRules: BrancaloniaRules = {
  maxLevel: MAX_LEVEL,
  currencyStandard: CURRENCY_STANDARD,
  currencies,
  shoddyEquipment: shoddyEquipmentRules,
  whacksLevels,
  restRules,
  languages,
  postLevelAdvancement,
}
