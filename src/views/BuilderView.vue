<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores/app'
import StepNavigation from '@/components/layout/StepNavigation.vue'

const { t } = useI18n()
const appStore = useAppStore()

// WSG 3.8: Defer loading of non-critical resources — lazy load wizard steps
const steps = [
  defineAsyncComponent(() => import('@/components/steps/Step1Variant.vue')),
  defineAsyncComponent(() => import('@/components/steps/Step2Race.vue')),
  defineAsyncComponent(() => import('@/components/steps/Step3Class.vue')),
  defineAsyncComponent(() => import('@/components/steps/Step4Abilities.vue')),
  defineAsyncComponent(() => import('@/components/steps/Step5Background.vue')),
  defineAsyncComponent(() => import('@/components/steps/Step6Equipment.vue')),
  defineAsyncComponent(() => import('@/components/steps/Step7Spells.vue')),
  defineAsyncComponent(() => import('@/components/steps/Step8Details.vue')),
  defineAsyncComponent(() => import('@/components/steps/Step9Review.vue')),
]
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <StepNavigation />

    <KeepAlive>
      <component :is="steps[appStore.currentStep]" />
    </KeepAlive>

    <div class="flex justify-between mt-8">
      <button
        v-if="appStore.currentStep > 0"
        @click="appStore.prevStep()"
        class="px-6 py-2 bg-stone-700 hover:bg-stone-600 text-stone-200 rounded-lg transition-colors cursor-pointer"
      >
        {{ t('common.back') }}
      </button>
      <div v-else></div>

      <button
        v-if="appStore.currentStep < appStore.totalSteps - 1"
        @click="appStore.nextStep()"
        class="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-stone-900 font-semibold rounded-lg transition-colors cursor-pointer"
      >
        {{ t('common.next') }}
      </button>
    </div>
  </div>
</template>
