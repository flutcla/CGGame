"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeOneVect = exports.makeVect = exports.Vector = void 0;
var Vector = /** @class */ (function () {
    function Vector(components) {
        this.components = components;
    }
    Vector.prototype.or = function (other) {
        if (this.components.length != other.components.length) {
            throw new EvalError('ベクトルの次元が異なります。');
        }
        var ret = makeVect(this.components.length, -1);
        for (var index = 0; index < other.components.length; index++) {
            if (this.components[index] === 1 || other.components[index] === 1) {
                ret.components[index] = 1;
            }
        }
        return ret;
    };
    Vector.prototype.and = function (other) {
        if (this.components.length != other.components.length) {
            throw new EvalError('ベクトルの次元が異なります。');
        }
        var ret = makeVect(this.components.length, -1);
        for (var index = 0; index < other.components.length; index++) {
            if (this.components[index] === 1 && other.components[index] === 1) {
                ret.components[index] = 1;
            }
        }
        return ret;
    };
    Vector.prototype.equal = function (other) {
        if (this.components.length != other.components.length) {
            throw new EvalError('ベクトルの次元が異なります。');
        }
        for (var index = 0; index < other.components.length; index++) {
            if (this.components[index] != other.components[index]) {
                return false;
            }
        }
        return true;
    };
    return Vector;
}());
exports.Vector = Vector;
function makeVect(len, ind) {
    var comp = [];
    for (var i = 0; i < len; i++) {
        if (i === ind) {
            comp.push(1);
        }
        else {
            comp.push(0);
        }
    }
    return new Vector(comp);
}
exports.makeVect = makeVect;
function makeOneVect(len) {
    var comp = [];
    for (var i = 0; i < len; i++) {
        comp.push(1);
    }
    return new Vector(comp);
}
exports.makeOneVect = makeOneVect;
