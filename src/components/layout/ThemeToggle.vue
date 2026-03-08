<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/composables/useTheme'

const { t } = useI18n()
const { theme, effectiveTheme, toggleTheme } = useTheme()
</script>

<template>
  <button
    @click="toggleTheme"
    class="flex items-center justify-center w-8 h-8 rounded bg-stone-700 hover:bg-stone-600 text-stone-200 transition-colors cursor-pointer"
    :aria-label="t('theme.toggle')"
    :title="theme === 'auto' ? t('theme.auto') : theme === 'light' ? t('theme.light') : t('theme.dark')"
  >
    <!-- Sun icon (light mode) -->
    <svg v-if="effectiveTheme === 'light'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="5" stroke-width="2" />
      <path stroke-linecap="round" stroke-width="2"
        d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
    <!-- Moon icon (dark mode) -->
    <svg v-else-if="theme === 'dark'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
    <!-- Auto icon (half circle — system default) -->
    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke-width="2" />
      <path d="M12 3a9 9 0 010 18" fill="currentColor" stroke="none" />
    </svg>
  </button>
</template>
