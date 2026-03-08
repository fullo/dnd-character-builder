import type { Race } from '../dnd5e/races'

export const brancaloniaRaces: readonly Race[] = [
  // ─── Human (Umano) ────────────────────────────────────────────────
  {
    id: 'human',
    name: 'Human',
    nameOriginal: 'Umano',
    description:
      'The most common folk across the Boot. Humans are versatile, adaptable, and endlessly ambitious. They populate every corner of Brancalonia, from the bustling port cities to the quietest mountain villages. Their greatest strength is their flexibility, able to turn their hand to any trade, craft, or calling.',
    abilityBonuses: {},
    abilityScoreChoice: { count: 2, amount: 1 },
    speed: 30,
    size: 'Medium',
    traits: [
      'versatile',
      'extra-language',
      'extra-skill-proficiency',
    ],
    languages: ['Vernacular'],
    subraces: [],
  },

  // ─── Gifted (Dotato) ──────────────────────────────────────────────
  {
    id: 'gifted',
    name: 'Gifted',
    nameOriginal: 'Dotato',
    description:
      'Some humans are born with an innate spark of magic, often manifesting as a peculiar physical trait: mismatched eyes, a birthmark shaped like a crescent moon, hair that changes with the seasons, or a faint glow around the fingers. Known as Gifted, they possess a minor but undeniable connection to supernatural forces. These abilities are often regarded with suspicion by commoners and with great interest by scholars and charlatans alike.',
    abilityBonuses: { cha: 1 },
    abilityScoreChoice: { count: 1, amount: 1 },
    speed: 30,
    size: 'Medium',
    traits: [
      'innate-spellcasting',
      'physical-peculiarity',
      'superstitious-aura',
    ],
    languages: ['Vernacular'],
    subraces: [],
  },

  // ─── Malebranche (Malebranche) ────────────────────────────────────
  {
    id: 'malebranche',
    name: 'Malebranche',
    nameOriginal: 'Malebranche',
    description:
      'Former devils who were cast out of the infernal hierarchy and now wander the mortal world. Though they have lost most of their diabolic powers, Malebranches retain their imposing horned visages, thick hides, and a residual affinity for fire. They are often mistrusted and feared, but many have found a rough kind of acceptance among the outcasts and vagabonds of Brancalonia. Their infernal strength makes them fearsome brawlers.',
    abilityBonuses: { str: 2, con: 1 },
    speed: 30,
    size: 'Medium',
    traits: [
      'darkvision',
      'infernal-heritage',
      'fire-resistance',
      'enhanced-brawling',
      'menacing-presence',
    ],
    languages: ['Vernacular', 'Bedamn'],
    subraces: [],
  },

  // ─── Marionette (Marionetta) ──────────────────────────────────────
  {
    id: 'marionette',
    name: 'Marionette',
    nameOriginal: 'Marionetta',
    description:
      'Animated wooden puppets brought to life by mysterious magic, Marionettes are a peculiar and endearing folk of Brancalonia. Carved from enchanted wood and given the spark of sentience, they do not need to eat, drink, or breathe, though many enjoy pantomiming meals with their companions. Their wooden bodies make them nimble but vulnerable to flame, and they possess a natural resistance to poisons that would fell creatures of flesh and blood.',
    abilityBonuses: { dex: 2, cha: 1 },
    speed: 30,
    size: 'Medium',
    traits: [
      'constructed-body',
      'fire-vulnerability',
      'poison-resistance',
      'wooden-resilience',
      'sentry-rest',
    ],
    languages: ['Vernacular'],
    subraces: [],
  },

  // ─── Morgant (Morgante) ───────────────────────────────────────────
  {
    id: 'morgant',
    name: 'Morgant',
    nameOriginal: 'Morgante',
    description:
      'Demi-giants standing over two meters tall, Morgants are the descendants of ancient giants who once roamed the Boot. Though they are not true giants, their massive frames and prodigious appetites set them apart from other folk. Morgants are renowned for their incredible physical strength and their equally incredible capacity for food and drink. Many find work as laborers, guards, or strongmen, while others take to the road as adventurers.',
    abilityBonuses: { str: 2, con: 1 },
    speed: 30,
    size: 'Medium',
    traits: [
      'powerful-build',
      'big-appetite',
      'natural-athlete',
      'demi-giant-resilience',
    ],
    languages: ['Vernacular'],
    subraces: [],
  },

  // ─── Sylvan (Silvano) ─────────────────────────────────────────────
  {
    id: 'sylvan',
    name: 'Sylvan',
    nameOriginal: 'Silvano',
    description:
      'Wild folk of the deep forests and untamed places, Sylvans live in harmony with the natural world. With bark-like skin, leaf-tangled hair, and an instinctive bond with animals and plants, they are the guardians of the woodlands. Sylvans can speak with animals and have an uncanny sense for danger in natural environments. Though shy and reclusive by nature, some are drawn to civilization by curiosity or necessity.',
    abilityBonuses: { wis: 2, dex: 1 },
    speed: 30,
    size: 'Medium',
    traits: [
      'speak-with-animals',
      'nature-bond',
      'mask-of-the-wild',
      'forest-born',
    ],
    languages: ['Vernacular', 'Lingua Ignota'],
    subraces: [],
  },
] as const

export function getBrancaloniaRaceById(id: string): Race | undefined {
  return brancaloniaRaces.find(r => r.id === id)
}
