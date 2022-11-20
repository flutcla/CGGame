export class Button {
  private textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
    fontSize: '24px'
  };
  private margin = 4;
  public rect: Phaser.GameObjects.Rectangle;
  public text: Phaser.GameObjects.Text;

  constructor(
    public buttonText: string,
    public func: () => any,
    public scene: Phaser.Scene,
    public layer: Phaser.GameObjects.Container,
    public x: number,
    public y: number,
    {
      xOrigin = 0.5,
      yOrigin = xOrigin,
      buttonWidth = -1,
      buttonHeight = -1,
    }: {
      xOrigin?: number;
      yOrigin?: number;
      buttonWidth?: number;
      buttonHeight?: number;
    }
  ){

    let x2 = this.margin * 6 * (0.5 - xOrigin);
    let y2 = this.margin * (0.5 - yOrigin);
    const text = new Phaser.GameObjects.Text(scene, x+x2, y+y2, buttonText, this.textStyle).setOrigin(xOrigin, yOrigin);

    const width = text.width + this.margin * 6;
    const height = text.height + this.margin * 2;
    const rect = new Phaser.GameObjects.Rectangle(scene, x, y, buttonWidth === -1 ? width : buttonWidth, buttonHeight === -1 ? height : buttonHeight, 0x000000).setStrokeStyle(1, 0xffffff).setOrigin(xOrigin, yOrigin);
    rect.setInteractive({
      useHandCursor: true
    });
    rect.on('pointerover', () => {
      rect.setFillStyle(0x333333);
    });
    rect.on('pointerout', () => {
      rect.setFillStyle(0x000000);
    });
    rect.on('pointerdown', func);

    layer.add(rect);
    this.rect = rect;
    layer.add(text);
    this.text = text;

    return this;
  }

  public destroy() {
    this.rect.destroy();
    this.text.destroy();
  }
}
