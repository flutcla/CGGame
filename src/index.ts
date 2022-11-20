import * as Phaser from 'phaser';
import { Scenes } from './scene';  // 追加

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  // resolution: window.devicePixelRatio,
  parent: 'game-app',
  backgroundColor: '#000',
  scene: Scenes, // 変更
  version: 'debug', // 'debug | release'
};

new Phaser.Game(config);