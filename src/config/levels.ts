/**
 * 關卡清單。順序 = 主線順序（九龍 → 過海 → 港島 → 大嶼山）。
 * mapKey 對應 public/assets/maps/<mapKey>.json（Tiled export）。
 */

export interface LevelConfig {
    id: string;
    order: number;
    nameKey: string;
    mapKey: string;
    bossId: string;
}

export const LEVELS: readonly LevelConfig[] = [
    {
        id: 'mongkok',
        order: 1,
        nameKey: 'level.mongkok.name',
        mapKey: 'mongkok',
        bossId: 'tamjai-auntie',
    },
    {
        id: 'tsimshatsui',
        order: 2,
        nameKey: 'level.tsimshatsui.name',
        mapKey: 'tsimshatsui',
        bossId: 'aussie-milk-bro',
    },
    {
        id: 'central',
        order: 3,
        nameKey: 'level.central.name',
        mapKey: 'central',
        bossId: 'taxi-dog',
    },
    {
        id: 'peak',
        order: 4,
        nameKey: 'level.peak.name',
        mapKey: 'peak',
        bossId: 'redvan-driver',
    },
    {
        id: 'lantau',
        order: 5,
        nameKey: 'level.lantau.name',
        mapKey: 'lantau',
        bossId: 'final-customer',
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
