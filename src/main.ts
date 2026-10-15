import Phaser from 'phaser';
import { BACKGROUND_COLOR, GAME_HEIGHT, GAME_WIDTH, GRAVITY_Y } from '@/config/constants';
import { BootScene } from '@/scenes/BootScene';
import { LevelScene } from '@/scenes/LevelScene';

const GAME_CONTAINER_ID = 'game';

const gameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: GAME_CONTAINER_ID,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: BACKGROUND_COLOR,
    pixelArt: false,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: GRAVITY_Y },
            debug: import.meta.env.DEV,
        },
    },
    scene: [BootScene, LevelScene],
};

new Phaser.Game(gameConfig);
