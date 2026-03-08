import { createI18n } from 'vue-i18n'
import it from './locales/it.json'
import en from './locales/en.json'

const i18n = createI18n({
  legacy: false,
  locale: navigator.language.startsWith('it') ? 'it' : 'en',
  fallbackLocale: 'en',
  messages: { it, en },
})

export default i18n
