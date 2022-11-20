"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuScene = void 0;
var Button_1 = require("../class/Button");
var Mode_1 = require("../class/Mode");
var MenuScene = /** @class */ (function (_super) {
    __extends(MenuScene, _super);
    function MenuScene() {
        var _this = _super.call(this, 'menu') || this;
        _this.textStyle = {
            fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
            fontSize: '24px'
        };
        return _this;
    }
    MenuScene.prototype.init = function (data) {
    };
    MenuScene.prototype.create = function () {
        var _this = this;
        var _a = this.game.canvas, width = _a.width, height = _a.height;
        var uiLayer = this.add.container(0, 0);
        var modes = Object.values(Mode_1.Mode);
        // ボタンを中央に配置するようにボタングループのY原点を計算
        var buttonHeight = 40, buttonMargin = 40;
        var buttonGroupHeight = buttonHeight * modes.length + buttonMargin * (modes.length - 1);
        var buttonGroupOriginY = height / 2 - buttonGroupHeight / 2;
        var x = width / 2;
        modes.forEach(function (mode, index) {
            var y = buttonGroupOriginY + buttonHeight * (index + 0.5) + buttonMargin * (index);
            new Button_1.Button(mode.getModeName(), function () {
                if (mode.getModeName() == 'Easy') {
                    _this.scene.start('game', { mode: mode });
                }
            }, _this, uiLayer, x, y, { buttonWidth: 200 });
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
    };
    return MenuScene;
}(Phaser.Scene));
exports.MenuScene = MenuScene;
