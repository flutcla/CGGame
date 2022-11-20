import { Button } from '../class/Button';
import { Mode } from '../class/Mode';

export class MenuScene extends Phaser.Scene {
  private textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
    fontSize: '24px'
  };

  constructor() {
    super('menu');
  }

  init(data: any) {

  }

  create() {
    const {width, height} = this.game.canvas;
    const uiLayer = this.add.container(0, 0);
    const modes = Object.values(Mode);

    // ボタンを中央に配置するようにボタングループのY原点を計算
    const buttonHeight = 40, buttonMargin = 40;
    const buttonGroupHeight = buttonHeight * modes.length + buttonMargin * (modes.length - 1);
    const buttonGroupOriginY = height / 2 - buttonGroupHeight / 2;
    const x = width / 2
    modes.forEach((mode, index) => {
      const y = buttonGroupOriginY + buttonHeight * (index + 0.5) + buttonMargin * (index);

      new Button(
        mode.getModeName(),
        () => {
          if (mode.getModeName() == 'Easy'){
            this.scene.start('game', { mode: mode });
          }
        },
        this,
        uiLayer,
        x,
        y,
        { buttonWidth: 200 }
      );

    //   // Rectangleでボタンを作成
    //   const button = new Phaser.GameObjects.Rectangle(this, width / 2, y, width - buttonMargin * 2, buttonHeight, 0x000000).setStrokeStyle(1, 0xffffff);
    //   button.setInteractive({
    //     useHandCursor: true
    //   });

    //   // マウスオーバーで色が変わるように設定
    //   button.on('pointerover', () => {
    //     button.setFillStyle(0x333333);
    //   });
    //   button.on('pointerout', () => {
    //     button.setFillStyle(0x000000);
    //   });

    //   button.on('pointerdown', () => {
    //     this.scene.start('game', {mode: mode})
    //   });

    //   // ボタンをUIレイヤーに追加
    //   uiLayer.add(button);

    //   // ボタンテキストを作成
    //   const buttonText = new Phaser.GameObjects.Text(this, width / 2, y, mode.getModeName(), this.textStyle).setOrigin(0.5);

    //   // ボタンテキストをUIレイヤーに追加
    //   uiLayer.add(buttonText);
    // });
    });
  }
}