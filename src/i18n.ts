import { createI18n } from 'vue-i18n'
import messages from './locales'
import { getLanguagePreference, saveLanguagePreference } from './utils/preferences'
import { updateSeoForLanguage } from './utils/seo'

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
  
  // Direct approach to change the locale that works with Vue I18n 9 in Composition API
  // This bypasses TypeScript errors while still updating the locale correctly
  document.documentElement.lang = lang
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  
  // Force Vue I18n to recognize the language change
  // This is a workaround for TypeScript type issues
  const compositionInstance = i18n as any
  compositionInstance.global.locale.value = lang
  
  // Update SEO meta tags for the new language
  updateSeoForLanguage(lang)
  
  // Dispatch a custom event that components can listen for to update their translations
  window.dispatchEvent(new Event('language-changed'))
}

// Initialize SEO meta tags with current language on app load
if (typeof window !== 'undefined') {
  // Fix: Access current locale properly
  const currentLocale = i18n.global.locale as unknown as string
  updateSeoForLanguage(currentLocale)
}

export default i18n
