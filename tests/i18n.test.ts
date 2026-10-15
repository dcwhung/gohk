import { describe, expect, it } from 'vitest';
import { DEFAULT_LOCALE, getLocale, t } from '@/i18n';
import zhHK from '@/i18n/zh-HK.json';

describe('i18n', () => {
    it('defaults to zh-HK', () => {
        expect(getLocale()).toBe(DEFAULT_LOCALE);
        expect(DEFAULT_LOCALE).toBe('zh-HK');
    });

    it('returns the translated string for a known key', () => {
        expect(t('character.deliveryBoy.name')).toBe('外賣仔');
    });

    it('falls back to the key itself when missing', () => {
        expect(t('does.not.exist')).toBe('does.not.exist');
    });

    it('has no empty values in zh-HK dictionary', () => {
        for (const [key, value] of Object.entries(zhHK)) {
            expect(value, `empty value for ${key}`).not.toBe('');
        }
    });
});
