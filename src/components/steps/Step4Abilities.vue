<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCharacterStore } from '@/stores/character'
import type { AbilityScores } from '@/stores/character'
import { rollAbilityScores, STANDARD_ARRAY, POINT_BUY_COSTS, pointBuyRemaining } from '@/utils/diceRoller'
import { modifier, formatModifier } from '@/utils/calculations'
import VariantPromo from '@/components/shared/VariantPromo.vue'

const { t } = useI18n()
const characterStore = useCharacterStore()

type Method = 'standard' | 'pointbuy' | 'roll'
const method = ref<Method>('standard')
const abilities: (keyof AbilityScores)[] = ['str', 'dex', 'con', 'int', 'wis', 'cha']
const rolledScores = ref<number[]>([])
const assignedRolls = ref<Record<keyof AbilityScores, number | null>>({
  str: null, dex: null, con: null, int: null, wis: null, cha: null,
})

// Standard Array
const standardAssignment = ref<Record<keyof AbilityScores, number | null>>({
  str: null, dex: null, con: null, int: null, wis: null, cha: null,
})
const availableStandard = computed(() => {
  const used = Object.values(standardAssignment.value).filter(v => v !== null)
  return STANDARD_ARRAY.filter(v => {
    const usedCount = used.filter(u => u === v).length
    const totalCount = STANDARD_ARRAY.filter(s => s === v).length
    return usedCount < totalCount
  })
})

function setStandardScore(ability: keyof AbilityScores, value: number | null) {
  standardAssignment.value[ability] = value
  if (value !== null) {
    characterStore.character.abilityScores[ability] = value
  }
}

// Point Buy
const pointBuyScores = ref<Record<keyof AbilityScores, number>>({
  str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8,
})
const remaining = computed(() => pointBuyRemaining(Object.values(pointBuyScores.value)))

function adjustPointBuy(ability: keyof AbilityScores, delta: number) {
  const newVal = pointBuyScores.value[ability] + delta
  if (newVal < 8 || newVal > 15) return
  const oldCost = POINT_BUY_COSTS[pointBuyScores.value[ability]] ?? 0
  const newCost = POINT_BUY_COSTS[newVal] ?? 0
  if (remaining.value - (newCost - oldCost) < 0) return
  pointBuyScores.value[ability] = newVal
  characterStore.character.abilityScores[ability] = newVal
}

// Roll
function doRoll() {
  const result = rollAbilityScores()
  rolledScores.value = result.totals
  assignedRolls.value = { str: null, dex: null, con: null, int: null, wis: null, cha: null }
}

const availableRolls = computed(() => {
  const used = Object.values(assignedRolls.value).filter(v => v !== null)
  return rolledScores.value.filter(v => {
    const usedCount = used.filter(u => u === v).length
    const totalCount = rolledScores.value.filter(s => s === v).length
    return usedCount < totalCount
  })
})

function assignRoll(ability: keyof AbilityScores, value: number | null) {
  assignedRolls.value[ability] = value
  if (value !== null) {
    characterStore.character.abilityScores[ability] = value
  }
}

function totalScore(ability: keyof AbilityScores): number {
  return characterStore.totalAbilityScore(ability)
}

