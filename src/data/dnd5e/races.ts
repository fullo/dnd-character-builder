import type { AbilityScores } from '@/stores/character'

export type Size = 'Small' | 'Medium'

export interface Subrace {
  id: string
  name: string
  abilityBonuses: Partial<AbilityScores>
  traits: string[]
}

export interface Race {
  id: string
  name: string
  /** Original name in the setting's language (e.g. Italian for Brancalonia) */
  nameOriginal?: string
  description?: string
  abilityBonuses: Partial<AbilityScores>
  /** If set, the player chooses `count` abilities to each receive +`amount` */
  abilityScoreChoice?: {
    count: number
    amount: number
  }
  speed: number
  size: Size
  traits: string[]
  languages: string[]
  subraces: Subrace[]
}

export const races: readonly Race[] = [
  // ─── Dragonborn ───────────────────────────────────────────────────
  {
    id: 'dragonborn',
    name: 'Dragonborn',
    abilityBonuses: { str: 2, cha: 1 },
    speed: 30,
    size: 'Medium',
    traits: [
      'draconic-ancestry',
      'breath-weapon',
      'damage-resistance',
    ],
    languages: ['Common', 'Draconic'],
    subraces: [],
  },

  // ─── Dwarf ────────────────────────────────────────────────────────
  {
    id: 'dwarf',
    name: 'Dwarf',
    abilityBonuses: { con: 2 },
    speed: 25,
    size: 'Medium',
    traits: [
      'darkvision',
      'dwarven-resilience',
      'dwarven-combat-training',
      'tool-proficiency',
      'stonecunning',
    ],
    languages: ['Common', 'Dwarvish'],
    subraces: [
      {
        id: 'hill-dwarf',
        name: 'Hill Dwarf',
        abilityBonuses: { wis: 1 },
        traits: ['dwarven-toughness'],
      },
    ],
  },

  // ─── Elf ──────────────────────────────────────────────────────────
  {
    id: 'elf',
    name: 'Elf',
    abilityBonuses: { dex: 2 },
    speed: 30,
    size: 'Medium',
    traits: [
      'darkvision',
      'keen-senses',
      'fey-ancestry',
      'trance',
    ],
    languages: ['Common', 'Elvish'],
    subraces: [
      {
        id: 'high-elf',
        name: 'High Elf',
        abilityBonuses: { int: 1 },
        traits: [
          'elf-weapon-training',
          'cantrip',
          'extra-language',
        ],
      },
    ],
  },

  // ─── Gnome ────────────────────────────────────────────────────────
  {
    id: 'gnome',
    name: 'Gnome',
    abilityBonuses: { int: 2 },
    speed: 25,
    size: 'Small',
    traits: [
      'darkvision',
      'gnome-cunning',
    ],
    languages: ['Common', 'Gnomish'],
    subraces: [
      {
        id: 'rock-gnome',
        name: 'Rock Gnome',
        abilityBonuses: { con: 1 },
        traits: [
          'artificers-lore',
          'tinker',
        ],
      },
    ],
  },

  // ─── Half-Elf ─────────────────────────────────────────────────────
  {
    id: 'half-elf',
    name: 'Half-Elf',
    abilityBonuses: { cha: 2 },
    // Note: Half-Elf also gets +1 to two other ability scores of choice.
    // That selection is handled in the UI; these are the fixed bonuses.
    speed: 30,
    size: 'Medium',
    traits: [
      'darkvision',
      'fey-ancestry',
      'skill-versatility',
    ],
    languages: ['Common', 'Elvish'],
    // Half-Elf also learns one extra language of choice (handled in UI)
    subraces: [],
  },

  // ─── Half-Orc ─────────────────────────────────────────────────────
  {
    id: 'half-orc',
    name: 'Half-Orc',
    abilityBonuses: { str: 2, con: 1 },
    speed: 30,
    size: 'Medium',
    traits: [
      'darkvision',
      'menacing',
      'relentless-endurance',
      'savage-attacks',
    ],
    languages: ['Common', 'Orc'],
    subraces: [],
  },

  // ─── Halfling ─────────────────────────────────────────────────────
  {
    id: 'halfling',
    name: 'Halfling',
    abilityBonuses: { dex: 2 },
    speed: 25,
    size: 'Small',
    traits: [
      'lucky',
      'brave',
      'halfling-nimbleness',
    ],
    languages: ['Common', 'Halfling'],
    subraces: [
      {
        id: 'lightfoot-halfling',
        name: 'Lightfoot Halfling',
        abilityBonuses: { cha: 1 },
        traits: ['naturally-stealthy'],
      },
    ],
  },

  // ─── Human ────────────────────────────────────────────────────────
  {
    id: 'human',
    name: 'Human',
    abilityBonuses: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
    speed: 30,
    size: 'Medium',
    traits: [
      'extra-language',
    ],
    languages: ['Common'],
    // Human also learns one extra language of choice (handled in UI)
    subraces: [],
  },

  // ─── Tiefling ─────────────────────────────────────────────────────
  {
    id: 'tiefling',
    name: 'Tiefling',
    abilityBonuses: { cha: 2, int: 1 },
    speed: 30,
    size: 'Medium',
    traits: [
      'darkvision',
      'hellish-resistance',
      'infernal-legacy',
    ],
    languages: ['Common', 'Infernal'],
    subraces: [],
  },
] as const

export function getRaceById(id: string): Race | undefined {
  return races.find(r => r.id === id)
}

export function getSubraceById(raceId: string, subraceId: string): Subrace | undefined {
  const race = getRaceById(raceId)
  return race?.subraces.find(s => s.id === subraceId)
}
