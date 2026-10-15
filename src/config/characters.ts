/**
 * 可選角色 config。新增角色 = 加一個 entry + 美術，唔使改 code。
 * 第一版只完成「外賣仔」；其他角色之後加。
 */

export type MovementForm = 'walk' | 'bicycle' | 'motorbike';

export interface CharacterStats {
    maxHp: number;
    runSpeed: number;
    jumpVelocity: number;
    meleeDamage: number;
    throwDamage: number;
}

export interface CharacterConfig {
    id: string;
    /** i18n key，顯示名由 zh-HK.json 提供。 */
    nameKey: string;
    forms: readonly MovementForm[];
    meleeWeaponKey: string;
    throwWeaponKey: string;
    stats: CharacterStats;
}

const DELIVERY_BOY_STATS: CharacterStats = {
    maxHp: 100,
    runSpeed: 220,
    jumpVelocity: -520,
    meleeDamage: 10,
    throwDamage: 15,
};

export const CHARACTERS: readonly CharacterConfig[] = [
    {
        id: 'delivery-boy',
        nameKey: 'character.deliveryBoy.name',
        forms: ['walk', 'bicycle', 'motorbike'],
        meleeWeaponKey: 'weapon.foodTray',
        throwWeaponKey: 'weapon.pineappleBun',
        stats: DELIVERY_BOY_STATS,
    },
];

export const DEFAULT_CHARACTER_ID = CHARACTERS[0].id;

export function getCharacterById(id: string): CharacterConfig | undefined {
    return CHARACTERS.find((character) => character.id === id);
}
