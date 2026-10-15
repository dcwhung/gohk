import Phaser from 'phaser';
import { SCENE_KEYS } from '@/config/constants';

/**
 * 負責 preload 所有共用 asset，之後轉去第一個 scene。
 * M0 階段冇 asset，直接跳去 LevelScene。
 */
export class BootScene extends Phaser.Scene {
    constructor() {
        super(SCENE_KEYS.BOOT);
    }

    preload(): void {
        // M1 開始喺度 load sprite / tilemap / audio。
    }

    create(): void {
        this.scene.start(SCENE_KEYS.LEVEL);
    }
}
