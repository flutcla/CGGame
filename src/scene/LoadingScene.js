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
exports.LoadingScene = void 0;
var LoadingScene = /** @class */ (function (_super) {
    __extends(LoadingScene, _super);
    function LoadingScene() {
        // シーンのkeyを指定
        return _super.call(this, 'loading') || this;
    }
    // preload()はシーンが呼び出されたら実行される
    LoadingScene.prototype.preload = function () {
    };
    // create()はpreload内のアセットのロードが完了したら実行される
    LoadingScene.prototype.create = function () {
        var _this = this;
        // 描画領域のサイズを取得
        var _a = this.game.canvas, width = _a.width, height = _a.height;
        this.add.text(width / 2, height / 2 - 60, 'シンデレラガールズ 公演当てクイズ').setOrigin(0.5);
        // テキストをロゴの下に表示
        this.add.text(width / 2, height / 2 + 60, 'Loading...').setOrigin(0.5);
        // アセットのロードが完了したらTitleSceneに遷移
        this.load.on('complete', function () {
            _this.scene.start('title');
        });
        // アセットのロードを開始（preload外でロードを行う場合はこのメソッドを呼ぶ必要がある）
        this.load.start();
    };
    return LoadingScene;
}(Phaser.Scene));
exports.LoadingScene = LoadingScene;
