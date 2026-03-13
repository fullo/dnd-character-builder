<script setup lang="ts">
import { defineAsyncComponent, computed, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores/app'
import { useCharacterStore } from '@/stores/character'
import { preloadVariantData } from '@/data'
import StepNavigation from '@/components/layout/StepNavigation.vue'

const { t } = useI18n()
const appStore = useAppStore()
const characterStore = useCharacterStore()

// WSG 3.8: Preload variant data when builder opens (for returning users past Step 1)
onMounted(() => {
  const variant = characterStore.character.variant
  if (variant) {
    preloadVariantData(variant)
  }
})

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

const stepKeys = ['variant', 'race', 'class', 'abilities', 'background', 'equipment', 'spells', 'details', 'review']

// ─── Step Validation ──────────────────────────────────────────────────────
const validationMessage = ref('')

/** Returns whether the current step has all required data filled in */
const isCurrentStepValid = computed((): boolean => {
  const char = characterStore.character
  switch (appStore.currentStep) {
    case 0: return !!char.variant             // Variant selected
    case 1: return !!char.race                // Race selected
    case 2: return !!char.className           // Class selected
    case 3: return true                       // Abilities always valid (defaults)
    case 4: return !!char.background          // Background selected
    case 5: return true                       // Equipment optional
    case 6: return true                       // Spells optional (non-casters skip)
    case 7: return true                       // Details optional
    default: return true
  }
})

/** Map step index to validation i18n key */
function validationKey(step: number): string {
  switch (step) {
    case 1: return 'validation.selectRace'
    case 2: return 'validation.selectClass'
    case 4: return 'validation.selectBackground'
    default: return 'validation.completeStep'
  }
}

function tryNextStep() {
  if (!isCurrentStepValid.value) {
    validationMessage.value = t(validationKey(appStore.currentStep))
    return
  }
  validationMessage.value = ''
  appStore.nextStep()
}

function goPrevStep() {
  validationMessage.value = ''
  appStore.prevStep()
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <StepNavigation />

    <!-- Live region for screen readers announcing step changes -->
    <div class="sr-only" aria-live="polite" aria-atomic="true">
      {{ t('common.stepProgress', { current: appStore.currentStep + 1, total: appStore.totalSteps }) }}:
      {{ t(`steps.${stepKeys[appStore.currentStep]}`) }}
    </div>

    <KeepAlive>
      <component :is="steps[appStore.currentStep]" />
    </KeepAlive>

    <!-- Validation warning -->
    <div
      v-if="validationMessage"
      class="mt-4 p-3 bg-amber-900/30 border border-amber-700 text-amber-300 rounded-lg text-sm flex items-center gap-2"
      role="alert"
    >
      <span aria-hidden="true">⚠️</span>
      {{ validationMessage }}
    </div>

    <nav class="flex justify-between mt-8" :aria-label="t('common.stepProgress', { current: appStore.currentStep + 1, total: appStore.totalSteps })">
      <button
        v-if="appStore.currentStep > 0"
        @click="goPrevStep"
        class="px-6 py-2 bg-stone-700 hover:bg-stone-600 text-stone-200 rounded-lg transition-colors cursor-pointer"
        :aria-label="`${t('common.back')}: ${t(`steps.${stepKeys[appStore.currentStep - 1]}`)}`"
      >
        {{ t('common.back') }}
      </button>
      <div v-else></div>

      <button
        v-if="appStore.currentStep < appStore.totalSteps - 1"
        @click="tryNextStep"
        class="px-6 py-2 bg-amber-600 text-stone-900 font-semibold rounded-lg transition-colors cursor-pointer"
        :class="isCurrentStepValid ? 'hover:bg-amber-500' : 'opacity-60'"
        :aria-label="`${t('common.next')}: ${t(`steps.${stepKeys[appStore.currentStep + 1]}`)}`"
        :aria-disabled="!isCurrentStepValid"
      >
        {{ t('common.next') }}
      </button>
    </nav>
  </div>
</template>
