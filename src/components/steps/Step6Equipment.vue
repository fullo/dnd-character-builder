<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCharacterStore } from '@/stores/character'
import { getEquipment } from '@/data'
import { useGameTerms } from '@/composables/useGameTerms'

const { t } = useI18n()
const characterStore = useCharacterStore()
const gt = useGameTerms()

const equipment = computed(() => getEquipment(characterStore.character.variant))
const selectedWeapons = ref<string[]>([])
const selectedArmor = ref('')
const hasShield = ref(false)
const customEquipment = ref('')

function toggleWeapon(weaponName: string) {
  const idx = selectedWeapons.value.indexOf(weaponName)
  if (idx >= 0) {
    selectedWeapons.value.splice(idx, 1)
  } else {
    selectedWeapons.value.push(weaponName)
  }
  updateCharacterWeapons()
}

function updateCharacterWeapons() {
  characterStore.character.weapons = selectedWeapons.value.map(name => {
    const wpn = [...(equipment.value?.simpleWeapons || []), ...(equipment.value?.martialWeapons || [])]
      .find(w => w.name === name)
    return {
      name,
      attackBonus: 0,
      damage: wpn?.damage || '',
    }
  })
}

function selectArmor(armorName: string) {
  selectedArmor.value = armorName
  characterStore.character.armor = armorName
}

function toggleShield() {
  hasShield.value = !hasShield.value
  characterStore.character.shield = hasShield.value
}

function addCustomItem() {
  if (customEquipment.value.trim()) {
    characterStore.character.equipment.push(customEquipment.value.trim())
    customEquipment.value = ''
  }
}

function removeItem(idx: number) {
  characterStore.character.equipment.splice(idx, 1)
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-amber-500 mb-6">{{ t('equipment.title') }}</h2>

    <!-- Weapons -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-stone-300 mb-3">{{ t('equipment.weapons') }}</h3>

      <div v-if="equipment?.simpleWeapons?.length" class="mb-4">
        <h4 class="text-sm font-medium text-stone-400 mb-2">{{ t('equipment.simpleWeapons') }}</h4>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="wpn in equipment.simpleWeapons"
            :key="wpn.name"
            @click="toggleWeapon(wpn.name)"
            class="px-3 py-1 rounded text-xs transition-colors cursor-pointer"
            :class="selectedWeapons.includes(wpn.name)
              ? 'bg-amber-600 text-stone-900 font-medium'
              : 'bg-stone-700 text-stone-300 hover:bg-stone-600'"
          >
            {{ gt.weapon(wpn.name) }} ({{ wpn.damage }})
          </button>
        </div>
      </div>

      <div v-if="equipment?.martialWeapons?.length">
        <h4 class="text-sm font-medium text-stone-400 mb-2">{{ t('equipment.martialWeapons') }}</h4>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="wpn in equipment.martialWeapons"
            :key="wpn.name"
            @click="toggleWeapon(wpn.name)"
            class="px-3 py-1 rounded text-xs transition-colors cursor-pointer"
            :class="selectedWeapons.includes(wpn.name)
              ? 'bg-amber-600 text-stone-900 font-medium'
              : 'bg-stone-700 text-stone-300 hover:bg-stone-600'"
          >
            {{ gt.weapon(wpn.name) }} ({{ wpn.damage }})
          </button>
        </div>
      </div>
    </div>

    <!-- Armor -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-stone-300 mb-3">{{ t('equipment.armor') }}</h3>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="arm in equipment?.armor || []"
          :key="arm.name"
          @click="selectArmor(arm.name)"
          class="px-3 py-1 rounded text-xs transition-colors cursor-pointer"
          :class="selectedArmor === arm.name
            ? 'bg-amber-600 text-stone-900 font-medium'
            : 'bg-stone-700 text-stone-300 hover:bg-stone-600'"
        >
          {{ gt.armorName(arm.name) }} ({{ t('review.ac') }} {{ arm.baseAC }})
        </button>
        <button
          @click="toggleShield()"
          class="px-3 py-1 rounded text-xs transition-colors cursor-pointer"
          :class="hasShield ? 'bg-amber-600 text-stone-900 font-medium' : 'bg-stone-700 text-stone-300 hover:bg-stone-600'"
        >
          {{ t('review.shieldBonus') }}
        </button>
      </div>
    </div>

    <!-- Coins -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-stone-300 mb-3">{{ t('equipment.coins') }}</h3>
      <div class="flex gap-4">
        <div v-for="coin in ['gp', 'sp', 'cp'] as const" :key="coin" class="flex items-center gap-1">
          <label class="text-xs text-stone-400 uppercase">{{ coin }}</label>
          <input type="number" v-model.number="characterStore.character.coins[coin]" min="0"
            class="w-16 bg-stone-700 text-stone-200 rounded px-2 py-1 text-sm text-center" />
        </div>
      </div>
    </div>

    <!-- Custom Equipment -->
    <div>
      <h3 class="text-lg font-semibold text-stone-300 mb-3">{{ t('equipment.other') }}</h3>
      <div class="flex gap-2 mb-3">
        <input v-model="customEquipment" @keyup.enter="addCustomItem"
          class="flex-1 bg-stone-700 text-stone-200 rounded px-3 py-1 text-sm" :placeholder="t('equipment.addItem')" />
        <button @click="addCustomItem"
          class="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-stone-900 rounded text-sm font-medium cursor-pointer">+</button>
      </div>
      <div class="flex flex-wrap gap-2">
        <span v-for="(item, idx) in characterStore.character.equipment" :key="idx"
          class="px-2 py-1 bg-stone-700 rounded text-xs text-stone-300 flex items-center gap-1">
          {{ item }}
          <button @click="removeItem(idx)" class="text-stone-500 hover:text-red-400 cursor-pointer">&times;</button>
        </span>
      </div>
    </div>
  </div>
</template>
