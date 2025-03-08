// User preferences utility for storing and retrieving theme and language settings

// Types
type ThemePreference = 'light' | 'dark';
type LanguagePreference = 'en' | 'ar';
type DirectionPreference = 'ltr' | 'rtl';

// Constants
const THEME_KEY = 'portfolio_theme';
const LANGUAGE_KEY = 'portfolio_language';
const DIRECTION_KEY = 'portfolio_direction';

// Default values
const DEFAULT_THEME: ThemePreference = 'dark';
const DEFAULT_LANGUAGE: LanguagePreference = 'en';
const DEFAULT_DIRECTION: DirectionPreference = 'ltr';

/**
 * Get stored theme preference
 * @returns The user's theme preference or default
 */
export const getThemePreference = (): ThemePreference => {
  const storedTheme = localStorage.getItem(THEME_KEY);
  return (storedTheme === 'light' || storedTheme === 'dark') 
    ? storedTheme as ThemePreference 
    : DEFAULT_THEME;
};

/**
 * Save theme preference
 * @param theme The theme preference to save
 */
export const saveThemePreference = (theme: ThemePreference): void => {
  localStorage.setItem(THEME_KEY, theme);
};

/**
 * Get stored language preference
 * @returns The user's language preference or default
 */
export const getLanguagePreference = (): LanguagePreference => {
  const storedLang = localStorage.getItem(LANGUAGE_KEY);
  return (storedLang === 'en' || storedLang === 'ar') 
    ? storedLang as LanguagePreference 
    : DEFAULT_LANGUAGE;
};

/**
 * Save language preference
 * @param language The language preference to save
 */
export const saveLanguagePreference = (language: LanguagePreference): void => {
  localStorage.setItem(LANGUAGE_KEY, language);
  
  // Also save the corresponding direction
  const direction: DirectionPreference = language === 'ar' ? 'rtl' : 'ltr';
  saveDirectionPreference(direction);
};

/**
 * Get stored direction preference
 * @returns The user's direction preference or default
 */
export const getDirectionPreference = (): DirectionPreference => {
  const storedDirection = localStorage.getItem(DIRECTION_KEY);
  return (storedDirection === 'ltr' || storedDirection === 'rtl') 
    ? storedDirection as DirectionPreference 
    : DEFAULT_DIRECTION;
};

/**
 * Save direction preference
 * @param direction The direction preference to save
 */
export const saveDirectionPreference = (direction: DirectionPreference): void => {
  localStorage.setItem(DIRECTION_KEY, direction);
};

/**
 * Apply theme to document based on preference
 * @param theme The theme to apply
 */
export const applyTheme = (theme: ThemePreference): void => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

/**
 * Apply language to document based on preference
 * @param language The language to apply
 */
export const applyLanguage = (language: LanguagePreference): void => {
  const direction = language === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dir = direction;
  document.documentElement.lang = language;
  
  // Save both language and direction preferences
  saveLanguagePreference(language);
};

/**
 * Initialize preferences from localStorage on app startup
 */
export const initializePreferences = (): void => {
  // Apply stored theme
  const storedTheme = getThemePreference();
  applyTheme(storedTheme);
  
  // Apply stored language and direction
  const storedLanguage = getLanguagePreference();
  applyLanguage(storedLanguage);
};
