import type { GameVariant } from '@/stores/app'
import type { AbilityScores } from '@/stores/character'
import type { Race } from './dnd5e/races'
import type { CharacterClass, Subclass } from './dnd5e/classes'
import type { Background } from './dnd5e/backgrounds'
import type { Spell } from './dnd5e/spells'
import type { EquipmentSet } from './dnd5e/equipment'
import type { BrancaloniaSubclass } from './brancalonia/classes'
import type { BrancaloniaRules } from './brancalonia/rules'
import type { ApocalisseSubclass } from './apocalisse/classes'
import type { ApocalisseRules } from './apocalisse/rules'

import { races as dnd5eRaces } from './dnd5e/races'
import { classes as dnd5eClasses } from './dnd5e/classes'
import { backgrounds as dnd5eBackgrounds } from './dnd5e/backgrounds'
import { spells as dnd5eSpells } from './dnd5e/spells'
import { equipmentData } from './dnd5e/equipment'
import { getSpellSlotsForLevel } from './dnd5e/rules'
import { brancaloniaRaces } from './brancalonia/races'
import { brancaloniaSubclasses } from './brancalonia/classes'
import { burattinaioBrancaloniaClass } from './brancalonia/burattinaio'
import { brancaloniaBackgrounds } from './brancalonia/backgrounds'
import { brancaloniaRules, MAX_LEVEL as BRANCALONIA_MAX_LEVEL } from './brancalonia/rules'
import { apocalisseRaces } from './apocalisse/races'
import { apocalisseSubclasses } from './apocalisse/classes'
import { apocalisseBackgrounds } from './apocalisse/backgrounds'
import { apocalisseRules, MAX_LEVEL as APOCALISSE_MAX_LEVEL } from './apocalisse/rules'

// ─── Races ──────────────────────────────────────────────────────────────────

export function getRaces(variant: GameVariant): readonly Race[] {
  switch (variant) {
    case 'brancalonia':
      return brancaloniaRaces
    case 'apocalisse':
      return apocalisseRaces
    case 'dnd5e':
    default:
      return dnd5eRaces
  }
}

// ─── Classes ────────────────────────────────────────────────────────────────

/**
 * Get the available classes for the given variant.
 * For Brancalonia, the base D&D 5e classes are used but with the
 * Brancalonia-specific subclasses instead of the standard ones.
 */
export function getClasses(variant: GameVariant): readonly CharacterClass[] {
  switch (variant) {
    case 'brancalonia': {
      const brancaClasses = dnd5eClasses.map(cls => {
        const brancaSubs = brancaloniaSubclasses.filter(
          s => s.parentClassId === cls.id,
        )
        if (brancaSubs.length === 0) return cls

        // Convert BrancaloniaSubclass[] to Subclass[] for type compatibility
        const convertedSubs: Subclass[] = brancaSubs.map(bs => ({
          id: bs.id,
          name: bs.nameOriginal ? `${bs.name} (${bs.nameOriginal})` : bs.name,
          description: bs.description,
          features: bs.features,
        }))

        return {
          ...cls,
          subclasses: convertedSubs,
        }
      })
      // Add Brancalonia-exclusive classes
      return [...brancaClasses, burattinaioBrancaloniaClass]
    }
    case 'apocalisse': {
      const apoClasses = dnd5eClasses.map(cls => {
        const apoSubs = apocalisseSubclasses.filter(
          s => s.parentClassId === cls.id,
        )
        if (apoSubs.length === 0) return cls

        const convertedSubs: Subclass[] = apoSubs.map(as => ({
          id: as.id,
          name: as.nameOriginal ? `${as.name} (${as.nameOriginal})` : as.name,
          description: as.description,
          features: as.features,
        }))

        return {
          ...cls,
          subclasses: convertedSubs,
        }
      })
      return apoClasses
    }
    case 'dnd5e':
    default:
      return dnd5eClasses
  }
}

// ─── Subclasses (Brancalonia-specific) ──────────────────────────────────────

/**
 * Get the Brancalonia subclasses. Returns an empty array for dnd5e
 * since standard subclasses are embedded in the class definitions.
 */
export function getBrancaloniaSubclasses(variant: GameVariant): readonly BrancaloniaSubclass[] {
  if (variant === 'brancalonia') {
    return brancaloniaSubclasses
  }
  return []
}

// ─── Backgrounds ────────────────────────────────────────────────────────────

export function getBackgrounds(variant: GameVariant): readonly Background[] {
  switch (variant) {
    case 'brancalonia':
      return brancaloniaBackgrounds
    case 'apocalisse':
      return apocalisseBackgrounds
    case 'dnd5e':
    default:
      return dnd5eBackgrounds
  }
}

// ─── Rules ──────────────────────────────────────────────────────────────────

export interface VariantRules {
  maxLevel: number
  currencyStandard: 'gold' | 'silver'
  shortRestDuration: string
  longRestDuration: string
}

