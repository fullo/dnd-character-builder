<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCharacterStore } from '@/stores/character'
import { formatModifier, spellSaveDC, spellAttackBonus } from '@/utils/calculations'
import { usePdfExport } from '@/composables/usePdfExport'
import { SKILLS } from '@/data/dnd5e/skills'
import { getSpells, getClasses } from '@/data'
import { useGameTerms } from '@/composables/useGameTerms'

const { t } = useI18n()
const characterStore = useCharacterStore()
const { exportPdf, exporting } = usePdfExport()
const gt = useGameTerms()

const char = computed(() => characterStore.character)
const mods = computed(() => characterStore.abilityModifiers)
const prof = computed(() => characterStore.profBonus)

const savingThrows = computed(() => {
  const abilities = ['str', 'dex', 'con', 'int', 'wis', 'cha'] as const
  return abilities.map(a => ({
    ability: a,
    value: mods.value[a] + (char.value.savingThrowProficiencies.includes(a) ? prof.value : 0),
    proficient: char.value.savingThrowProficiencies.includes(a),
  }))
})

const skills = computed(() => {
  return SKILLS.map(skill => {
    const abilityMod = mods.value[skill.ability as keyof typeof mods.value]
    const proficient = char.value.skillProficiencies.includes(skill.id)
    const expert = char.value.skillExpertise.includes(skill.id)
    let bonus = abilityMod
    if (proficient) bonus += prof.value
    if (expert) bonus += prof.value
    return { ...skill, bonus, proficient, expert }
  })
})

const spellDC = computed(() => {
  if (!char.value.spellcastingAbility) return 0
  const abilityMod = mods.value[char.value.spellcastingAbility as keyof typeof mods.value]
  return spellSaveDC(prof.value, abilityMod)
})

const spellAtk = computed(() => {
  if (!char.value.spellcastingAbility) return 0
  const abilityMod = mods.value[char.value.spellcastingAbility as keyof typeof mods.value]
  return spellAttackBonus(prof.value, abilityMod)
})

const allSpells = computed(() => getSpells(char.value.variant))

function spellName(id: string): string {
  const spell = allSpells.value.find(s => s.id === id)
  return spell ? gt.spell(spell.name) : id
}

const variantClasses = computed(() => getClasses(char.value.variant))
const className = computed(() => {
  return variantClasses.value.find(c => c.id === char.value.className)?.name ?? char.value.className
})
const subclassName = computed(() => {
  if (!char.value.subclass) return ''
  const cls = variantClasses.value.find(c => c.id === char.value.className)
  return cls?.subclasses.find(s => s.id === char.value.subclass)?.name ?? char.value.subclass
})

function saveChar() {
  characterStore.saveCharacter()
}

