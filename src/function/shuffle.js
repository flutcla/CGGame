"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffle = void 0;
function shuffle(arr) {
    var cloneArray = __spreadArray([], arr, true);
    for (var i = cloneArray.length - 1; i >= 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1));
        var tmpStorage = cloneArray[i];
        cloneArray[i] = cloneArray[rand];
        cloneArray[rand] = tmpStorage;
    }
    return cloneArray;
}
exports.shuffle = shuffle;
