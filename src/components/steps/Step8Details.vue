<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCharacterStore } from '@/stores/character'
import { totalHp } from '@/utils/calculations'
import VariantPromo from '@/components/shared/VariantPromo.vue'

const { t } = useI18n()
const characterStore = useCharacterStore()

const maxLevel = computed(() => characterStore.character.variant === 'brancalonia' ? 6 : 20)

const alignments = [
  'lg', 'ng', 'cg', 'ln', 'tn', 'cn', 'le', 'ne', 'ce'
]

// Calculate HP when level changes
function updateLevel() {
  const conMod = characterStore.abilityModifiers.con
  characterStore.character.maxHp = totalHp(characterStore.character.hitDie, conMod, characterStore.character.level)
  characterStore.character.currentHp = characterStore.character.maxHp
}

// Set initial HP
updateLevel()
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-amber-500 mb-6">{{ t('details.title') }}</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-semibold text-stone-300 mb-1">{{ t('details.name') }}</label>
        <input v-model="characterStore.character.name" type="text"
          class="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-stone-200 focus:border-amber-500 focus:outline-none" />
      </div>

      <div>
        <label class="block text-sm font-semibold text-stone-300 mb-1">{{ t('details.playerName') }}</label>
        <input v-model="characterStore.character.playerName" type="text"
          class="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-stone-200 focus:border-amber-500 focus:outline-none" />
      </div>

      <div>
        <label class="block text-sm font-semibold text-stone-300 mb-1">{{ t('common.level') }}</label>
        <input v-model.number="characterStore.character.level" type="number" min="1" :max="maxLevel"
          @change="updateLevel"
          class="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-stone-200 focus:border-amber-500 focus:outline-none" />
      </div>

      <div>
        <label class="block text-sm font-semibold text-stone-300 mb-1">{{ t('details.alignment') }}</label>
        <select v-model="characterStore.character.alignment"
          class="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-stone-200 focus:border-amber-500 focus:outline-none">
          <option value="">--</option>
          <option v-for="a in alignments" :key="a" :value="a">{{ t(`alignments.${a}`) }}</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-semibold text-stone-300 mb-1">{{ t('details.age') }}</label>
        <input v-model="characterStore.character.age" type="text"
          class="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-stone-200 focus:border-amber-500 focus:outline-none" />
      </div>

      <div>
        <label class="block text-sm font-semibold text-stone-300 mb-1">{{ t('details.height') }}</label>
        <input v-model="characterStore.character.height" type="text"
          class="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-stone-200 focus:border-amber-500 focus:outline-none" />
      </div>

      <div>
        <label class="block text-sm font-semibold text-stone-300 mb-1">{{ t('details.weight') }}</label>
        <input v-model="characterStore.character.weight" type="text"
          class="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-stone-200 focus:border-amber-500 focus:outline-none" />
      </div>

      <div>
        <label class="block text-sm font-semibold text-stone-300 mb-1">{{ t('details.eyes') }}</label>
        <input v-model="characterStore.character.eyes" type="text"
          class="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-stone-200 focus:border-amber-500 focus:outline-none" />
      </div>

      <div>
        <label class="block text-sm font-semibold text-stone-300 mb-1">{{ t('details.hair') }}</label>
        <input v-model="characterStore.character.hair" type="text"
          class="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-stone-200 focus:border-amber-500 focus:outline-none" />
      </div>

      <div>
        <label class="block text-sm font-semibold text-stone-300 mb-1">{{ t('details.skin') }}</label>
        <input v-model="characterStore.character.skin" type="text"
          class="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-stone-200 focus:border-amber-500 focus:outline-none" />
      </div>
    </div>

    <div class="mt-6">
      <label class="block text-sm font-semibold text-stone-300 mb-1">{{ t('details.backstory') }}</label>
      <textarea v-model="characterStore.character.backstory" rows="5"
        class="w-full bg-stone-800 border border-stone-700 rounded-lg p-3 text-stone-200 text-sm focus:border-amber-500 focus:outline-none" />
    </div>

    <!-- HP Summary -->
    <div class="mt-6 bg-stone-800 border border-stone-700 rounded-lg p-4">
      <h3 class="font-semibold text-stone-300 mb-2">{{ t('review.hp') }}</h3>
      <div class="flex gap-6 text-sm">
        <div>
          <span class="text-stone-400">Max HP:</span>
          <span class="text-amber-400 font-bold ml-1">{{ characterStore.character.maxHp }}</span>
        </div>
        <div>
          <span class="text-stone-400">Hit Die:</span>
          <span class="text-stone-200 ml-1">{{ characterStore.character.level }}d{{ characterStore.character.hitDie }}</span>
        </div>
      </div>
    </div>

    <VariantPromo :variant="characterStore.character.variant" />
  </div>
</template>