function downloadJson() {
  const json = characterStore.exportJson()
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${char.value.name || 'character'}.json`
  a.click()
  URL.revokeObjectURL(url)
}

function printSheet() {
  window.print()
}

const fileInput = ref<HTMLInputElement | null>(null)

function triggerImport() {
  fileInput.value?.click()
}

function handleImport(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      characterStore.importJson(e.target?.result as string)
    } catch {
      alert(t('review.importError'))
    }
  }
  reader.readAsText(file)
  if (fileInput.value) fileInput.value.value = ''
}
</script>

<template>
  <section aria-labelledby="review-heading">
    <h2 id="review-heading" class="text-2xl font-bold text-amber-500 mb-6">{{ t('review.title') }}</h2>

    <!-- Header -->
    <div class="bg-stone-800 border border-stone-700 rounded-lg p-6 mb-4">
      <div class="flex flex-wrap gap-6">
        <div>
          <p class="text-xs text-stone-500 uppercase">{{ t('review.charName') }}</p>
          <p class="text-xl font-bold text-amber-400">{{ char.name || '--' }}</p>
        </div>
        <div>
          <p class="text-xs text-stone-500 uppercase">{{ t('review.classLevel') }}</p>
          <p class="text-stone-200">{{ className }} {{ char.level }}</p>
          <p v-if="subclassName" class="text-xs text-stone-500">{{ subclassName }}</p>
        </div>
        <div>
          <p class="text-xs text-stone-500 uppercase">{{ t('review.charRace') }}</p>
          <p class="text-stone-200">{{ char.race }} {{ char.subrace ? `(${char.subrace})` : '' }}</p>
        </div>
        <div>
          <p class="text-xs text-stone-500 uppercase">{{ t('review.charBackground') }}</p>
          <p class="text-stone-200">{{ char.background }}</p>
        </div>
        <div>
          <p class="text-xs text-stone-500 uppercase">{{ t('details.alignment') }}</p>
          <p class="text-stone-200">{{ char.alignment ? t(`alignments.${char.alignment}`) : '--' }}</p>
        </div>
      </div>
    </div>

    <!-- Combat Stats -->
    <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
      <div class="bg-stone-800 border border-amber-700/30 rounded-lg p-3 text-center">
        <p class="text-xs text-stone-500">{{ t('review.ac') }}</p>
        <p class="text-2xl font-bold text-amber-400">{{ characterStore.armorClass }}</p>
      </div>
      <div class="bg-stone-800 border border-stone-700 rounded-lg p-3 text-center">
        <p class="text-xs text-stone-500">{{ t('review.initiative') }}</p>
        <p class="text-2xl font-bold text-stone-200">{{ formatModifier(characterStore.initiative) }}</p>
      </div>
      <div class="bg-stone-800 border border-stone-700 rounded-lg p-3 text-center">
        <p class="text-xs text-stone-500">{{ t('review.speed') }}</p>
        <p class="text-2xl font-bold text-stone-200">{{ char.speed }}ft</p>
      </div>
      <div class="bg-stone-800 border border-red-700/30 rounded-lg p-3 text-center">
        <p class="text-xs text-stone-500">{{ t('review.hp') }}</p>
        <p class="text-2xl font-bold text-red-400">{{ char.maxHp }}</p>
      </div>
      <div class="bg-stone-800 border border-stone-700 rounded-lg p-3 text-center">
        <p class="text-xs text-stone-500">{{ t('review.proficiencyBonus') }}</p>
        <p class="text-2xl font-bold text-stone-200">{{ formatModifier(prof) }}</p>
      </div>
    </div>

    <!-- Ability Scores -->
    <div class="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
      <div v-for="a in (['str','dex','con','int','wis','cha'] as const)" :key="a"
        class="bg-stone-800 border border-stone-700 rounded-lg p-3 text-center">
        <p class="text-xs text-stone-500 uppercase">{{ t(`abilities.${a}`) }}</p>
        <p class="text-xl font-bold text-stone-200">{{ characterStore.totalAbilityScore(a) }}</p>
        <p class="text-sm text-amber-400">{{ formatModifier(mods[a]) }}</p>
      </div>
    </div>

    <!-- Saving Throws & Skills -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div class="bg-stone-800 border border-stone-700 rounded-lg p-4">
        <h3 class="font-semibold text-stone-300 mb-2">{{ t('review.savingThrows') }}</h3>
        <div class="space-y-1 text-sm">
          <div v-for="st in savingThrows" :key="st.ability" class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full" :class="st.proficient ? 'bg-amber-500' : 'bg-stone-600'" :aria-label="st.proficient ? 'Proficient' : 'Not proficient'" role="img"></span>
            <span class="text-stone-400 uppercase w-8">{{ st.ability }}</span>
            <span class="text-stone-200 font-medium">{{ formatModifier(st.value) }}</span>
          </div>
        </div>
      </div>

      <div class="bg-stone-800 border border-stone-700 rounded-lg p-4">
        <h3 class="font-semibold text-stone-300 mb-2">{{ t('review.skills') }}</h3>
        <div class="space-y-1 text-xs max-h-60 overflow-y-auto">
          <div v-for="skill in skills" :key="skill.id" class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full" :class="skill.proficient ? 'bg-amber-500' : 'bg-stone-600'" :aria-label="skill.proficient ? 'Proficient' : 'Not proficient'" role="img"></span>
            <span class="text-stone-400 flex-1">{{ skill.name }}</span>
            <span class="text-stone-200 font-medium">{{ formatModifier(skill.bonus) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Spells -->
    <div v-if="char.spellcastingAbility" class="bg-stone-800 border border-stone-700 rounded-lg p-4 mb-4">
      <h3 class="font-semibold text-stone-300 mb-2">{{ t('spells.title') }}</h3>
      <div class="flex gap-4 text-sm mb-3">
        <span class="text-stone-400">{{ t('spells.spellSaveDC') }}: <strong class="text-amber-400">{{ spellDC }}</strong></span>
        <span class="text-stone-400">{{ t('spells.spellAttackBonus') }}: <strong class="text-amber-400">{{ formatModifier(spellAtk) }}</strong></span>
      </div>
      <div v-if="char.cantrips.length" class="mb-2">
        <span class="text-xs text-stone-500">{{ t('spells.cantrips') }}:</span>
        <span class="text-stone-300 text-sm ml-1">{{ char.cantrips.map(spellName).join(', ') }}</span>
      </div>
      <div v-if="char.spellsKnown.length">
        <span class="text-xs text-stone-500">{{ t('spells.knownSpells') }}:</span>
        <span class="text-stone-300 text-sm ml-1">{{ char.spellsKnown.map(spellName).join(', ') }}</span>
      </div>
    </div>

    <!-- Weapons & Armor -->
    <div v-if="char.weapons.length || char.armor || char.equipment.length" class="bg-stone-800 border border-stone-700 rounded-lg p-4 mb-4">
      <div v-if="char.armor || char.shield" class="mb-3">
        <h4 class="font-semibold text-stone-300 mb-1">{{ t('review.armorLabel') }}</h4>
        <div class="flex gap-3 text-sm">
          <span v-if="char.armor" class="text-stone-300">{{ gt.armorName(char.armor) }}</span>
          <span v-if="char.shield" class="text-amber-400">{{ t('review.shieldBonus') }}</span>
          <span v-if="!char.armor && !char.shield" class="text-stone-500">{{ t('review.noArmor') }}</span>
        </div>
      </div>

      <div v-if="char.weapons.length" class="mb-3">
        <h4 class="font-semibold text-stone-300 mb-1">{{ t('review.attacks') }}</h4>
        <div class="space-y-1">
          <div v-for="(wpn, i) in char.weapons" :key="i" class="flex gap-4 text-sm">
            <span class="text-amber-400 font-medium w-36">{{ gt.weapon(wpn.name) }}</span>
            <span class="text-stone-400 w-12">{{ formatModifier(wpn.attackBonus) }}</span>
            <span class="text-stone-300">{{ wpn.damage }}</span>
          </div>
        </div>
      </div>

      <div v-if="char.equipment.length">
        <h4 class="font-semibold text-stone-300 mb-1">{{ t('equipment.title') }}</h4>
        <p class="text-stone-400 text-sm">{{ char.equipment.join(', ') }}</p>
      </div>
    </div>

    <!-- Features & Traits -->
    <div v-if="char.featuresTraits.length" class="bg-stone-800 border border-stone-700 rounded-lg p-4 mb-4">
      <h3 class="font-semibold text-stone-300 mb-2">{{ t('class.features') }}</h3>
      <div class="space-y-1">
        <div v-for="(feat, i) in char.featuresTraits" :key="i" class="text-sm text-stone-400">
          {{ feat }}
        </div>
      </div>
    </div>

    <!-- Export Buttons -->
    <div class="flex flex-wrap gap-3 mt-6" role="group" :aria-label="t('review.export')">
      <button @click="exportPdf" :disabled="exporting"
        class="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-stone-900 font-semibold rounded-lg transition-colors disabled:opacity-50 cursor-pointer">
        {{ exporting ? t('common.loading') : t('review.exportPdf') }}
      </button>
      <button @click="downloadJson"
        class="px-6 py-2 bg-stone-700 hover:bg-stone-600 text-stone-200 rounded-lg transition-colors cursor-pointer">
        {{ t('review.exportJson') }}
      </button>
      <button @click="saveChar"
        class="px-6 py-2 bg-green-700 hover:bg-green-600 text-stone-200 rounded-lg transition-colors cursor-pointer">
        {{ t('review.save') }}
      </button>
      <button @click="printSheet"
        class="px-6 py-2 bg-stone-700 hover:bg-stone-600 text-stone-200 rounded-lg transition-colors cursor-pointer">
        {{ t('review.print') }}
      </button>
      <input ref="fileInput" type="file" accept=".json" class="hidden" @change="handleImport" aria-hidden="true" tabindex="-1" />
      <button @click="triggerImport"
        class="px-6 py-2 bg-stone-700 hover:bg-stone-600 text-stone-200 rounded-lg transition-colors cursor-pointer">
        {{ t('review.importJson') }}
      </button>
    </div>

    <!-- Brancalonia promo -->
    <div v-if="char.variant === 'brancalonia'" class="mt-6 bg-stone-800/50 border border-amber-700/20 rounded-lg p-4 text-center">
      <p class="text-stone-400 text-sm">
        {{ t('variant.brancaloniaPromo') }}
        <a
          href="https://www.drivethrurpg.com/en/browse?affiliate_id=2960765&keyword=brancalonia"
          target="_blank"
          rel="noopener noreferrer"
          class="text-amber-400 hover:text-amber-300 underline ml-1"
        >
          DriveThruRPG
        </a>
      </p>
    </div>

    <!-- Apocalisse promo -->
    <div v-if="char.variant === 'apocalisse'" class="mt-6 bg-stone-800/50 border border-red-700/20 rounded-lg p-4 text-center">
      <p class="text-stone-400 text-sm">
        {{ t('variant.apocalissePromo') }}
        <a
          href="https://www.drivethrurpg.com/en/publisher/9086/acheron-games/category/44511/apocalisse?affiliate_id=2960765"
          target="_blank"
          rel="noopener noreferrer"
          class="text-amber-400 hover:text-amber-300 underline ml-1"
        >
          DriveThruRPG
        </a>
      </p>
    </div>
  </section>
</template>
