<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores/app'
import StepNavigation from '@/components/layout/StepNavigation.vue'
import Step1Variant from '@/components/steps/Step1Variant.vue'
import Step2Race from '@/components/steps/Step2Race.vue'
import Step3Class from '@/components/steps/Step3Class.vue'
import Step4Abilities from '@/components/steps/Step4Abilities.vue'
import Step5Background from '@/components/steps/Step5Background.vue'
import Step6Equipment from '@/components/steps/Step6Equipment.vue'
import Step7Spells from '@/components/steps/Step7Spells.vue'
import Step8Details from '@/components/steps/Step8Details.vue'
import Step9Review from '@/components/steps/Step9Review.vue'

const { t } = useI18n()
const appStore = useAppStore()

const steps = [
  Step1Variant,
  Step2Race,
  Step3Class,
  Step4Abilities,
  Step5Background,
  Step6Equipment,
  Step7Spells,
  Step8Details,
  Step9Review,
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
