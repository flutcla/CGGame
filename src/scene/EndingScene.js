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
exports.EndingScene = void 0;
var EndingScene = /** @class */ (function (_super) {
    __extends(EndingScene, _super);
    function EndingScene() {
        return _super.call(this, 'ending') || this;
    }
    EndingScene.prototype.init = function (data) {
        this.score = data.score;
    };
    EndingScene.prototype.create = function () {
        var _this = this;
        var _a = this.game.canvas, width = _a.width, height = _a.height;
        var zone = this.add.zone(width / 2, height / 2, width, height);
        zone.setInteractive({
            useHandCursor: true
        });
        zone.on('pointerdown', function () {
            _this.scene.start('title'); // TitleSceneに遷移
        });
        this.add.text(width / 2, height / 2 - 60, 'おわり').setOrigin(0.5).setPadding(10, 10, 10, 10).setFontSize(30);
        this.add.text(width / 2, height / 2 + 60, 'スコア: ' + this.score).setOrigin(0.5).setPadding(10, 10, 10, 10).setFontSize(30);
    };
    return EndingScene;
}(Phaser.Scene));
exports.EndingScene = EndingScene;
