<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useCharacterStore } from '@/stores/character'
import { useAppStore } from '@/stores/app'
import { generateRandomCharacter } from '@/utils/randomCharacter'

const { t } = useI18n()
const router = useRouter()
const characterStore = useCharacterStore()
const appStore = useAppStore()
const fileInput = ref<HTMLInputElement | null>(null)

function randomChar(variant: 'dnd5e' | 'brancalonia') {
  const char = generateRandomCharacter(variant)
  characterStore.character = char
  appStore.setStep(8)
  router.push('/builder')
}

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
      appStore.setStep(8)
      router.push('/builder')
    } catch {
      alert(t('review.importError'))
    }
  }
  reader.readAsText(file)
  if (fileInput.value) fileInput.value.value = ''
}
</script>

<template>
  <section class="flex flex-col items-center py-12" aria-labelledby="home-heading">
    <div class="text-center max-w-2xl">
      <h2 id="home-heading" class="text-4xl font-bold text-amber-500 mb-4">{{ t('home.welcome') }}</h2>
      <p class="text-stone-400 text-lg mb-8">{{ t('home.description') }}</p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link
          to="/builder"
          class="inline-block bg-amber-600 hover:bg-amber-500 text-stone-900 font-bold px-8 py-3 rounded-lg text-lg transition-colors no-underline"
          role="button"
        >
          {{ t('home.startButton') }}
        </router-link>
      </div>

      <div class="mt-6 flex flex-col sm:flex-row gap-3 justify-center" role="group" :aria-label="t('home.randomButton')">
        <button
          @click="randomChar('dnd5e')"
          class="px-6 py-2 bg-stone-700 hover:bg-stone-600 text-stone-200 rounded-lg transition-colors cursor-pointer border border-stone-600"
        >
          <span aria-hidden="true">🎲</span> {{ t('home.randomDnd5e') }}
        </button>
        <button
          @click="randomChar('brancalonia')"
          class="px-6 py-2 bg-stone-700 hover:bg-stone-600 text-stone-200 rounded-lg transition-colors cursor-pointer border border-stone-600"
        >
          <span aria-hidden="true">🎲</span> {{ t('home.randomBrancalonia') }}
        </button>
      </div>

      <div class="mt-4">
        <input ref="fileInput" type="file" accept=".json" class="hidden" @change="handleImport" aria-hidden="true" tabindex="-1" />
        <button
          @click="triggerImport"
          class="px-6 py-2 bg-stone-700 hover:bg-stone-600 text-stone-200 rounded-lg transition-colors cursor-pointer border border-stone-600"
          :aria-label="t('home.importJson')"
        >
          <span aria-hidden="true">📂</span> {{ t('home.importJson') }}
        </button>
      </div>
    </div>

    <section
      v-if="characterStore.savedCharacters.length > 0"
      class="mt-12 w-full max-w-2xl"
      aria-labelledby="saved-heading"
    >
      <h3 id="saved-heading" class="text-xl font-semibold text-stone-300 mb-4">{{ t('home.savedCharacters') }}</h3>
      <ul class="space-y-2" role="list">
        <li
          v-for="char in characterStore.savedCharacters"
          :key="char.id"
        >
          <button
            class="w-full bg-stone-800 rounded-lg p-4 flex items-center justify-between border border-stone-700 hover:border-amber-700/50 transition-colors cursor-pointer text-left"
            @click="characterStore.loadCharacter(char.id); $router.push('/builder')"
            :aria-label="`${char.name || t('common.unnamed')} - ${char.race} ${char.className} Lv.${char.level}`"
          >
            <div>
              <span class="font-medium text-amber-400">{{ char.name || t('common.unnamed') }}</span>
              <span class="text-stone-500 ml-2">
                {{ char.race }} {{ char.className }} Lv.{{ char.level }}
              </span>
            </div>
            <span class="text-xs text-stone-500 uppercase">{{ char.variant }}</span>
          </button>
        </li>
      </ul>
    </section>
  </section>
</template>
