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
  
  // Update i18n locale - this is the correct way to change locale in Vue I18n 9
  i18n.global.locale.value = lang as any
  
  // Update SEO meta tags for the new language
  updateSeoForLanguage(lang)
  
  // Force reload of navigation links
  window.dispatchEvent(new Event('language-changed'))
  
  // Force reload of the page to ensure all translations are applied
  window.location.reload()
}

// Initialize SEO meta tags with current language on app load
if (typeof window !== 'undefined') {
  // Fix: Access current locale properly
  const currentLocale = i18n.global.locale as unknown as string
  updateSeoForLanguage(currentLocale)
}

export default i18n
