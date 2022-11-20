"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Phaser = require("phaser");
var scene_1 = require("./scene"); // 追加
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    // resolution: window.devicePixelRatio,
    parent: 'game-app',
    backgroundColor: '#000',
    scene: scene_1.Scenes,
    version: 'debug', // 'debug | release'
};
new Phaser.Game(config);
