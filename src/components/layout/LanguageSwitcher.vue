<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const open = ref(false)

const languages = [
  { code: 'it', label: 'Italiano', flag: 'IT' },
  { code: 'en', label: 'English', flag: 'EN' },
]

function selectLang(code: string) {
  locale.value = code
  open.value = false
}

function handleBlur() {
  // Delay to allow click on dropdown item
  setTimeout(() => { open.value = false }, 150)
}
</script>

<template>
  <div class="relative">
    <button
      @click="open = !open"
      @blur="handleBlur"
      class="flex items-center gap-1 px-2 py-1 rounded bg-stone-700 hover:bg-stone-600 text-sm font-medium text-stone-200 transition-colors cursor-pointer"
      :aria-expanded="open"
      aria-haspopup="listbox"
      :aria-label="locale === 'it' ? 'Cambia lingua' : 'Change language'"
    >
      {{ languages.find(l => l.code === locale)?.flag ?? 'EN' }}
      <svg class="w-3 h-3 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <ul
      v-if="open"
      role="listbox"
      :aria-label="locale === 'it' ? 'Lingue disponibili' : 'Available languages'"
      class="absolute right-0 mt-1 bg-stone-700 border border-stone-600 rounded shadow-lg z-50 min-w-[140px] py-1"
    >
      <li
        v-for="lang in languages"
        :key="lang.code"
        role="option"
        :aria-selected="locale === lang.code"
        @click="selectLang(lang.code)"
        class="px-3 py-1.5 text-sm cursor-pointer transition-colors"
        :class="locale === lang.code ? 'text-amber-400 bg-stone-600' : 'text-stone-200 hover:bg-stone-600'"
      >
        {{ lang.flag }} {{ lang.label }}
      </li>
    </ul>
  </div>
</template>
