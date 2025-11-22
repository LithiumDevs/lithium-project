import { currentLocale, loadTranslations, getTranslation, changeLocale, type Locale } from './i18n.core.js';

// ============================================
// DEVELOPER CONFIGURATION
// ============================================

/**
 * Supported locales for the application
 * Modify this array to add more languages
 */
export const SUPPORTED_LOCALES: Locale[] = ['es', 'en'];

/**
 * Default locale if none is detected
 */
export const DEFAULT_LOCALE: Locale = 'es';

/**
 * localStorage key to persist the locale
 */
export const STORAGE_KEY = 'app:locale';

/**
 * Base path where translation files are located
 * Relative to this file
 */
export const LOCALES_PATH = './locales';

// ============================================
// PUBLIC API
// ============================================

export type { Locale };

/**
 * Gets a translation by its key using dot notation
 * @param key - Translation key (e.g., "home.title")
 * @param params - Optional parameters for interpolation
 * 
 * @example
 * ```typescript
 * t('home.title')  // "Welcome to Nakamapp"
 * t('hello', { name: 'Juan' })  // "Hello Juan"
 * ```
 */
export function t(key: string, params?: Record<string, string | number>): string {
  return getTranslation(key, currentLocale.value, params);
}

/**
 * Changes the current application locale
 * @param locale - Locale code to set
 * 
 * @example
 * ```typescript
 * setLocale('en');  // Switch to English
 * setLocale('es');  // Switch to Spanish
 * ```
 */
export function setLocale(locale: Locale): void {
  if (!SUPPORTED_LOCALES.includes(locale)) {
    console.warn(`Locale "${locale}" is not supported. Using default locale "${DEFAULT_LOCALE}"`);
    locale = DEFAULT_LOCALE;
  }
  changeLocale(locale, STORAGE_KEY);
}

/**
 * Gets the current locale
 */
export function getLocale(): Locale {
  return currentLocale.value;
}

/**
 * Subscribes a callback to locale changes
 * @param callback - Function to execute when locale changes
 * @returns Function to unsubscribe
 * 
 * @example
 * ```typescript
 * const unsubscribe = onLocaleChange((newLocale) => {
 *   console.log('Locale changed to:', newLocale);
 * });
 * 
 * // Unsubscribe
 * unsubscribe();
 * ```
 */
export function onLocaleChange(callback: (locale: Locale) => void): () => void {
  return currentLocale.subscribe(callback);
}

/**
 * Initializes the internationalization system
 * Must be called at application startup
 * 
 * @example
 * ```typescript
 * // In my-app.ts
 * async connectedCallback() {
 *   super.connectedCallback();
 *   await initI18n();
 * }
 * ```
 */
export async function initI18n(): Promise<void> {
  // Read from localStorage
  const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
  
  // Or detect from browser
  const browserLang = navigator.language.split('-')[0] as Locale;
  
  const initialLocale = 
    (stored && SUPPORTED_LOCALES.includes(stored)) ? stored :
    SUPPORTED_LOCALES.includes(browserLang) ? browserLang :
    DEFAULT_LOCALE;
  
  currentLocale.value = initialLocale;
  
  // Preload translations for initial locale
  await loadTranslations(initialLocale, LOCALES_PATH);
}