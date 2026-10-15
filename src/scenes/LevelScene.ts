import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH, PLACEHOLDER_GROUND_HEIGHT, SCENE_KEYS } from '@/config/constants';
import { t } from '@/i18n';

const GROUND_COLOR = 0x3a5a40;
const TITLE_FONT_SIZE = '28px';
const SUBTITLE_FONT_SIZE = '16px';
const TITLE_Y_RATIO = 0.4;
const SUBTITLE_OFFSET_Y = 40;
const TEXT_COLOR = '#f4f1de';
const ORIGIN_CENTER = 0.5;

/**
 * 通用關卡 scene。M0 只係畫一塊 placeholder 地面同標題，證明 pipeline 行到。
 * M1 會加入 Player、Tiled map、敵人。
 */
export class LevelScene extends Phaser.Scene {
    constructor() {
        super(SCENE_KEYS.LEVEL);
    }

    create(): void {
        this.createPlaceholderGround();
        this.createPlaceholderText();
    }

    private createPlaceholderGround(): void {
        const groundY = GAME_HEIGHT - PLACEHOLDER_GROUND_HEIGHT / 2;
        const ground = this.add.rectangle(
            GAME_WIDTH / 2,
            groundY,
            GAME_WIDTH,
            PLACEHOLDER_GROUND_HEIGHT,
            GROUND_COLOR,
        );
        this.physics.add.existing(ground, true);
    }

    private createPlaceholderText(): void {
        const centerX = GAME_WIDTH / 2;
        const titleY = GAME_HEIGHT * TITLE_Y_RATIO;
        this.add
            .text(centerX, titleY, t('game.title'), {
                fontSize: TITLE_FONT_SIZE,
                color: TEXT_COLOR,
            })
            .setOrigin(ORIGIN_CENTER);
        this.add
            .text(centerX, titleY + SUBTITLE_OFFSET_Y, t('level.placeholder'), {
                fontSize: SUBTITLE_FONT_SIZE,
                color: TEXT_COLOR,
            })
            .setOrigin(ORIGIN_CENTER);
    }
}
