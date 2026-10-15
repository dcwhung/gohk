/**
 * 全局常數。所有 magic number 都要喺度定義，再 import 去用。
 */

/** 遊戲內部解像度（16:9），Scale Manager 會按視窗放大。 */
export const GAME_WIDTH = 960;
export const GAME_HEIGHT = 540;

/** Arcade physics 重力（px/s²）。 */
export const GRAVITY_Y = 1200;

/** 背景色（placeholder，正式美術之後會由關卡背景取代）。 */
export const BACKGROUND_COLOR = '#1b1f2a';

/** 玩家基礎數值（M1 會搬去 characters.ts 嘅 config）。 */
export const PLAYER_RUN_SPEED = 220;
export const PLAYER_JUMP_VELOCITY = -520;

/** Placeholder 地面高度（px，由畫面底部計）。 */
export const PLACEHOLDER_GROUND_HEIGHT = 64;

/** Scene keys，避免喺 code 入面寫 string。 */
export const SCENE_KEYS = {
    BOOT: 'BootScene',
    LEVEL: 'LevelScene',
} as const;

export type SceneKey = (typeof SCENE_KEYS)[keyof typeof SCENE_KEYS];
