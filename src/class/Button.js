"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
var Button = /** @class */ (function () {
    function Button(buttonText, func, scene, layer, x, y, _a) {
        var _b = _a.xOrigin, xOrigin = _b === void 0 ? 0.5 : _b, _c = _a.yOrigin, yOrigin = _c === void 0 ? xOrigin : _c, _d = _a.buttonWidth, buttonWidth = _d === void 0 ? -1 : _d, _e = _a.buttonHeight, buttonHeight = _e === void 0 ? -1 : _e;
        this.buttonText = buttonText;
        this.func = func;
        this.scene = scene;
        this.layer = layer;
        this.x = x;
        this.y = y;
        this.textStyle = {
            fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
            fontSize: '24px'
        };
        this.margin = 4;
        var x2 = this.margin * 6 * (0.5 - xOrigin);
        var y2 = this.margin * (0.5 - yOrigin);
        var text = new Phaser.GameObjects.Text(scene, x + x2, y + y2, buttonText, this.textStyle).setOrigin(xOrigin, yOrigin);
        var width = text.width + this.margin * 6;
        var height = text.height + this.margin * 2;
        var rect = new Phaser.GameObjects.Rectangle(scene, x, y, buttonWidth === -1 ? width : buttonWidth, buttonHeight === -1 ? height : buttonHeight, 0x000000).setStrokeStyle(1, 0xffffff).setOrigin(xOrigin, yOrigin);
        rect.setInteractive({
            useHandCursor: true
        });
        rect.on('pointerover', function () {
            rect.setFillStyle(0x333333);
        });
        rect.on('pointerout', function () {
            rect.setFillStyle(0x000000);
        });
        rect.on('pointerdown', func);
        layer.add(rect);
        this.rect = rect;
        layer.add(text);
        this.text = text;
        return this;
    }
    Button.prototype.destroy = function () {
        this.rect.destroy();
        this.text.destroy();
    };
    return Button;
}());
exports.Button = Button;
