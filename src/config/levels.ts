/**
 * 外賣仔單人線關卡清單（v2，2026-10-16）。
 * 6 關，任務交替：接單（pickup）→ 送餐（deliver）。
 * 接單關 boss 守住張單；送餐關 boss 阻你送到。送餐對象係屋企人。
 * mapKey 對應 public/assets/maps/<mapKey>.json（Tiled export）。
 */

export type LevelTask = 'pickup' | 'deliver';

export interface LevelConfig {
    id: string;
    order: number;
    nameKey: string;
    mapKey: string;
    task: LevelTask;
    /** 已定嘅 boss id；未定嘅關留 undefined。 */
    bossId?: string;
    /** 送餐關嘅收餐屋企人（characters.ts 嘅 id）；未定留 undefined。 */
    deliverToCharacterId?: string;
}

export const LEVELS: readonly LevelConfig[] = [
    {
        id: 'mongkok-jordan',
        order: 1,
        nameKey: 'level.mongkokJordan.name',
        mapKey: 'mongkok-jordan',
        task: 'pickup',
        bossId: 'aussie-milk-bro',
    },
    {
        id: 'tsimshatsui-central',
        order: 2,
        nameKey: 'level.tsimshatsuiCentral.name',
        mapKey: 'tsimshatsui-central',
        task: 'deliver',
        bossId: 'security-uncle',
        deliverToCharacterId: 'office-worker',
    },
    {
        id: 'central-causewaybay',
        order: 3,
        nameKey: 'level.centralCausewayBay.name',
        mapKey: 'central-causewaybay',
        task: 'pickup',
        bossId: 'tamjai-auntie',
    },
    {
        id: 'to-tsuenwan',
        order: 4,
        nameKey: 'level.toTsuenWan.name',
        mapKey: 'to-tsuenwan',
        task: 'deliver',
        bossId: 'taxi-dog',
    },
    {
        id: 'from-tsuenwan',
        order: 5,
        nameKey: 'level.fromTsuenWan.name',
        mapKey: 'from-tsuenwan',
        task: 'pickup',
    },
    {
        id: 'lionrock-choihung',
        order: 6,
        nameKey: 'level.lionRockChoiHung.name',
        mapKey: 'lionrock-choihung',
        task: 'deliver',
        deliverToCharacterId: 'elderly',
    },
];

export function getLevelById(id: string): LevelConfig | undefined {
    return LEVELS.find((level) => level.id === id);
}

export function getNextLevel(currentId: string): LevelConfig | undefined {
    const current = getLevelById(currentId);
    if (!current) {
        return undefined;
    }
    return LEVELS.find((level) => level.order === current.order + 1);
}
