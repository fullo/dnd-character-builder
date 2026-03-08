<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useCharacterStore } from '@/stores/character'
import { useAppStore } from '@/stores/app'
import LanguageSwitcher from './LanguageSwitcher.vue'

const { t } = useI18n()
const router = useRouter()
const characterStore = useCharacterStore()
const appStore = useAppStore()
const fileInput = ref<HTMLInputElement | null>(null)
const mobileOpen = ref(false)

function triggerImport() {
  mobileOpen.value = false
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
    } catch (err) {
      const msg = (err as Error).message
      if (msg.startsWith('VALIDATION:')) {
        const codes = msg.replace('VALIDATION:', '').split(',')
        alert(codes.map(c => t(`import.${c}`)).join('\n'))
      } else {
        alert(t(`import.${msg}`, t('import.unknownError')))
      }
    }
  }
  reader.readAsText(file)
  if (fileInput.value) fileInput.value.value = ''
}

function navTo(path: string) {
  mobileOpen.value = false
  router.push(path)
}
</script>

<template>
  <header class="bg-stone-800 border-b border-amber-700/30 shadow-lg" role="banner">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <router-link to="/" class="flex items-center gap-3 no-underline" :aria-label="t('app.title')">
        <span class="text-3xl" aria-hidden="true">&#x2694;&#xFE0F;</span>
        <div>
          <h1 class="text-xl font-bold text-amber-500 leading-tight font-gothic">{{ t('app.title') }}</h1>
          <p class="text-xs text-stone-400">{{ t('app.subtitle') }}</p>
        </div>
      </router-link>

      <!-- Mobile menu button -->
      <button
        class="sm:hidden p-2 text-stone-300 hover:text-amber-400 cursor-pointer"
        @click="mobileOpen = !mobileOpen"
        :aria-expanded="mobileOpen"
        aria-controls="main-nav"
        :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Desktop nav -->
      <nav id="main-nav" class="hidden sm:flex items-center gap-4" role="navigation" :aria-label="t('nav.home')">
        <router-link
          to="/builder"
          class="text-stone-300 hover:text-amber-400 transition-colors text-sm"
        >{{ t('nav.newCharacter') }}</router-link>
        <button
          @click="triggerImport"
          class="text-stone-300 hover:text-amber-400 transition-colors text-sm bg-transparent border-none cursor-pointer p-0"
        >{{ t('nav.importCharacter') }}</button>
        <router-link
          to="/characters"
          class="text-stone-300 hover:text-amber-400 transition-colors text-sm"
        >{{ t('nav.characters') }}</router-link>
        <LanguageSwitcher />
      </nav>

      <input ref="fileInput" type="file" accept=".json" class="hidden" @change="handleImport" aria-hidden="true" />
    </div>

    <!-- Mobile nav -->
    <nav
      v-if="mobileOpen"
      class="sm:hidden border-t border-stone-700 px-4 py-3 flex flex-col gap-3"
      role="navigation"
      :aria-label="t('nav.home')"
    >
      <button @click="navTo('/builder')" class="text-left text-stone-300 hover:text-amber-400 text-sm bg-transparent border-none cursor-pointer p-0">
        {{ t('nav.newCharacter') }}
      </button>
      <button @click="triggerImport" class="text-left text-stone-300 hover:text-amber-400 text-sm bg-transparent border-none cursor-pointer p-0">
        {{ t('nav.importCharacter') }}
      </button>
      <button @click="navTo('/characters')" class="text-left text-stone-300 hover:text-amber-400 text-sm bg-transparent border-none cursor-pointer p-0">
        {{ t('nav.characters') }}
      </button>
      <LanguageSwitcher />
    </nav>
  </header>
</template>
