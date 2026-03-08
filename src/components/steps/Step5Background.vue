<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCharacterStore } from '@/stores/character'
import { getBackgrounds } from '@/data'
import type { Background } from '@/data/dnd5e/backgrounds'
import VariantPromo from '@/components/shared/VariantPromo.vue'

const { t } = useI18n()
const characterStore = useCharacterStore()

const backgrounds = computed(() => getBackgrounds(characterStore.character.variant))
const selectedBg = ref<Background | null>(null)

function selectBackground(bg: Background) {
  selectedBg.value = bg
  characterStore.character.background = bg.id
  // Add background skill proficiencies (don't duplicate)
  for (const skill of bg.skillProficiencies) {
    if (!characterStore.character.skillProficiencies.includes(skill)) {
      characterStore.character.skillProficiencies.push(skill)
    }
  }
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-amber-500 mb-6">{{ t('background.title') }}</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <button
        v-for="bg in backgrounds"
        :key="bg.id"
        @click="selectBackground(bg)"
        class="bg-stone-800 border-2 rounded-lg p-4 text-left transition-all cursor-pointer"
        :class="characterStore.character.background === bg.id ? 'border-amber-500' : 'border-stone-700 hover:border-stone-600'"
      >
        <h3 class="font-bold text-amber-400">{{ bg.name }}</h3>
        <p class="text-xs text-stone-500 mt-1">{{ bg.skillProficiencies.join(', ') }}</p>
      </button>
    </div>

    <!-- Background Details -->
    <div v-if="selectedBg" class="mt-6 bg-stone-800 border border-stone-700 rounded-lg p-6">
      <h3 class="text-xl font-bold text-amber-400 mb-3">{{ selectedBg.name }}</h3>
      <div class="space-y-3 text-sm">
        <div>
          <h4 class="font-semibold text-stone-300">{{ t('background.skillProficiencies') }}</h4>
          <p class="text-stone-400">{{ selectedBg.skillProficiencies.join(', ') }}</p>
        </div>
        <div v-if="selectedBg.toolProficiencies.length">
          <h4 class="font-semibold text-stone-300">Strumenti</h4>
          <p class="text-stone-400">{{ selectedBg.toolProficiencies.join(', ') }}</p>
        </div>
        <div v-if="selectedBg.languages > 0">
          <h4 class="font-semibold text-stone-300">{{ t('race.languages') }}</h4>
          <p class="text-stone-400">{{ selectedBg.languages }} {{ t('background.languageChoices') }}</p>
        </div>
        <div>
          <h4 class="font-semibold text-stone-300">{{ selectedBg.feature.name }}</h4>
          <p class="text-stone-400">{{ selectedBg.feature.description }}</p>
        </div>
      </div>
    </div>

    <!-- Personality -->
    <div class="mt-6 space-y-4">
      <div>
        <label class="block text-sm font-semibold text-stone-300 mb-1">{{ t('background.personalityTraits') }}</label>
        <textarea v-model="characterStore.character.personalityTraits" rows="2"
          class="w-full bg-stone-800 border border-stone-700 rounded-lg p-3 text-stone-200 text-sm focus:border-amber-500 focus:outline-none" />
      </div>
      <div>
        <label class="block text-sm font-semibold text-stone-300 mb-1">{{ t('background.ideals') }}</label>
        <textarea v-model="characterStore.character.ideals" rows="2"
          class="w-full bg-stone-800 border border-stone-700 rounded-lg p-3 text-stone-200 text-sm focus:border-amber-500 focus:outline-none" />
      </div>
      <div>
        <label class="block text-sm font-semibold text-stone-300 mb-1">{{ t('background.bonds') }}</label>
        <textarea v-model="characterStore.character.bonds" rows="2"
          class="w-full bg-stone-800 border border-stone-700 rounded-lg p-3 text-stone-200 text-sm focus:border-amber-500 focus:outline-none" />
      </div>
      <div>
        <label class="block text-sm font-semibold text-stone-300 mb-1">{{ t('background.flaws') }}</label>
        <textarea v-model="characterStore.character.flaws" rows="2"
          class="w-full bg-stone-800 border border-stone-700 rounded-lg p-3 text-stone-200 text-sm focus:border-amber-500 focus:outline-none" />
      </div>
    </div>

    <VariantPromo :variant="characterStore.character.variant" />
  </div>
</template>
