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
exports.Mode = exports.Hard = exports.Normal = exports.Easy = void 0;
var _Mode = /** @class */ (function () {
    function _Mode(modeName) {
        this.modeName = modeName;
        this.score = 0;
        this.gameCount = 1;
        this.gameLimit = 5;
    }
    ;
    _Mode.prototype.getModeName = function () {
        return this.modeName;
    };
    _Mode.prototype.getScore = function () {
        return this.score;
    };
    _Mode.prototype.addScore = function (n) {
        this.score += n;
    };
    _Mode.prototype.isGameOver = function () {
        return this.gameCount >= this.gameLimit;
    };
    _Mode.prototype.setGameLimit = function (n) {
        this.gameLimit = n;
    };
    _Mode.prototype.getGameLimit = function () {
        return this.gameLimit;
    };
    _Mode.prototype.getGameCount = function () {
        return this.gameCount;
    };
    _Mode.prototype.resetGameCount = function () {
        this.gameCount = 1;
    };
    _Mode.prototype.resetScore = function () {
        this.score = 0;
    };
    _Mode.prototype.incrementGameCount = function () {
        this.gameCount++;
    };
    return _Mode;
}());
var Easy = /** @class */ (function (_super) {
    __extends(Easy, _super);
    function Easy() {
        var _this = _super.call(this, 'Easy') || this;
        _this.setGameLimit(5);
        return _this;
    }
    ;
    return Easy;
}(_Mode));
exports.Easy = Easy;
var Normal = /** @class */ (function (_super) {
    __extends(Normal, _super);
    function Normal() {
        return _super.call(this, 'Normal') || this;
    }
    ;
    return Normal;
}(_Mode));
exports.Normal = Normal;
var Hard = /** @class */ (function (_super) {
    __extends(Hard, _super);
    function Hard() {
        return _super.call(this, 'Hard') || this;
    }
    ;
    return Hard;
}(_Mode));
exports.Hard = Hard;
exports.Mode = {
    EASY: new Easy(),
    NORMAL: new Normal(),
    HARD: new Hard()
};
