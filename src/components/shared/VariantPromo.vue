<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { GameVariant } from '@/stores/app'

const props = defineProps<{
  variant: GameVariant
}>()

const { t } = useI18n()

const links: Record<string, string> = {
  brancalonia: 'https://www.drivethrurpg.com/en/browse?affiliate_id=2960765&keyword=brancalonia',
  apocalisse: 'https://www.drivethrurpg.com/en/publisher/9086/acheron-games/category/44511/apocalisse?affiliate_id=2960765',
}
</script>

<template>
  <div
    v-if="variant === 'brancalonia' || variant === 'apocalisse'"
    :class="[
      'mt-6 bg-stone-800/50 border rounded-lg p-4 text-center',
      variant === 'brancalonia' ? 'border-emerald-700/20' : 'border-red-700/20'
    ]"
  >
    <p class="text-stone-400 text-sm">
      {{ t(`variant.${variant}Promo`) }}
      <a
        :href="links[variant]"
        target="_blank"
        rel="noopener noreferrer"
        :class="[
          'hover:underline ml-1',
          variant === 'brancalonia' ? 'text-emerald-400 hover:text-emerald-300' : 'text-red-400 hover:text-red-300'
        ]"
      >
        DriveThruRPG
      </a>
    </p>
  </div>
</template>
