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
exports.TitleScene = void 0;
var TitleScene = /** @class */ (function (_super) {
    __extends(TitleScene, _super);
    function TitleScene() {
        return _super.call(this, 'title') || this;
    }
    TitleScene.prototype.create = function () {
        var _this = this;
        var _a = this.game.canvas, width = _a.width, height = _a.height;
        this.add.text(width / 2, height / 2 - 60, 'シンデレラガールズ 公演当てクイズ').setOrigin(0.5).setPadding(10, 10, 10, 10).setFontSize(30);
        this.add.text(width / 2, height / 2 + 60, 'クリックでスタート！').setOrigin(0.5).setPadding(10, 10, 10, 10).setFontSize(30);
        // 画面を埋めるようなZoneを作成
        var zone = this.add.zone(width / 2, height / 2, width, height);
        // Zoneをクリックできるように設定
        zone.setInteractive({
            useHandCursor: true // マウスオーバーでカーソルが指マークになる
        });
        // ZoneをクリックしたらMainSceneに遷移
        zone.on('pointerdown', function () {
            _this.scene.start('menu');
            // this.scene.start('main', { timelineID: 'start' });
        });
    };
    return TitleScene;
}(Phaser.Scene));
exports.TitleScene = TitleScene;
