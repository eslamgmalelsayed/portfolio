/**
 * SEO utilities for managing meta tags and structured data
 */

/**
 * Updates the canonical and alternate language links based on current locale
 * @param locale Current locale (en or ar)
 */
export const updateLanguageMetaTags = (locale: string): void => {
  // Update canonical URL to include current language
  const canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonicalLink) {
    const baseUrl = 'https://eslamgamal.dev';
    canonicalLink.setAttribute('href', locale === 'en' ? baseUrl : `${baseUrl}?lang=ar`);
  }

  // Update Open Graph locale tags
  const ogLocale = document.querySelector('meta[property="og:locale"]');
  const ogLocaleAlt = document.querySelector('meta[property="og:locale:alternate"]');
  
  if (ogLocale && ogLocaleAlt) {
    if (locale === 'en') {
      ogLocale.setAttribute('content', 'en_US');
      ogLocaleAlt.setAttribute('content', 'ar_SA');
    } else {
      ogLocale.setAttribute('content', 'ar_SA');
      ogLocaleAlt.setAttribute('content', 'en_US');
    }
  }
};

/**
 * Updates the document direction and language attributes
 * @param locale Current locale (en or ar)
 */
export const updateHtmlLangAttribute = (locale: string): void => {
  const htmlElement = document.documentElement;
  htmlElement.setAttribute('lang', locale);
  htmlElement.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');
};

/**
 * Updates all SEO-related meta tags when language changes
 * @param locale Current locale (en or ar)
 */
export const updateSeoForLanguage = (locale: string): void => {
  updateLanguageMetaTags(locale);
  updateHtmlLangAttribute(locale);
};
