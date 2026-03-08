import type { Background } from '../dnd5e/backgrounds'

export const brancaloniaBackgrounds: readonly Background[] = [
  // ─── Ambulant (Ambulante) ─────────────────────────────────────────
  {
    id: 'ambulant',
    name: 'Ambulant',
    nameOriginal: 'Ambulante',
    description:
      'You are a drifter, a wanderer with no fixed address and no particular destination. You have traveled every road, slept under every bridge, and eaten at every roadside tavern in the Boot. Your life is one of constant movement, and you have learned to survive by your wits and your charm. You know how to talk your way into a warm meal and how to read the land for shelter and sustenance.',
    skillProficiencies: ['survival', 'persuasion'],
    toolProficiencies: ['Herbalism kit'],
    languages: 1,
    equipment: [
      'Walking staff',
      'Traveler\'s clothes',
      'Herbalism kit',
      'Bedroll',
      'Belt pouch containing 10 sp',
    ],
    feature: {
      name: 'Roadwise',
      description:
        'You know the roads and byways of Brancalonia like the back of your hand. You can always find a safe place to camp, a shortcut between two towns, or a tavern willing to give you a meal in exchange for news from the road. Additionally, you can identify local customs and potential dangers of any region you have previously traveled through.',
    },
  },

  // ─── Brawler (Attaccabrighe) ──────────────────────────────────────
  {
    id: 'brawler',
    name: 'Brawler',
    nameOriginal: 'Attaccabrighe',
    description:
      'You are a street fighter, born and bred in the rough quarters of a Brancalonian city. You grew up settling disputes with your fists and learned early that the best defense is a good headbutt. Whether in organized fighting pits or back-alley brawls, you have earned a reputation as someone not to be trifled with. Your body bears the scars of countless scraps.',
    skillProficiencies: ['athletics', 'intimidation'],
    toolProficiencies: ['Gaming set'],
    languages: 0,
    equipment: [
      'Knuckle wraps',
      'Common clothes',
      'Trophy from a memorable fight',
      'Gaming set',
      'Belt pouch containing 10 sp',
    ],
    feature: {
      name: 'Pit Reputation',
      description:
        'Your reputation as a fighter precedes you in the rough quarters of any city. You can always find a fighting pit or underground brawl, and the organizers will give you a place to sleep and food in exchange for a bout. Additionally, common toughs and street thugs are reluctant to pick a fight with you, recognizing you as one of their own.',
    },
  },

  // ─── Finagler (Faccendiere) ───────────────────────────────────────
  {
    id: 'finagler',
    name: 'Finagler',
    nameOriginal: 'Faccendiere',
    description:
      'You are a bureaucrat, a fixer, a professional navigator of red tape. You know how to grease palms, forge documents, and exploit every loophole in the complex and contradictory laws of Brancalonia. Whether working as a minor official, a notary, or a full-time confidence artist, you have mastered the art of making things happen -- for a fee.',
    skillProficiencies: ['deception', 'investigation'],
    toolProficiencies: ['Forgery kit'],
    languages: 1,
    equipment: [
      'Fine clothes',
      'Forgery kit',
      'Sheaf of official-looking documents',
      'Sealing wax and signet ring (possibly fake)',
      'Belt pouch containing 15 sp',
    ],
    feature: {
      name: 'Bureaucratic Maze',
      description:
        'You know how to navigate the labyrinthine bureaucracy of Brancalonia. You can expedite official processes, obtain permits and documents (real or forged), and find the right person to bribe in any administrative body. Additionally, you can usually talk your way out of minor legal trouble by citing obscure regulations.',
    },
  },

  // ─── Fugitive (Fuggiasco) ─────────────────────────────────────────
  {
    id: 'fugitive',
    name: 'Fugitive',
    nameOriginal: 'Fuggiasco',
    description:
      'You are on the run. Whether from the law, a vengeful lord, a scorned lover, or debts you cannot pay, you have learned to live in the shadows. You know how to change your appearance, cover your tracks, and disappear into a crowd. Every town is a temporary refuge, every face a potential threat. Trust is a luxury you cannot afford.',
    skillProficiencies: ['stealth', 'survival'],
    toolProficiencies: ['Disguise kit'],
    languages: 0,
    equipment: [
      'Dark common clothes with hood',
      'Disguise kit',
      'Map of escape routes',
      'Dagger',
      'Belt pouch containing 5 sp',
    ],
    feature: {
      name: 'Underground Network',
      description:
        'You know how to find safe houses, sympathizers, and fellow fugitives in any settlement. You can always locate a place to hide for a few days without drawing attention. Additionally, you can identify wanted posters, bounty hunters, and law enforcement agents with a quick survey of any area.',
    },
  },

  // ─── Rover (Girovago) ─────────────────────────────────────────────
  {
    id: 'rover',
    name: 'Rover',
    nameOriginal: 'Girovago',
    description:
      'You are a traveling performer -- a juggler, acrobat, puppeteer, fire-eater, or some combination thereof. You have performed in every piazza, festival, and market square in the Boot. Your life is one of spectacle and applause, but also of hunger and uncertainty. You know how to work a crowd and how to pass the hat when the show is done.',
    skillProficiencies: ['acrobatics', 'performance'],
    toolProficiencies: ['Musical instrument', 'Disguise kit'],
    languages: 0,
    equipment: [
      'Musical instrument or performer\'s props',
      'Costume',
      'Disguise kit',
      'Favor of an admirer',
      'Belt pouch containing 10 sp',
    ],
    feature: {
      name: 'Center Stage',
      description:
        'You can always find a venue to perform -- a tavern, a piazza, a noble\'s courtyard. In exchange for a performance, you receive free lodging and food for yourself and your companions. Additionally, your performances attract attention, allowing you to gather rumors and local gossip from your audience.',
    },
  },

  // ─── Tough (Duro) ─────────────────────────────────────────────────
  {
    id: 'tough',
    name: 'Tough',
    nameOriginal: 'Duro',
    description:
      'You are a hardened survivor, forged by a life of unrelenting difficulty. Whether you grew up in the slums, served time in a prison, or survived a brutal occupation, you have come out the other side tougher and more watchful than most. Nothing surprises you anymore. You have seen the worst that people can do, and you are always prepared for it.',
    skillProficiencies: ['athletics', 'perception'],
    toolProficiencies: ['Vehicles (land)'],
    languages: 0,
    equipment: [
      'Sturdy common clothes',
      'Club or walking stick',
      'Token from a hard time survived',
      'Waterskin',
      'Belt pouch containing 8 sp',
    ],
    feature: {
      name: 'Hard Knock Life',
      description:
        'Your hard life has given you an instinct for danger and a resilience that others lack. You can go without food for one additional day before suffering exhaustion. Additionally, when you rest in an unsafe location, you sleep with one eye open -- you cannot be surprised while sleeping, and you wake immediately if danger approaches.',
    },
  },
] as const

export function getBrancaloniaBackgroundById(id: string): Background | undefined {
  return brancaloniaBackgrounds.find(b => b.id === id)
}
