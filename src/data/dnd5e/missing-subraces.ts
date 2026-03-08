/**
 * Missing D&D 5e SRD Subraces
 *
 * Research summary (data source: https://api.open5e.com/v1/races/?format=json&limit=50&document__slug=wotc-srd)
 *
 * ============================================================================
 * RACES: No missing races.
 * ============================================================================
 *
 * The open5e API returns exactly 9 races under the wotc-srd document slug:
 *   Dragonborn, Dwarf, Elf, Gnome, Half-Elf, Half-Orc, Halfling, Human, Tiefling
 *
 * These match the 9 races already present in `races.ts`. No new races to add.
 *
 * ============================================================================
 * SUBRACES: 5 missing subraces identified.
 * ============================================================================
 *
 * The open5e API (wotc-srd slug) only serves 4 subraces:
 *   - Hill Dwarf         (already in races.ts)
 *   - High Elf           (already in races.ts)
 *   - Rock Gnome         (already in races.ts)
 *   - Lightfoot Halfling (already in races.ts)
 *
 * However, the official D&D 5e SRD includes 5 additional subraces that are
 * NOT present in the open5e API response:
 *
 *   1. Mountain Dwarf   -> parent: Dwarf
 *   2. Wood Elf         -> parent: Elf
 *   3. Dark Elf (Drow)  -> parent: Elf
 *   4. Forest Gnome     -> parent: Gnome
 *   5. Stout Halfling   -> parent: Halfling
 *
 * NOTE: The open5e API also lists a "Stoor Halfling" subrace under the
 * halfling race, but it comes from the "o5e" (Open5e Original Content)
 * document, NOT from wotc-srd. It is excluded from this file.
 *
 * ============================================================================
 * HOW TO USE
 * ============================================================================
 *
 * To add these subraces, merge each entry into the `subraces` array of its
 * parent race in `races.ts`. For example, add `mountainDwarf` to the Dwarf
 * race's `subraces` array alongside the existing Hill Dwarf entry.
 */

import type { Subrace } from './races'

// ─── Dwarf Subraces ───────────────────────────────────────────────────────────

export const mountainDwarf: Subrace = {
  id: 'mountain-dwarf',
  name: 'Mountain Dwarf',
  abilityBonuses: { str: 2 },
  traits: [
    'dwarven-armor-training', // Proficiency with light and medium armor
  ],
}

// ─── Elf Subraces ─────────────────────────────────────────────────────────────

export const woodElf: Subrace = {
  id: 'wood-elf',
  name: 'Wood Elf',
  abilityBonuses: { wis: 1 },
  traits: [
    'elf-weapon-training',  // Proficiency with longsword, shortsword, shortbow, longbow
    'fleet-of-foot',        // Base walking speed increases to 35 feet
    'mask-of-the-wild',     // Can attempt to hide when lightly obscured by natural phenomena
  ],
}

export const darkElf: Subrace = {
  id: 'dark-elf',
  name: 'Dark Elf (Drow)',
  abilityBonuses: { cha: 1 },
  traits: [
    'superior-darkvision',  // Darkvision out to 120 feet (replaces standard 60 ft)
    'sunlight-sensitivity', // Disadvantage on attack rolls and Perception checks in direct sunlight
    'drow-magic',           // Dancing lights cantrip; faerie fire at 3rd level; darkness at 5th level
    'drow-weapon-training', // Proficiency with rapiers, shortswords, hand crossbows
  ],
}

// ─── Gnome Subraces ──────────────────────────────────────────────────────────

export const forestGnome: Subrace = {
  id: 'forest-gnome',
  name: 'Forest Gnome',
  abilityBonuses: { dex: 1 },
  traits: [
    'natural-illusionist', // Know the minor illusion cantrip (Intelligence is spellcasting ability)
    'speak-with-small-beasts', // Can communicate simple ideas with Small or smaller beasts
  ],
}

// ─── Halfling Subraces ───────────────────────────────────────────────────────

export const stoutHalfling: Subrace = {
  id: 'stout-halfling',
  name: 'Stout Halfling',
  abilityBonuses: { con: 1 },
  traits: [
    'stout-resilience', // Advantage on saves vs. poison; resistance to poison damage
  ],
}

// ─── Grouped by parent race for convenience ──────────────────────────────────

/**
 * All missing subraces grouped by their parent race ID.
 * Use this to programmatically merge them into the existing race definitions.
 *
 * Example:
 * ```ts
 * import { missingSubracesByRace } from './missing-subraces'
 *
 * for (const [raceId, subraces] of Object.entries(missingSubracesByRace)) {
 *   const race = races.find(r => r.id === raceId)
 *   if (race) {
 *     race.subraces.push(...subraces)
 *   }
 * }
 * ```
 */
export const missingSubracesByRace: Record<string, Subrace[]> = {
  dwarf: [mountainDwarf],
  elf: [woodElf, darkElf],
  gnome: [forestGnome],
  halfling: [stoutHalfling],
}
