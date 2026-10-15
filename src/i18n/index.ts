import zhHK from './zh-HK.json';

export type Locale = 'zh-HK';

type Dictionary = Record<string, string>;

const DICTIONARIES: Record<Locale, Dictionary> = {
    'zh-HK': zhHK,
};

export const DEFAULT_LOCALE: Locale = 'zh-HK';

let currentLocale: Locale = DEFAULT_LOCALE;

export function setLocale(locale: Locale): void {
    currentLocale = locale;
}

export function getLocale(): Locale {
    return currentLocale;
}

/**
 * 取文字。搵唔到 key 就直接回傳 key，方便喺畫面上見到漏咗邊個。
 */
export function t(key: string): string {
    return DICTIONARIES[currentLocale][key] ?? key;
}
