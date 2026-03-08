import { defineStore } from 'pinia'
import { ref } from 'vue'

export type GameVariant = 'dnd5e' | 'brancalonia' | 'apocalisse'

export const useAppStore = defineStore('app', () => {
  const locale = ref<string>(navigator.language.startsWith('it') ? 'it' : 'en')
  const currentStep = ref(0)
  const totalSteps = ref(9)

  function setLocale(lang: string) {
    locale.value = lang
  }

  function setStep(step: number) {
    currentStep.value = step
  }

  function nextStep() {
    if (currentStep.value < totalSteps.value - 1) {
      currentStep.value++
    }
  }

  function prevStep() {
    if (currentStep.value > 0) {
      currentStep.value--
    }
  }

  function resetSteps() {
    currentStep.value = 0
  }

  return { locale, currentStep, totalSteps, setLocale, setStep, nextStep, prevStep, resetSteps }
}, {
  persist: {
    pick: ['locale'],
  },
})
