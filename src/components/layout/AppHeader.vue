<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from './LanguageSwitcher.vue'
import ThemeToggle from './ThemeToggle.vue'

const { t } = useI18n()
const mobileOpen = ref(false)

function closeMobile() {
  mobileOpen.value = false
}
</script>

<template>
  <header class="bg-stone-800 border-b border-amber-700/30 shadow-lg" role="banner">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <router-link to="/" class="flex items-center gap-3 no-underline" :aria-label="t('app.title')">
        <span class="text-3xl" aria-hidden="true">&#x2694;&#xFE0F;</span>
        <div>
          <h1 class="text-xl font-bold text-amber-500 leading-tight font-gothic">{{ t('app.title') }}</h1>
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
          to="/"
          class="text-stone-300 hover:text-amber-400 transition-colors text-sm"
        >{{ t('nav.newCharacter') }}</router-link>
        <router-link
          to="/characters"
          class="text-stone-300 hover:text-amber-400 transition-colors text-sm"
        >{{ t('nav.characters') }}</router-link>
        <ThemeToggle />
        <LanguageSwitcher />
      </nav>
    </div>

    <!-- Mobile nav -->
    <nav
      v-if="mobileOpen"
      class="sm:hidden border-t border-stone-700 px-4 py-3 flex flex-col gap-3"
      role="navigation"
      :aria-label="t('nav.home')"
    >
      <router-link to="/" @click="closeMobile" class="text-stone-300 hover:text-amber-400 text-sm no-underline">
        {{ t('nav.newCharacter') }}
      </router-link>
      <router-link to="/characters" @click="closeMobile" class="text-stone-300 hover:text-amber-400 text-sm no-underline">
        {{ t('nav.characters') }}
      </router-link>
      <div class="flex items-center gap-3">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
    </nav>
  </header>
</template>
