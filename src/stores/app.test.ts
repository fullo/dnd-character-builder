import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAppStore } from './app'

describe('useAppStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with step 0 and 9 total steps', () => {
    const store = useAppStore()
    expect(store.currentStep).toBe(0)
    expect(store.totalSteps).toBe(9)
  })

  it('navigates forward through steps', () => {
    const store = useAppStore()
    store.nextStep()
    expect(store.currentStep).toBe(1)
    store.nextStep()
    expect(store.currentStep).toBe(2)
  })

  it('does not exceed max steps', () => {
    const store = useAppStore()
    store.setStep(8) // last step (0-indexed)
    store.nextStep()
    expect(store.currentStep).toBe(8) // stays at 8
  })

  it('navigates backward', () => {
    const store = useAppStore()
    store.setStep(3)
    store.prevStep()
    expect(store.currentStep).toBe(2)
  })

  it('does not go below step 0', () => {
    const store = useAppStore()
    store.prevStep()
    expect(store.currentStep).toBe(0)
  })

  it('resets steps to 0', () => {
    const store = useAppStore()
    store.setStep(5)
    store.resetSteps()
    expect(store.currentStep).toBe(0)
  })

  it('sets locale', () => {
    const store = useAppStore()
    store.setLocale('en')
    expect(store.locale).toBe('en')
    store.setLocale('it')
    expect(store.locale).toBe('it')
  })

  it('sets theme', () => {
    const store = useAppStore()
    store.setTheme('dark')
    expect(store.theme).toBe('dark')
    store.setTheme('light')
    expect(store.theme).toBe('light')
    store.setTheme('auto')
    expect(store.theme).toBe('auto')
  })
})
