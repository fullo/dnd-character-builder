// WSG 3.8: Lazy-load variant data — only import the selected variant on demand
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

// ─── Lazy Cache ─────────────────────────────────────────────────────────────

interface Dnd5eCache {
  races: readonly Race[]
  classes: readonly CharacterClass[]
  backgrounds: readonly Background[]
  spells: readonly Spell[]
  equipment: EquipmentSet
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getSpellSlotsForLevel: (casterType: any, level: number) => Record<number, number>
}

interface BrancaloniaCache {
  races: readonly Race[]
  subclasses: readonly BrancaloniaSubclass[]
  burattinaioClass: CharacterClass
  backgrounds: readonly Background[]
  rules: BrancaloniaRules
  maxLevel: number
}

interface ApocalisseCache {
  races: readonly Race[]
  subclasses: readonly ApocalisseSubclass[]
  backgrounds: readonly Background[]
  rules: ApocalisseRules
  maxLevel: number
}

let _dnd5e: Dnd5eCache | null = null
let _brancalonia: BrancaloniaCache | null = null
let _apocalisse: ApocalisseCache | null = null

// Prevent concurrent loads of the same variant
let _dnd5ePromise: Promise<Dnd5eCache> | null = null
let _brancaloniaPromise: Promise<BrancaloniaCache> | null = null
let _apocalissePromise: Promise<ApocalisseCache> | null = null

async function loadDnd5e(): Promise<Dnd5eCache> {
  if (_dnd5e) return _dnd5e
  if (_dnd5ePromise) return _dnd5ePromise
  const promise = (async (): Promise<Dnd5eCache> => {
    const [raceMod, classMod, bgMod, spellMod, equipMod, ruleMod] = await Promise.all([
      import('./dnd5e/races'),
      import('./dnd5e/classes'),
      import('./dnd5e/backgrounds'),
      import('./dnd5e/spells'),
      import('./dnd5e/equipment'),
      import('./dnd5e/rules'),
    ])
    const cache: Dnd5eCache = {
      races: raceMod.races,
      classes: classMod.classes,
      backgrounds: bgMod.backgrounds,
      spells: spellMod.spells,
      equipment: equipMod.equipmentData,
      getSpellSlotsForLevel: ruleMod.getSpellSlotsForLevel,
    }
    _dnd5e = cache
    return cache
  })()
  _dnd5ePromise = promise
  return promise
}

async function loadBrancalonia(): Promise<BrancaloniaCache> {
  if (_brancalonia) return _brancalonia
  if (_brancaloniaPromise) return _brancaloniaPromise
  const promise = (async (): Promise<BrancaloniaCache> => {
    const [raceMod, classMod, buratMod, bgMod, ruleMod] = await Promise.all([
      import('./brancalonia/races'),
      import('./brancalonia/classes'),
      import('./brancalonia/burattinaio'),
      import('./brancalonia/backgrounds'),
      import('./brancalonia/rules'),
    ])
    const cache: BrancaloniaCache = {
      races: raceMod.brancaloniaRaces,
      subclasses: classMod.brancaloniaSubclasses,
      burattinaioClass: buratMod.burattinaioBrancaloniaClass,
      backgrounds: bgMod.brancaloniaBackgrounds,
      rules: ruleMod.brancaloniaRules,
      maxLevel: ruleMod.MAX_LEVEL,
    }
    _brancalonia = cache
    return cache
  })()
  _brancaloniaPromise = promise
  return promise
}

async function loadApocalisse(): Promise<ApocalisseCache> {
  if (_apocalisse) return _apocalisse
  if (_apocalissePromise) return _apocalissePromise
  const promise = (async (): Promise<ApocalisseCache> => {
    const [raceMod, classMod, bgMod, ruleMod] = await Promise.all([
      import('./apocalisse/races'),
      import('./apocalisse/classes'),
      import('./apocalisse/backgrounds'),
      import('./apocalisse/rules'),
    ])
    const cache: ApocalisseCache = {
      races: raceMod.apocalisseRaces,
      subclasses: classMod.apocalisseSubclasses,
      backgrounds: bgMod.apocalisseBackgrounds,
      rules: ruleMod.apocalisseRules,
      maxLevel: ruleMod.MAX_LEVEL,
    }
    _apocalisse = cache
    return cache
  })()
  _apocalissePromise = promise
  return promise
}

// ─── Public API: Preload ────────────────────────────────────────────────────

/**
 * Preload all data needed for a given variant.
 * Call this when the variant is selected to ensure data is ready
 * before synchronous getters are called.
 * WSG 3.8: Defer loading of non-critical resources
 */
export async function preloadVariantData(variant: GameVariant): Promise<void> {
  switch (variant) {
    case 'brancalonia':
      await Promise.all([loadDnd5e(), loadBrancalonia()])
      break
    case 'apocalisse':
      await Promise.all([loadDnd5e(), loadApocalisse()])
      break
    case 'dnd5e':
    default:
      await loadDnd5e()
      break
  }
}

/** Check if variant data is already cached */
export function isVariantLoaded(variant: GameVariant): boolean {
  switch (variant) {
    case 'brancalonia': return !!_dnd5e && !!_brancalonia
    case 'apocalisse': return !!_dnd5e && !!_apocalisse
    default: return !!_dnd5e
  }
}

// ─── Races ──────────────────────────────────────────────────────────────────

export function getRaces(variant: GameVariant): readonly Race[] {
  switch (variant) {
    case 'brancalonia':
      return _brancalonia?.races ?? []
    case 'apocalisse':
      return _apocalisse?.races ?? []
    case 'dnd5e':
    default:
      return _dnd5e?.races ?? []
  }
}

