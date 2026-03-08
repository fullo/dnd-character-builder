import { useI18n } from 'vue-i18n'
import { translateGameTerm } from '@/i18n/gameTerms'

/**
 * Composable that provides translation functions for game terms
 * (weapons, armor, spells, etc.) based on current locale.
 */
export function useGameTerms() {
  const { locale } = useI18n()

  function weapon(name: string): string {
    return translateGameTerm(name, locale.value, 'weapon')
  }

  function armorName(name: string): string {
    return translateGameTerm(name, locale.value, 'armor')
  }

  function spell(name: string): string {
    return translateGameTerm(name, locale.value, 'spell')
  }

  function school(name: string): string {
    return translateGameTerm(name, locale.value, 'school')
  }

  function damageType(name: string): string {
    return translateGameTerm(name, locale.value, 'damageType')
  }

  function pack(name: string): string {
    return translateGameTerm(name, locale.value, 'pack')
  }

  return { weapon, armorName, spell, school, damageType, pack }
}
