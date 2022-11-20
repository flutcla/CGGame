export class EndingScene extends Phaser.Scene {
  public score?: number;
  constructor() {
    super('ending');
  }

  init(data: any) {
    this.score = data.score;
  }

  create() {
    const { width, height } = this.game.canvas;

    const zone = this.add.zone(width / 2, height / 2, width, height);
    zone.setInteractive({
      useHandCursor: true
    });
    zone.on('pointerdown', () => {
      this.scene.start('title');  // TitleSceneに遷移
    });

    this.add.text(width / 2, height / 2 - 60, 'おわり').setOrigin(0.5).setPadding(10, 10, 10, 10).setFontSize(30);

    this.add.text(width / 2, height / 2 + 60, 'スコア: ' + this.score).setOrigin(0.5).setPadding(10, 10, 10, 10).setFontSize(30);


  }
}