function setMethod(m: Method) {
  method.value = m
  if (m === 'pointbuy') {
    for (const a of abilities) {
      characterStore.character.abilityScores[a] = pointBuyScores.value[a]
    }
  }
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-amber-500 mb-6">{{ t('abilities.title') }}</h2>

    <!-- Method Selection -->
    <div class="flex gap-2 mb-6">
      <button
        v-for="m in (['standard', 'pointbuy', 'roll'] as Method[])"
        :key="m"
        @click="setMethod(m)"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
        :class="method === m ? 'bg-amber-600 text-stone-900' : 'bg-stone-700 text-stone-300 hover:bg-stone-600'"
      >
        {{ t(`abilities.${m === 'pointbuy' ? 'pointBuy' : m === 'standard' ? 'standardArray' : 'roll'}`) }}
      </button>
    </div>

    <!-- Point Buy remaining -->
    <div v-if="method === 'pointbuy'" class="mb-4 text-sm font-medium"
      :class="remaining >= 0 ? 'text-green-400' : 'text-red-400'">
      {{ t('abilities.pointsRemaining', { points: remaining }) }}
    </div>

    <!-- Roll button -->
    <div v-if="method === 'roll'" class="mb-4 flex gap-3 items-center">
      <button
        @click="doRoll"
        class="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-900 rounded-lg font-medium transition-colors cursor-pointer"
      >{{ t('abilities.rollDice') }}</button>
      <div v-if="rolledScores.length" class="flex gap-2">
        <span v-for="(score, i) in rolledScores" :key="i"
          class="px-2 py-1 bg-stone-700 rounded text-sm text-amber-400 font-bold">
          {{ score }}
        </span>
      </div>
    </div>

    <!-- Ability Score Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="ability in abilities"
        :key="ability"
        class="bg-stone-800 border border-stone-700 rounded-lg p-4"
      >
        <h4 class="font-bold text-amber-400 text-sm uppercase mb-3">{{ t(`abilities.${ability}`) }}</h4>

        <!-- Standard Array -->
        <div v-if="method === 'standard'">
          <select
            :value="standardAssignment[ability]"
            @change="setStandardScore(ability, Number(($event.target as HTMLSelectElement).value) || null)"
            class="w-full bg-stone-700 text-stone-200 rounded px-2 py-1 text-sm"
          >
            <option :value="null">--</option>
            <option v-for="v in availableStandard" :key="v" :value="v"
              :selected="standardAssignment[ability] === v">{{ v }}</option>
            <option v-if="standardAssignment[ability] !== null" :value="standardAssignment[ability]">
              {{ standardAssignment[ability] }} (current)
            </option>
          </select>
        </div>

        <!-- Point Buy -->
        <div v-else-if="method === 'pointbuy'" class="flex items-center gap-3">
          <button @click="adjustPointBuy(ability, -1)"
            class="w-8 h-8 bg-stone-700 hover:bg-stone-600 rounded text-stone-300 font-bold cursor-pointer">-</button>
          <span class="text-xl font-bold text-stone-200 w-8 text-center">{{ pointBuyScores[ability] }}</span>
          <button @click="adjustPointBuy(ability, 1)"
            class="w-8 h-8 bg-stone-700 hover:bg-stone-600 rounded text-stone-300 font-bold cursor-pointer">+</button>
          <span class="text-xs text-stone-500">({{ POINT_BUY_COSTS[pointBuyScores[ability]] ?? 0 }} pts)</span>
        </div>

        <!-- Roll Assignment -->
        <div v-else-if="method === 'roll'">
          <select
            :value="assignedRolls[ability]"
            @change="assignRoll(ability, Number(($event.target as HTMLSelectElement).value) || null)"
            class="w-full bg-stone-700 text-stone-200 rounded px-2 py-1 text-sm"
          >
            <option :value="null">--</option>
            <option v-for="v in availableRolls" :key="v" :value="v">{{ v }}</option>
            <option v-if="assignedRolls[ability] !== null" :value="assignedRolls[ability]">
              {{ assignedRolls[ability] }} (current)
            </option>
          </select>
        </div>

        <!-- Calculated Values -->
        <div class="mt-3 flex items-center justify-between text-xs text-stone-400">
          <div>
            <span v-if="(characterStore.character.racialBonuses[ability] || 0) !== 0" class="text-green-400">
              {{ t('abilities.racialBonus') }}: {{ formatModifier(characterStore.character.racialBonuses[ability] || 0) }}
            </span>
          </div>
          <div class="text-right">
            <div class="text-stone-300">{{ t('abilities.total') }}: <strong class="text-lg text-amber-400">{{ totalScore(ability) }}</strong></div>
            <div>{{ t('abilities.modifier') }}: <strong>{{ formatModifier(modifier(totalScore(ability))) }}</strong></div>
          </div>
        </div>
      </div>
    </div>

    <VariantPromo :variant="characterStore.character.variant" />
  </div>
</template>
