<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useCharacterStore } from '@/stores/character'

const { t } = useI18n()
const router = useRouter()
const characterStore = useCharacterStore()

function editCharacter(id: string) {
  characterStore.loadCharacter(id)
  router.push('/builder')
}

function removeCharacter(id: string) {
  characterStore.deleteCharacter(id)
}

function downloadJson(id: string) {
  const char = characterStore.savedCharacters.find(c => c.id === id)
  if (!char) return
  const json = JSON.stringify(char, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${char.name || 'character'}.json`
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="max-w-3xl mx-auto py-8">
    <h2 class="text-2xl font-bold text-amber-500 mb-6">{{ t('nav.characters') }}</h2>

    <div v-if="characterStore.savedCharacters.length === 0" class="text-center py-12 text-stone-500">
      <p class="text-lg">{{ t('common.noResults') }}</p>
      <router-link to="/builder" class="text-amber-500 hover:text-amber-400 mt-4 inline-block">
        {{ t('home.startButton') }}
      </router-link>
    </div>

    <div v-else class="space-y-3">
      <div
        v-for="char in characterStore.savedCharacters"
        :key="char.id"
        class="bg-stone-800 rounded-lg p-4 border border-stone-700"
      >
        <div class="flex items-center justify-between">
          <div>
            <span class="font-medium text-amber-400 text-lg">{{ char.name || 'Senza Nome' }}</span>
            <div class="text-stone-400 text-sm mt-1">
              {{ char.race }} {{ char.className }} Lv.{{ char.level }}
              <span class="text-stone-500 ml-2">{{ char.variant === 'brancalonia' ? 'Brancalonia' : 'D&D 5e' }}</span>
            </div>
          </div>
          <div class="flex gap-2">
            <button
              @click="editCharacter(char.id)"
              class="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-stone-900 rounded text-sm font-medium transition-colors cursor-pointer"
            >{{ t('common.select') }}</button>
            <button
              @click="downloadJson(char.id)"
              class="px-3 py-1 bg-stone-700 hover:bg-stone-600 text-stone-200 rounded text-sm transition-colors cursor-pointer"
            >JSON</button>
            <button
              @click="removeCharacter(char.id)"
              class="px-3 py-1 bg-red-800 hover:bg-red-700 text-stone-200 rounded text-sm transition-colors cursor-pointer"
            >{{ t('common.remove') }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
