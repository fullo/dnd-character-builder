<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="max-w-2xl mx-auto py-12" aria-labelledby="privacy-heading">
    <h2 id="privacy-heading" class="text-3xl font-bold text-amber-500 mb-8">{{ t('privacy.title') }}</h2>

    <div class="space-y-6 text-stone-300">
      <div class="bg-stone-800 border border-stone-700 rounded-lg p-6">
        <p class="mb-4">{{ t('privacy.noData') }}</p>
        <p class="mb-4">{{ t('privacy.localStorage') }}</p>
        <p class="mb-4">{{ t('privacy.noCookies') }}</p>
        <p>{{ t('privacy.noAccount') }}</p>
      </div>
    </div>

    <div class="mt-8">
      <router-link to="/" class="text-amber-400 hover:text-amber-300 transition-colors">
        &larr; {{ t('nav.home') }}
      </router-link>
    </div>
  </section>
</template>