// ─── Classes ────────────────────────────────────────────────────────────────

/**
 * Get the available classes for the given variant.
 * For Brancalonia, the base D&D 5e classes are used but with the
 * Brancalonia-specific subclasses instead of the standard ones.
 */
export function getClasses(variant: GameVariant): readonly CharacterClass[] {
  if (!_dnd5e) return []

  switch (variant) {
    case 'brancalonia': {
      if (!_brancalonia) return []
      const brancaClasses = _dnd5e.classes.map(cls => {
        const brancaSubs = _brancalonia!.subclasses.filter(
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
      return [...brancaClasses, _brancalonia.burattinaioClass]
    }
    case 'apocalisse': {
      if (!_apocalisse) return []
      const apoClasses = _dnd5e.classes.map(cls => {
        const apoSubs = _apocalisse!.subclasses.filter(
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
      return _dnd5e.classes
  }
}

// ─── Subclasses (Brancalonia-specific) ──────────────────────────────────────

/**
 * Get the Brancalonia subclasses. Returns an empty array for dnd5e
 * since standard subclasses are embedded in the class definitions.
 */
export function getBrancaloniaSubclasses(variant: GameVariant): readonly BrancaloniaSubclass[] {
  if (variant === 'brancalonia') {
    return _brancalonia?.subclasses ?? []
  }
  return []
}

// ─── Backgrounds ────────────────────────────────────────────────────────────

export function getBackgrounds(variant: GameVariant): readonly Background[] {
  switch (variant) {
    case 'brancalonia':
      return _brancalonia?.backgrounds ?? []
    case 'apocalisse':
      return _apocalisse?.backgrounds ?? []
    case 'dnd5e':
    default:
      return _dnd5e?.backgrounds ?? []
  }
}

// ─── Rules ──────────────────────────────────────────────────────────────────

export interface VariantRules {
  maxLevel: number
  currencyStandard: 'gold' | 'silver'
  shortRestDuration: string
  longRestDuration: string
}

// These are small inline objects — no lazy loading needed
const dnd5eRulesData: VariantRules = {
  maxLevel: 20,
  currencyStandard: 'gold',
  shortRestDuration: '1 hour',
  longRestDuration: '8 hours',
}

const brancaloniaRulesData: VariantRules = {
  maxLevel: 10,
  currencyStandard: 'silver',
  shortRestDuration: '1 night (8 hours)',
  longRestDuration: '1 week of rollicking',
}

const apocalisseRulesData: VariantRules = {
  maxLevel: 20,
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
    return _brancalonia?.rules ?? null
  }
  return null
}

/**
 * Get the full Apocalisse rules object (includes Humanity, Marks, Virtues/Sins, etc.).
 * Returns null for non-Apocalisse variants.
 */
export function getApocalisseRules(variant: GameVariant): ApocalisseRules | null {
  if (variant === 'apocalisse') {
    return _apocalisse?.rules ?? null
  }
  return null
}

/**
 * Get the Apocalisse subclasses. Returns an empty array for other variants.
 */
export function getApocalisseSubclasses(variant: GameVariant): readonly ApocalisseSubclass[] {
  if (variant === 'apocalisse') {
    return _apocalisse?.subclasses ?? []
  }
  return []
}

// ─── Max Level ──────────────────────────────────────────────────────────────

export function getMaxLevel(variant: GameVariant): number {
  return getRules(variant).maxLevel
}

// ─── Equipment ──────────────────────────────────────────────────────────────

export function getEquipment(_variant: GameVariant): EquipmentSet {
  // Both variants use the same base equipment
  return _dnd5e?.equipment ?? { simpleWeapons: [], martialWeapons: [], armor: [], packs: [] }
}

// ─── Spells ─────────────────────────────────────────────────────────────────

export function getSpells(_variant: GameVariant): readonly Spell[] {
  return _dnd5e?.spells ?? []
}

/**
 * Get spell slots for a given class and level.
 * Returns an object mapping spell level to number of slots.
 */
export function getSpellSlots(className: string, level: number): Record<number, number> {
  if (!_dnd5e) return {}
  const cls = _dnd5e.classes.find(c => c.id === className)
  if (!cls?.spellcasting) return {}
  return _dnd5e.getSpellSlotsForLevel(cls.spellcasting.casterType, level)
}

/**
 * Get the number of cantrips known for a given class and level.
 */
export function getCantripsKnown(className: string, level: number): number {
  if (!_dnd5e) return 0
  const cls = _dnd5e.classes.find(c => c.id === className)
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
  if (!_dnd5e) return 0
  const cls = _dnd5e.classes.find(c => c.id === className)
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

const DND5E_LANGUAGES = [
  'Common', 'Dwarvish', 'Elvish', 'Giant', 'Gnomish',
  'Goblin', 'Halfling', 'Orc', 'Abyssal', 'Celestial',
  'Draconic', 'Deep Speech', 'Infernal', 'Primordial',
  'Sylvan', 'Undercommon',
]

export function getAvailableLanguages(variant: GameVariant): string[] {
  switch (variant) {
    case 'brancalonia':
      return _brancalonia?.rules.languages.map(l => l.name) ?? DND5E_LANGUAGES
    case 'apocalisse':
      return _apocalisse?.rules.languages.map(l => l.name) ?? DND5E_LANGUAGES
    case 'dnd5e':
    default:
      return DND5E_LANGUAGES
  }
}
