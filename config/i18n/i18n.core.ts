// Types
export type Locale = 'es' | 'en';
export type TranslationKeys = Record<string, any>;

// Reactive state for current locale
let _currentLocale: Locale = 'es';
const _listeners = new Set<(locale: Locale) => void>();

export const currentLocale = {
  get value(): Locale {
    return _currentLocale;
  },
  set value(locale: Locale) {
    if (_currentLocale !== locale) {
      _currentLocale = locale;
      _listeners.forEach(fn => fn(locale));
    }
  },
  subscribe(callback: (locale: Locale) => void): () => void {
    _listeners.add(callback);
    return () => _listeners.delete(callback);
  }
};

// Cache for loaded translations
const translationsCache = new Map<Locale, TranslationKeys>();

/**
 * Loads translations for a specific locale
 * @internal
 */
export async function loadTranslations(locale: Locale, basePath = './locales'): Promise<TranslationKeys> {
  if (translationsCache.has(locale)) {
    return translationsCache.get(locale)!;
  }

  try {
    const translations = await import(`${basePath}/${locale}.json`);
    translationsCache.set(locale, translations.default);
    return translations.default;
  } catch (error) {
    console.error(`Failed to load translations for locale: ${locale}`, error);
    return {};
  }
}

/**
 * Gets a translation by its key using dot notation
 * @param key - Translation key (e.g., "home.title")
 * @param params - Optional parameters for interpolation
 * @internal
 */
export function getTranslation(key: string, locale: Locale, params?: Record<string, string | number>): string {
  const trans = translationsCache.get(locale);

  if (!trans) {
    return key;
  }

  // Navigate through the key using dot notation
  const keys = key.split('.');
  let value: any = trans;
  
  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) {
      return key;
    }
  }

  // Parameter interpolation
  if (typeof value === 'string' && params) {
    return value.replace(/\{(\w+)\}/g, (_, paramKey) => {
      return params[paramKey]?.toString() || `{${paramKey}}`;
    });
  }

  return value || key;
}

/**
 * Changes the current locale
 * @internal
 */
export function changeLocale(locale: Locale, storageKey: string): void {
  currentLocale.value = locale;
  localStorage.setItem(storageKey, locale);
}