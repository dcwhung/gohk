/**
 * 可選角色 config。新增角色 = 加一個 entry + 美術，唔使改 code。
 * 四個主角係一家人：外賣仔 / 打工仔（男女 skin）/ 學生 / 老人家。
 * 第一版只完成「外賣仔」；其餘已預留 config，美術同技能實作之後做。
 */

export type MovementForm =
    'walk' | 'bicycle' | 'motorbike' | 'transit' | 'schoolbus' | 'elderly-fare';

/** 專屬技能 id。技能邏輯喺 systems/skills/ 按 id 實作。 */
export type SkillId =
    'form-switch' | 'stock-trading' | 'kol-livestream' | 'tutorial-boost' | 'elderly-priority';

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
    /** 外觀 skin 清單（例如男 / 女），數值同技能一樣，只換美術。 */
    skins: readonly string[];
    forms: readonly MovementForm[];
    meleeWeaponKey: string;
    throwWeaponKey: string;
    skillIds: readonly SkillId[];
    stats: CharacterStats;
    /** 第一版是否可揀；false 嘅角色喺選角畫面顯示「整緊」。 */
    playable: boolean;
}

const BASE_STATS: CharacterStats = {
    maxHp: 100,
    runSpeed: 220,
    jumpVelocity: -520,
    meleeDamage: 10,
    throwDamage: 15,
};

/** 老人家：行得慢、HP 高、近戰痛（拐杖）。 */
const ELDERLY_STATS: CharacterStats = {
    maxHp: 130,
    runSpeed: 170,
    jumpVelocity: -460,
    meleeDamage: 14,
    throwDamage: 12,
};

const SINGLE_SKIN = ['default'] as const;

export const CHARACTERS: readonly CharacterConfig[] = [
    {
        id: 'delivery-boy',
        nameKey: 'character.deliveryBoy.name',
        skins: SINGLE_SKIN,
        forms: ['walk', 'bicycle', 'motorbike'],
        meleeWeaponKey: 'weapon.foodTray',
        throwWeaponKey: 'weapon.pineappleBun',
        skillIds: ['form-switch'],
        stats: BASE_STATS,
        playable: true,
    },
    {
        id: 'office-worker',
        nameKey: 'character.officeWorker.name',
        skins: ['male', 'female'],
        forms: ['walk', 'transit'],
        meleeWeaponKey: 'weapon.briefcase',
        throwWeaponKey: 'weapon.folder',
        skillIds: ['stock-trading', 'kol-livestream'],
        stats: BASE_STATS,
        playable: false,
    },
    {
        id: 'student',
        nameKey: 'character.student.name',
        skins: SINGLE_SKIN,
        forms: ['walk', 'schoolbus'],
        meleeWeaponKey: 'weapon.schoolbag',
        throwWeaponKey: 'weapon.tutorialNotes',
        skillIds: ['tutorial-boost'],
        stats: BASE_STATS,
        playable: false,
    },
    {
        id: 'elderly',
        nameKey: 'character.elderly.name',
        skins: SINGLE_SKIN,
        forms: ['walk', 'elderly-fare'],
        meleeWeaponKey: 'weapon.walkingStick',
        throwWeaponKey: 'weapon.thermosFlask',
        skillIds: ['elderly-priority'],
        stats: ELDERLY_STATS,
        playable: false,
    },
];

export const DEFAULT_CHARACTER_ID = CHARACTERS[0].id;

export function getCharacterById(id: string): CharacterConfig | undefined {
    return CHARACTERS.find((character) => character.id === id);
}

export function getPlayableCharacters(): readonly CharacterConfig[] {
    return CHARACTERS.filter((character) => character.playable);
}
