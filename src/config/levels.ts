/**
 * 關卡清單。順序 = 主線順序：由屋企附近出發，繞全港一圈返獅子山下彩虹邨嘅家。
 * storyOwnerId = 該關嘅「故事主人」（劇情跟佢；雙人時佢做主）；undefined = 全家會合關。
 * mapKey 對應 public/assets/maps/<mapKey>.json（Tiled export）。
 */

export interface LevelConfig {
    id: string;
    order: number;
    nameKey: string;
    mapKey: string;
    bossId: string;
    storyOwnerId?: string;
}

export const LEVELS: readonly LevelConfig[] = [
    {
        id: 'mongkok',
        order: 1,
        nameKey: 'level.mongkok.name',
        mapKey: 'mongkok',
        bossId: 'tamjai-auntie',
        storyOwnerId: 'delivery-boy',
    },
    {
        id: 'tsimshatsui',
        order: 2,
        nameKey: 'level.tsimshatsui.name',
        mapKey: 'tsimshatsui',
        bossId: 'aussie-milk-bro',
        storyOwnerId: 'student',
    },
    {
        id: 'central',
        order: 3,
        nameKey: 'level.central.name',
        mapKey: 'central',
        bossId: 'taxi-dog',
        storyOwnerId: 'office-worker',
    },
    {
        id: 'peak-lionrock',
        order: 4,
        nameKey: 'level.peakLionRock.name',
        mapKey: 'peak-lionrock',
        bossId: 'redvan-driver',
    },
    {
        id: 'wongtaisin-choihung',
        order: 5,
        nameKey: 'level.wongTaiSinChoiHung.name',
        mapKey: 'wongtaisin-choihung',
        bossId: 'demolition-hammer',
        storyOwnerId: 'elderly',
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
