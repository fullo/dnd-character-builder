/**
 * Character sharing via URL.
 * Compresses character JSON using base64 encoding into a URL hash.
 * Uses a compact format to minimize URL length.
 */
import type { CharacterData } from '@/stores/character'

/** Compact keys for the most common character fields to reduce URL size */
const COMPACT_KEYS: Record<string, string> = {
  variant: 'v',
  name: 'n',
  playerName: 'pn',
  race: 'r',
  subrace: 'sr',
  className: 'c',
  subclass: 'sc',
  level: 'lv',
  background: 'bg',
  alignment: 'al',
  abilityScores: 'as',
  racialBonuses: 'rb',
  skillProficiencies: 'sp',
  savingThrowProficiencies: 'st',
  hitDie: 'hd',
  maxHp: 'hp',
  armor: 'ar',
  shield: 'sh',
  weapons: 'wp',
  cantrips: 'ct',
  spellsKnown: 'sk',
  spellcastingAbility: 'sa',
  spellcastingClass: 'sx',
  equipment: 'eq',
  personalityTraits: 'pt',
  ideals: 'id',
  bonds: 'bo',
  flaws: 'fl',
  backstory: 'bs',
  age: 'ag',
  height: 'ht',
  weight: 'wt',
  eyes: 'ey',
  hair: 'hr',
  skin: 'sn',
  mark: 'mk',
  markSpirit: 'ms',
  virtue: 'vr',
  sin: 'si',
  humanity: 'hu',
}

const REVERSE_KEYS: Record<string, string> = Object.fromEntries(
  Object.entries(COMPACT_KEYS).map(([k, v]) => [v, k])
)

/** Create a compact representation of essential character data */
function compactCharacter(char: CharacterData): Record<string, unknown> {
  const compact: Record<string, unknown> = {}
  for (const [fullKey, shortKey] of Object.entries(COMPACT_KEYS)) {
    const val = (char as any)[fullKey]
    // Skip empty/default values to save space
    if (val === undefined || val === null || val === '' || val === 0 || val === false) continue
    if (Array.isArray(val) && val.length === 0) continue
    if (typeof val === 'object' && !Array.isArray(val)) {
      // For ability scores and racial bonuses, check if all zeros
      const vals = Object.values(val as Record<string, number>)
      if (vals.every(v => v === 0 || v === null || v === undefined)) continue
    }
    compact[shortKey] = val
  }
  return compact
}

/** Restore full keys from compact representation */
function expandCharacter(compact: Record<string, unknown>): Partial<CharacterData> {
  const expanded: Record<string, unknown> = {}
  for (const [shortKey, val] of Object.entries(compact)) {
    const fullKey = REVERSE_KEYS[shortKey] || shortKey
    expanded[fullKey] = val
  }
  return expanded as Partial<CharacterData>
}

/** Encode character data to a URL-safe string */
export function encodeCharacterToUrl(char: CharacterData): string {
  const compact = compactCharacter(char)
  const json = JSON.stringify(compact)
  // Use btoa for base64 encoding, URL-safe variant
  const encoded = btoa(unescape(encodeURIComponent(json)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
  return encoded
}

/** Decode character data from URL-safe string */
export function decodeCharacterFromUrl(encoded: string): Partial<CharacterData> {
  // Restore base64 padding
  const padded = encoded
    .replace(/-/g, '+')
    .replace(/_/g, '/')
  const paddedWithEquals = padded + '='.repeat((4 - padded.length % 4) % 4)
  const json = decodeURIComponent(escape(atob(paddedWithEquals)))
  const compact = JSON.parse(json)
  return expandCharacter(compact)
}

/** Generate a full share URL for the character */
export function generateShareUrl(char: CharacterData): string {
  const encoded = encodeCharacterToUrl(char)
  const base = window.location.origin + window.location.pathname
  return `${base}#/share/${encoded}`
}

/** Generate share URL and copy to clipboard. Returns true on success. */
export async function copyShareUrl(char: CharacterData): Promise<boolean> {
  const url = generateShareUrl(char)
  try {
    await navigator.clipboard.writeText(url)
    return true
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement('textarea')
    textarea.value = url
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const success = document.execCommand('copy')
    document.body.removeChild(textarea)
    return success
  }
}
