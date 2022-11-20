export class LoadingScene extends Phaser.Scene {
  constructor() {
    // シーンのkeyを指定
    super('loading');
  }

  // preload()はシーンが呼び出されたら実行される
  preload() {

  }

  // create()はpreload内のアセットのロードが完了したら実行される
  create() {
    // 描画領域のサイズを取得
    const { width, height } = this.game.canvas;

    this.add.text(width / 2, height / 2 - 60, 'シンデレラガールズ 公演当てクイズ').setOrigin(0.5);

    // テキストをロゴの下に表示
    this.add.text(width / 2, height / 2 + 60, 'Loading...').setOrigin(0.5);

    // アセットのロードが完了したらTitleSceneに遷移
    this.load.on('complete', () => {
      this.scene.start('title');
    });

    // アセットのロードを開始（preload外でロードを行う場合はこのメソッドを呼ぶ必要がある）
    this.load.start();
  }
}