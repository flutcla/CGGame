import { Button } from "../class/Button";

export class TitleScene extends Phaser.Scene {
  constructor() {
    super('title');
  }

  create() {
    const { width, height } = this.game.canvas;

    this.add.text(width / 2, height / 2 - 60, 'シンデレラガールズ 公演当てクイズ').setOrigin(0.5).setPadding(10, 10, 10, 10).setFontSize(30);

    this.add.text(width / 2, height / 2 + 60, 'クリックでスタート！').setOrigin(0.5).setPadding(10, 10, 10, 10).setFontSize(30);

    // 画面を埋めるようなZoneを作成
    const zone = this.add.zone(width / 2, height / 2, width, height);

    // Zoneをクリックできるように設定
    zone.setInteractive({
      useHandCursor: true  // マウスオーバーでカーソルが指マークになる
    });

    // ZoneをクリックしたらMainSceneに遷移
    zone.on('pointerdown', () => {
      this.scene.start('menu');
      // this.scene.start('main', { timelineID: 'start' });
    });
  }
}