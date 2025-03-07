import { createI18n } from 'vue-i18n'
import messages from './locales'
import { getLanguagePreference, saveLanguagePreference } from './utils/preferences'

// Type definition for i18n messages
type MessageSchema = typeof messages.en

const i18n = createI18n<[MessageSchema], 'en' | 'ar'>({
  legacy: false, // you must set `false`, to use Composition API
  locale: getLanguagePreference(), // use stored locale from preferences
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
})

// Function to change language and store preference
export const setLanguage = (lang: 'en' | 'ar') => {
  saveLanguagePreference(lang)
  i18n.global.locale.value = lang
}

export default i18n
