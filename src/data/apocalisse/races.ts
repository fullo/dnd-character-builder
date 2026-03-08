import type { Race } from '../dnd5e/races'

/**
 * Apocalisse races.
 * All characters in Apocalisse are human "Last Ones" (Ultimi).
 * Origins serve as subraces, providing ability bonuses, traits, and languages.
 * The manual allows flexible +2/+1/+1 assignment for most origins;
 * here we use thematic defaults that work within the existing system.
 */
export const apocalisseRaces: readonly Race[] = [
  {
    id: 'last-one',
    name: 'Last One',
    nameOriginal: 'Ultimo',
    description:
      'The Last Ones are the surviving humans of the Apocalypse. Whether born before the End Times or risen from the afterlife, they now walk the Plain of Armageddon seeking purpose in a shattered world.',
    abilityBonuses: {},
    speed: 30,
    size: 'Medium',
    traits: [
      'humanity-score',
      'mark-choice',
      'virtue-or-sin',
    ],
    languages: ['Babel Tongue'],
    subraces: [
      // ─── Child of the Old World ─────────────────────────────────────
      {
        id: 'child-old-world',
        name: 'Child of the Old World',
        abilityBonuses: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
        traits: [
          'Proficiency in 2 skills from: Arcana, Medicine, Nature, Perception, Religion, History, plus 1 free skill',
          'Proficiency with herbalist\'s kit and 1 artisan tool',
          'Language: Old World Tongue',
          'Memories of the Old World: you remember the world before the Apocalypse and can recall useful knowledge',
        ],
      },
      // ─── Child of the Apocalypse ────────────────────────────────────
      {
        id: 'child-apocalypse',
        name: 'Child of the Apocalypse',
        abilityBonuses: { con: 2, str: 1, wis: 1 },
        traits: [
          'Proficiency in 1 skill from: Athletics, Stealth, Perception, Survival, plus 1 free skill',
          'Proficiency with 1 artisan tool',
          'Stormborn: +1 HP per level',
          'Accustomed to Armageddon: advantage on saves against extreme weather and environmental hazards',
        ],
      },
      // ─── Risen from Hell ────────────────────────────────────────────
      {
        id: 'risen-hell',
        name: 'Risen from Hell',
        abilityBonuses: { cha: 2, dex: 1, int: 1 },
        traits: [
          'Proficiency in 2 skills from: Arcana, Stealth, Deception, Intimidation, Perception, Sleight of Hand, Religion',
          'Language: Infernal',
          'Darkvision 60 ft.',
          'Cantrip: chill touch. At 3rd level: inflict wounds 1/long rest',
          'Shard of Eternal Pain: you know suffering intimately and resist its effects',
          'Scars of the Lost Ones: your body bears marks of infernal torment',
        ],
      },
      // ─── Risen from Heaven ──────────────────────────────────────────
      {
        id: 'risen-heaven',
        name: 'Risen from Heaven',
        abilityBonuses: { wis: 2, cha: 1, con: 1 },
        traits: [
          'Proficiency in 2 skills from: Arcana, Insight, Medicine, Perception, Persuasion, Religion',
          'Language: Celestial',
          'Blindsight 20 ft.',
          'Cantrip: spare the dying. At 3rd level: cure wounds. At 5th level: moonbeam (each 1/long rest)',
          'Celestial Longing: you feel a pull toward the divine and radiate faint warmth',
          'Scent of Holiness: celestial creatures recognize your origin',
        ],
      },
      // ─── Risen from Purgatory ───────────────────────────────────────
      {
        id: 'risen-purgatory',
        name: 'Risen from Purgatory',
        abilityBonuses: { con: 2, wis: 1, str: 1 },
        traits: [
          'Proficiency in 1 skill from: Nature, Perception, Survival',
          'Language: Old World Tongue',
          'Blindsight 30 ft.',
          'Cantrip: resistance. At 3rd level: longstrider. At 5th level: protection from poison (each 1/long rest)',
          'Used to Atonement: you endured the purification of Purgatory',
          'Tireless Walker: you can travel twice as long before suffering exhaustion',
          'Ridge Climber: you have a climbing speed equal to your walking speed',
          'Resistance of the Mount: advantage on saves against being knocked prone',
        ],
      },
      // ─── Risen from Limbo ──────────────────────────────────────────
      {
        id: 'risen-limbo',
        name: 'Risen from Limbo',
        abilityBonuses: { int: 2, wis: 1, cha: 1 },
        traits: [
          'Proficiency in 2 skills from: Arcana, Investigation, Intimidation, Performance, Nature, Persuasion, Religion, History',
          'Cantrip: guidance. At 3rd level: bless. At 5th level: warding bond (each 1/long rest)',
          'Discernment: you can sense otherworldly presences within 30 ft.',
          'Declamation of Courage: as an action, bolster allies within 10 ft. granting advantage on saves vs. frightened (1/long rest)',
          'Apocalyptic Bestiary: you have extensive knowledge of the creatures born from the Apocalypse',
        ],
      },
    ],
  },
]

export function getApocalisseRaceById(id: string): Race | undefined {
  return apocalisseRaces.find(r => r.id === id)
}
