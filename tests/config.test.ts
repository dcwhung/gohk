import { describe, expect, it } from 'vitest';
import {
    CHARACTERS,
    DEFAULT_CHARACTER_ID,
    getCharacterById,
    getPlayableCharacters,
} from '@/config/characters';
import { LEVELS, getLevelById, getNextLevel } from '@/config/levels';
import zhHK from '@/i18n/zh-HK.json';

const dictionary: Record<string, string> = zhHK;

describe('characters config', () => {
    it('has at least one character and a valid default', () => {
        expect(CHARACTERS.length).toBeGreaterThan(0);
        expect(getCharacterById(DEFAULT_CHARACTER_ID)).toBeDefined();
    });

    it('has unique ids', () => {
        const ids = CHARACTERS.map((character) => character.id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    it('references i18n keys that exist', () => {
        for (const character of CHARACTERS) {
            expect(dictionary[character.nameKey], character.nameKey).toBeDefined();
            expect(dictionary[character.meleeWeaponKey], character.meleeWeaponKey).toBeDefined();
            expect(dictionary[character.throwWeaponKey], character.throwWeaponKey).toBeDefined();
        }
    });

    it('returns undefined for unknown id', () => {
        expect(getCharacterById('nobody')).toBeUndefined();
    });
});

describe('levels config', () => {
    it('orders levels 1..n without gaps', () => {
        const orders = LEVELS.map((level) => level.order);
        expect(orders).toEqual(orders.map((_, index) => index + 1));
    });

    it('has unique ids and i18n names', () => {
        const ids = LEVELS.map((level) => level.id);
        expect(new Set(ids).size).toBe(ids.length);
        for (const level of LEVELS) {
            expect(dictionary[level.nameKey], level.nameKey).toBeDefined();
        }
    });

    it('walks the main line from first to last', () => {
        let current = LEVELS[0];
        let visited = 1;
        let next = getNextLevel(current.id);
        while (next) {
            visited += 1;
            current = next;
            next = getNextLevel(current.id);
        }
        expect(visited).toBe(LEVELS.length);
        expect(current.id).toBe(LEVELS[LEVELS.length - 1].id);
    });

    it('returns undefined when there is no next level', () => {
        expect(getNextLevel('unknown')).toBeUndefined();
        expect(getLevelById('unknown')).toBeUndefined();
    });
});

describe('character roster', () => {
    it('has exactly one playable character in v1', () => {
        expect(getPlayableCharacters().map((character) => character.id)).toEqual(['delivery-boy']);
    });

    it('gives every character at least one skill, none shared across characters', () => {
        const skills = CHARACTERS.flatMap((character) => character.skillIds);
        expect(skills.length).toBeGreaterThanOrEqual(CHARACTERS.length);
        expect(new Set(skills).size).toBe(skills.length);
    });

    it('gives every character at least one skin', () => {
        for (const character of CHARACTERS) {
            expect(character.skins.length, character.id).toBeGreaterThan(0);
        }
    });

    it('points every deliver-to target at a real character', () => {
        for (const level of LEVELS) {
            if (level.deliverToCharacterId) {
                expect(getCharacterById(level.deliverToCharacterId), level.id).toBeDefined();
            }
        }
    });

    it('alternates pickup and deliver tasks starting with pickup', () => {
        LEVELS.forEach((level, index) => {
            const expected = index % 2 === 0 ? 'pickup' : 'deliver';
            expect(level.task, level.id).toBe(expected);
        });
    });

    it('only deliver levels have a deliver-to target', () => {
        for (const level of LEVELS) {
            if (level.task === 'pickup') {
                expect(level.deliverToCharacterId, level.id).toBeUndefined();
            }
        }
    });
});
