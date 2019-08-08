export declare function getLocaleToLoad(locale: string, supportedLocales: string[]): string;
/**
 * Get the user's preferred language from the browser.
 *
 * @param navigator https://developer.mozilla.org/en-US/docs/Web/API/Navigator
 */
export declare function getBrowserLanguage(navigator: Navigator): any;
/**
 *
 * @param locale user's current locale
 * @param supportedLocales a list of locales that supported by the library or widget
 */
export declare function getSupportedLocale(locale: string, supportedLocales?: string[]): string;
export declare function isSameLanguage(locale1: string, locale2: string): boolean;
export interface I18nMessages {
    [index: string]: string;
}
/**
 * @param baseUrl base URL of library or widget translation files
 * @param locale user's current locale
 */
export declare function loadLocaleMessages(baseUrl: string, locale: string): Promise<I18nMessages>;
/**
 * Load the locale data for the user's current locale.
 *
 * @param locale user's current locale
 */
export declare function loadLocaleData(locale: string): Promise<any>;
/**
 * Merge the hash of application messgaes into a flattened messages hash
 *
 * @param appMessages application messages, a hash of objects
 */
