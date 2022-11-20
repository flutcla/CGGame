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
exports.GameScene = void 0;
var Button_1 = require("../class/Button");
var Mode_1 = require("../class/Mode");
var ProblemGenerator_1 = require("../class/ProblemGenerator");
var shuffle_1 = require("../function/shuffle");
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this, 'game') || this;
        _this.drawIndex = 0;
        _this.mode = Mode_1.Mode.EASY;
        _this.textStyle = {
            fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
            fontSize: '24px'
        };
        _this.score = 100;
        return _this;
    }
    GameScene.prototype.init = function (data) {
        this.mode = data.mode;
    };
    GameScene.prototype.create = function () {
        this.drawIndex = 0;
        var _a = this.game.canvas, width = _a.width, height = _a.height;
        this.width = width;
        this.height = height;
        this.bgLayer = this.add.container(0, 0);
        this.uiLayer = this.add.container(0, 0);
        this.bgLayer.add(new Phaser.GameObjects.Text(this, 20, this.height - 40, this.mode.getModeName(), this.textStyle).setOrigin(0));
        this.scoreText = new Phaser.GameObjects.Text(this, this.width - 20, this.height - 40, 'Score: ' + this.mode.getScore().toLocaleString() + ' + ' + this.score, this.textStyle).setOrigin(1, 0);
        this.bgLayer.add(this.scoreText);
        this.gameCountText = new Phaser.GameObjects.Text(this, this.width / 2, this.height - 40, this.mode.getGameCount() + ' / ' + this.mode.getGameLimit(), this.textStyle).setOrigin(0.5, 0);
        this.bgLayer.add(this.gameCountText);
        this.pg = new ProblemGenerator_1.ProblemGenerator(this.mode);
        this.drawSongs();
        this.drawChoices();
        if (this.game.config.gameVersion === 'debug')
            console.log(this.pg.eventName);
    };
    GameScene.prototype.reduceScore = function (n) {
        var _a;
        if (this.score - n >= 0) {
            this.score -= n;
            (_a = this.scoreText) === null || _a === void 0 ? void 0 : _a.destroy();
            this.scoreText = new Phaser.GameObjects.Text(this, this.width - 20, this.height - 40, 'Score: ' + this.mode.getScore().toLocaleString() + ' + ' + this.score, this.textStyle).setOrigin(1, 0);
            this.bgLayer.add(this.scoreText);
        }
        else {
            this.score = 0;
        }
    };
    GameScene.prototype.drawSongs = function (showNextButton) {
        var _this = this;
        if (showNextButton === void 0) { showNextButton = true; }
        var songs = this.pg.probSongs;
        for (; this.drawIndex < songs.length; this.drawIndex++) {
            var songRow = new SongRow(this, this.bgLayer, this.uiLayer, songs[this.drawIndex], this.drawIndex);
        }
        if (showNextButton) {
            var hintButton_1 = new Button_1.Button('楽曲追加', function () {
                _this.reduceScore(10);
                hintButton_1.destroy();
                _this.pg.generateNext();
                _this.drawSongs(songs.length < 8);
            }, this, this.uiLayer, 40, 40 * (songs.length + 1), {
                xOrigin: 0,
                yOrigin: 0.5,
            });
        }
    };
    GameScene.prototype.drawChoices = function () {
        var _this = this;
        var events = this.pg.probEvents;
        var _loop_1 = function (i) {
            new Button_1.Button(events[i], function () {
                _this.score = 100;
                var isCorrect = events[i] === _this.pg.eventName;
                if (isCorrect) {
                    _this.mode.addScore(_this.score);
                }
                var buttonText = isCorrect ? '正解！' : '不正解 (' + _this.pg.eventName + ')';
                new Button_1.Button(buttonText, function () {
                    var _a;
                    if (_this.mode.isGameOver()) {
                        var score = _this.mode.getScore();
                        _this.mode.resetGameCount();
                        _this.mode.resetScore();
                        _this.scene.start('ending', { score: score });
                    }
                    else {
                        _this.mode.incrementGameCount();
                        (_a = _this.gameCountText) === null || _a === void 0 ? void 0 : _a.destroy;
                        _this.gameCountText = new Phaser.GameObjects.Text(_this, _this.width / 2, _this.height - 40, _this.mode.getGameCount() + ' / ' + _this.mode.getGameLimit(), _this.textStyle).setOrigin(0.5, 0);
                        _this.bgLayer.add(_this.gameCountText);
                        _this.newProblem();
                    }
                }, _this, _this.uiLayer, _this.width / 2, _this.height - 140, {
                    buttonWidth: _this.width - 20,
                    buttonHeight: _this.height / 3 - 20
                });
            }, this_1, this_1.uiLayer, this_1.width / 2, this_1.height - 80 - 40 * i, {
                buttonWidth: this_1.width - 50,
            });
        };
        var this_1 = this;
        for (var i = 0; i < events.length; i++) {
            _loop_1(i);
        }
    };
    GameScene.prototype.newProblem = function () {
        this.bgLayer.destroy();
        this.uiLayer.destroy();
        this.create();
    };
    return GameScene;
}(Phaser.Scene));
exports.GameScene = GameScene;
var SongRow = /** @class */ (function () {
    function SongRow(scene, bgLayer, uiLayer, song, drawIndex) {
        this.scene = scene;
        this.bgLayer = bgLayer;
        this.uiLayer = uiLayer;
        this.song = song;
        this.drawIndex = drawIndex;
        this.textStyle = {
            fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
            fontSize: '24px'
        };
        this.singerIndex = 0;
        this.x = 0;
        this.y = 0;
        this.singers = (0, shuffle_1.shuffle)((0, ProblemGenerator_1.getSingerNames)(song)).filter(function (x) { return x != ''; });
        this.x = 40;
        this.y = 40 + 40 * this.drawIndex;
        this.songNameText = new Phaser.GameObjects.Text(this.scene, this.x, this.y, (0, ProblemGenerator_1.getSongName)(this.song), this.textStyle)
            .setOrigin(0, 0.5);
        this.bgLayer.add(this.songNameText);
        this.x += this.songNameText.width + 20;
        this.drawSingerHint();
    }
    SongRow.prototype.drawSingerHint = function (noSingerLeft) {
        var _this = this;
        if (noSingerLeft === void 0) { noSingerLeft = false; }
        if (!noSingerLeft) {
            var singerHintButton_1 = new Button_1.Button('歌唱者ヒント', function () {
                _this.scene.reduceScore(5);
                singerHintButton_1.destroy();
                var singerNameText = new Phaser.GameObjects.Text(_this.scene, _this.x, _this.y, _this.singers[_this.singerIndex], _this.textStyle)
                    .setOrigin(0, 0.5);
                _this.bgLayer.add(singerNameText);
                _this.singerIndex += 1;
                _this.x += singerNameText.width + 20;
                if (_this.scene.game.config.gameVersion === 'debug')
                    console.log(_this.singers);
                if (_this.x + singerHintButton_1.rect.width >= _this.scene.game.canvas.width) {
                    _this.bgLayer.add(new Phaser.GameObjects.Text(_this.scene, _this.x, _this.y, _this.singers.length != _this.singerIndex ? '・・・' : '', _this.textStyle)
                        .setOrigin(0, 0.5));
                }
                else {
                    _this.drawSingerHint(_this.singerIndex >= _this.singers.length);
                }
            }, this.scene, this.uiLayer, this.x, this.y, {
                xOrigin: 0,
                yOrigin: 0.5
            });
        }
    };
    return SongRow;
}());
