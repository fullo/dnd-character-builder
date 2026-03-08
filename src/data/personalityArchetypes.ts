/**
 * Pre-prepared personality archetypes for random character generation.
 * Each archetype provides personality traits, ideals, bonds, and flaws
 * that are thematically coherent.
 */

export interface PersonalityArchetype {
  personalityTraits: string
  ideals: string
  bonds: string
  flaws: string
}

export const personalityArchetypes: readonly PersonalityArchetype[] = [
  // ─── The Noble Hero ──────────────────────────────────────────────
  {
    personalityTraits: 'I always stand up for those who cannot defend themselves. I speak with conviction and lead by example.',
    ideals: 'Justice. The strong must protect the weak, no matter the cost.',
    bonds: 'I swore an oath to protect my homeland and its people.',
    flaws: 'I am too trusting and believe everyone deserves a second chance.',
  },
  // ─── The Mysterious Loner ────────────────────────────────────────
  {
    personalityTraits: 'I speak few words but observe everything. People find my silence unnerving.',
    ideals: 'Freedom. No one should be shackled by rules or expectations.',
    bonds: 'I carry a keepsake from someone I lost long ago.',
    flaws: 'I push people away before they can get too close.',
  },
  // ─── The Charming Rogue ──────────────────────────────────────────
  {
    personalityTraits: 'I have a joke for every occasion and can talk my way out of almost anything.',
    ideals: 'Cleverness. Why fight when you can outsmart your opponent?',
    bonds: 'I owe a debt to a mentor who taught me everything I know.',
    flaws: 'I cannot resist a pretty face or a good bet.',
  },
  // ─── The Devoted Scholar ─────────────────────────────────────────
  {
    personalityTraits: 'I am endlessly curious and always carry a book. I tend to overexplain things.',
    ideals: 'Knowledge. Understanding the world is the highest pursuit.',
    bonds: 'My library is my most treasured possession.',
    flaws: 'I sometimes forget that not everyone cares about ancient history.',
  },
  // ─── The Grizzled Veteran ────────────────────────────────────────
  {
    personalityTraits: 'I have seen too many battles and carry the scars to prove it. I am slow to trust.',
    ideals: 'Loyalty. Those who fight beside me are my family.',
    bonds: 'I lost comrades in a battle that still haunts my dreams.',
    flaws: 'I drown my sorrows in drink when the memories become too much.',
  },
  // ─── The Devout Believer ─────────────────────────────────────────
  {
    personalityTraits: 'I see signs and omens in everyday events. My faith gives me strength in dark times.',
    ideals: 'Faith. The divine has a plan, and I am its instrument.',
    bonds: 'I will do anything to protect my temple and its congregation.',
    flaws: 'I judge others harshly who do not share my beliefs.',
  },
  // ─── The Wild Spirit ─────────────────────────────────────────────
  {
    personalityTraits: 'I feel more at home in the wilderness than in any city. Animals trust me instinctively.',
    ideals: 'Nature. Civilization corrupts what is pure and natural.',
    bonds: 'I protect a sacred grove that holds great power.',
    flaws: 'I am deeply suspicious of urban folk and their scheming ways.',
  },
  // ─── The Ambitious Merchant ──────────────────────────────────────
  {
    personalityTraits: 'I always know the value of things and can strike a deal anywhere. I dress to impress.',
    ideals: 'Prosperity. Wealth opens every door and solves every problem.',
    bonds: 'I am building a trading empire to secure my family\'s future.',
    flaws: 'I measure people by their wealth and status.',
  },
  // ─── The Reluctant Adventurer ────────────────────────────────────
  {
    personalityTraits: 'I complain about the dangers but always step up when it matters. I miss home cooking.',
    ideals: 'Community. Home and hearth are worth fighting for.',
    bonds: 'I left my family behind to protect them from a threat.',
    flaws: 'I am a terrible coward who hides behind bravado.',
  },
  // ─── The Vengeful Outcast ────────────────────────────────────────
  {
    personalityTraits: 'I carry a burning grudge and will not rest until I have my revenge. I trust no one completely.',
    ideals: 'Retribution. Those who wrong others must face consequences.',
    bonds: 'Someone powerful destroyed everything I loved. I will find them.',
    flaws: 'My desire for vengeance blinds me to everything else.',
  },
  // ─── The Jolly Entertainer ───────────────────────────────────────
  {
    personalityTraits: 'I love to make people laugh and always have a song ready. Life is too short to be serious.',
    ideals: 'Joy. The world needs more laughter and less suffering.',
    bonds: 'I perform to honor the memory of someone who believed in me.',
    flaws: 'I cannot take anything seriously, even when I should.',
  },
  // ─── The Haunted Soul ───────────────────────────────────────────
  {
    personalityTraits: 'I sometimes speak to people who are not there. I have trouble sleeping at night.',
    ideals: 'Redemption. I must atone for the terrible things I have done.',
    bonds: 'A spirit follows me, demanding that I right a wrong.',
    flaws: 'I am plagued by guilt and sometimes freeze at critical moments.',
  },
  // ─── The Curious Explorer ───────────────────────────────────────
  {
    personalityTraits: 'I have an insatiable wanderlust and collect souvenirs from every place I visit.',
    ideals: 'Discovery. There is always something new beyond the next hill.',
    bonds: 'I am searching for a legendary place that my grandmother told me about.',
    flaws: 'I rush headlong into danger without thinking things through.',
  },
  // ─── The Calculating Strategist ──────────────────────────────────
  {
    personalityTraits: 'I analyze every situation before acting. I always have a backup plan.',
    ideals: 'Logic. Emotion is the enemy of good decisions.',
    bonds: 'I serve an organization that works in the shadows for the greater good.',
    flaws: 'I overthink everything and sometimes miss the obvious solution.',
  },
  // ─── The Brancalonia Scoundrel ───────────────────────────────────
  {
    personalityTraits: 'I never pass up a chance for a good meal or a good fight. Honor is for fools with full bellies.',
    ideals: 'Survival. In this world, you eat or you get eaten.',
    bonds: 'My band of scoundrels is the only family I have ever known.',
    flaws: 'I cannot resist stealing something shiny, even when it is a terrible idea.',
  },
  // ─── The Fallen Noble ───────────────────────────────────────────
  {
    personalityTraits: 'I maintain impeccable manners even in the worst situations. I still introduce myself with my full title.',
    ideals: 'Honor. A true noble is defined by deeds, not by wealth.',
    bonds: 'I will reclaim my family\'s lost estate and restore our name.',
    flaws: 'I look down on commoners without realizing it.',
  },
]

/** Pick a random personality archetype */
export function pickRandomArchetype(): PersonalityArchetype {
  return personalityArchetypes[Math.floor(Math.random() * personalityArchetypes.length)]!
}
