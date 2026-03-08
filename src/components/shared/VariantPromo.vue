<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { GameVariant } from '@/stores/app'

const props = defineProps<{
  variant: GameVariant
}>()

const { t } = useI18n()

const links: Record<string, string> = {
  dnd5e: 'https://www.drivethrurpg.com/en/publisher/44/wizards-of-the-coast?affiliate_id=2960765',
  brancalonia: 'https://www.drivethrurpg.com/en/browse?affiliate_id=2960765&keyword=brancalonia',
  apocalisse: 'https://www.drivethrurpg.com/en/publisher/9086/acheron-games/category/44511/apocalisse?affiliate_id=2960765',
}

const amazonLinks: Record<string, string> = {
  dnd5e: 'https://amzn.to/4uwKY7w',
  brancalonia: 'https://amzn.to/4b8f8F3',
  apocalisse: 'https://amzn.to/4cwNjc1',
}

const variantColors: Record<string, { border: string; link: string }> = {
  dnd5e: { border: 'border-amber-700/20', link: 'text-amber-400 hover:text-amber-300' },
  brancalonia: { border: 'border-emerald-700/20', link: 'text-emerald-400 hover:text-emerald-300' },
  apocalisse: { border: 'border-red-700/20', link: 'text-red-400 hover:text-red-300' },
}
</script>

<template>
  <div
    class="mt-6 bg-stone-800/50 border rounded-lg p-4 text-center"
    :class="variantColors[variant]?.border"
  >
    <p class="text-stone-400 text-sm">
      {{ t(`variant.${variant}Promo`) }}
      <a
        :href="links[variant]"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:underline ml-1"
        :class="variantColors[variant]?.link"
      >
        DriveThruRPG
      </a>
      <span class="text-stone-600 mx-1">|</span>
      <a
        :href="amazonLinks[variant]"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:underline"
        :class="variantColors[variant]?.link"
      >
        Amazon
      </a>
    </p>
  </div>
</template>