const dnd5eRulesData: VariantRules = {
  maxLevel: 20,
  currencyStandard: 'gold',
  shortRestDuration: '1 hour',
  longRestDuration: '8 hours',
}

const brancaloniaRulesData: VariantRules = {
  maxLevel: BRANCALONIA_MAX_LEVEL,
  currencyStandard: 'silver',
  shortRestDuration: '1 night (8 hours)',
  longRestDuration: '1 week of rollicking',
}

const apocalisseRulesData: VariantRules = {
  maxLevel: APOCALISSE_MAX_LEVEL,
  currencyStandard: 'gold',
  shortRestDuration: '1 hour',
  longRestDuration: '8 hours',
}

export function getRules(variant: GameVariant): VariantRules {
  switch (variant) {
    case 'brancalonia':
      return brancaloniaRulesData
    case 'apocalisse':
      return apocalisseRulesData
    case 'dnd5e':
    default:
      return dnd5eRulesData
  }
}

/**
 * Get the full Brancalonia rules object (includes brawling, shoddy equipment, etc.).
 * Returns null for non-Brancalonia variants.
 */
export function getBrancaloniaRules(variant: GameVariant): BrancaloniaRules | null {
  if (variant === 'brancalonia') {
    return brancaloniaRules
  }
  return null
}

/**
 * Get the full Apocalisse rules object (includes Humanity, Marks, Virtues/Sins, etc.).
 * Returns null for non-Apocalisse variants.
 */
export function getApocalisseRules(variant: GameVariant): ApocalisseRules | null {
  if (variant === 'apocalisse') {
    return apocalisseRules
  }
  return null
}

/**
 * Get the Apocalisse subclasses. Returns an empty array for other variants.
 */
export function getApocalisseSubclasses(variant: GameVariant): readonly ApocalisseSubclass[] {
  if (variant === 'apocalisse') {
    return apocalisseSubclasses
  }
  return []
}

// ─── Max Level ──────────────────────────────────────────────────────────────

export function getMaxLevel(variant: GameVariant): number {
  return getRules(variant).maxLevel
}

// ─── Equipment ──────────────────────────────────────────────────────────────

export function getEquipment(_variant: GameVariant): EquipmentSet {
  // Both variants use the same base equipment for now
  return equipmentData
}

// ─── Spells ─────────────────────────────────────────────────────────────────

export function getSpells(_variant: GameVariant): readonly Spell[] {
  return dnd5eSpells
}

/**
 * Get spell slots for a given class and level.
 * Returns an object mapping spell level to number of slots.
 */
export function getSpellSlots(className: string, level: number): Record<number, number> {
  const cls = dnd5eClasses.find(c => c.id === className)
  if (!cls?.spellcasting) return {}
  return getSpellSlotsForLevel(cls.spellcasting.casterType, level)
}

/**
 * Get the number of cantrips known for a given class and level.
 */
export function getCantripsKnown(className: string, level: number): number {
  const cls = dnd5eClasses.find(c => c.id === className)
  if (!cls?.spellcasting) return 0
  const idx = Math.min(level - 1, cls.spellcasting.cantripsKnown.length - 1)
  return cls.spellcasting.cantripsKnown[idx] ?? 0
}

/**
 * Get the number of spells known/preparable for a class at a level.
 * For prepared casters: ability mod + level (minimum 1)
 * For known casters: look up from the class table
 */
export function getSpellsKnownCount(
  className: string,
  level: number,
  abilityModifiers: Record<keyof AbilityScores, number>,
): number {
  const cls = dnd5eClasses.find(c => c.id === className)
  if (!cls?.spellcasting) return 0

  if (cls.spellcasting.preparedCaster) {
    // Prepared casters prepare: ability mod + class level (min 1)
    const abilityMod = abilityModifiers[cls.spellcasting.ability] ?? 0
    return Math.max(1, abilityMod + level)
  }

  // Known casters use a lookup table
  if (cls.spellcasting.spellsKnown) {
    const idx = Math.min(level - 1, cls.spellcasting.spellsKnown.length - 1)
    return cls.spellcasting.spellsKnown[idx] ?? 0
  }

  return 0
}

// ─── Languages ──────────────────────────────────────────────────────────────

export function getAvailableLanguages(variant: GameVariant): string[] {
  switch (variant) {
    case 'brancalonia':
      return brancaloniaRules.languages.map(l => l.name)
    case 'apocalisse':
      return apocalisseRules.languages.map(l => l.name)
    case 'dnd5e':
    default:
      return [
        'Common', 'Dwarvish', 'Elvish', 'Giant', 'Gnomish',
        'Goblin', 'Halfling', 'Orc', 'Abyssal', 'Celestial',
        'Draconic', 'Deep Speech', 'Infernal', 'Primordial',
        'Sylvan', 'Undercommon',
      ]
  }
}
