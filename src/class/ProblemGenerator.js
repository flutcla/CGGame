"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemGenerator = exports.getSingerNames = exports.getSongName = exports.getEventName = void 0;
var dataOneHot = require("../data/data_onehot.json");
var DataOneHotIndices = require("../data/data_onehot_indices.json");
var Mode_1 = require("../class/Mode");
var vector_1 = require("../type/vector");
var shuffle_1 = require("../function/shuffle");
var datum = dataOneHot.map(function (element) {
    return {
        event: new vector_1.Vector(element.event),
        song: new vector_1.Vector(element.song),
        singer: new vector_1.Vector(element.singer)
    };
});
;
var indices = DataOneHotIndices;
function getEventName(songData) {
    return indices.event[songData.event.components.findIndex(function (element) { return element === 1; })];
}
exports.getEventName = getEventName;
function getSongName(songData) {
    return indices.song[songData.song.components.findIndex(function (element) { return element === 1; })];
}
exports.getSongName = getSongName;
function getSingerNames(songData) {
    var ret = [];
    for (var i = 0; i < indices.singer.length; i++) {
        if (songData.singer.components[i] === 1) {
            ret.push(indices.singer[i]);
        }
    }
    return ret;
}
exports.getSingerNames = getSingerNames;
var ProblemGenerator = /** @class */ (function () {
    function ProblemGenerator(mode) {
        var _this = this;
        this.probSongs = [];
        this.probEvents = [];
        this.mode = mode;
        this.eventInd = Math.floor(Math.random() * (indices.event.length));
        this.eventVec = (0, vector_1.makeVect)(indices.event.length, this.eventInd);
        this.eventName = indices.event[this.eventInd];
        this.songs = datum.filter(function (element) { return element.event.equal(_this.eventVec); });
        var possibleEvents = (0, vector_1.makeVect)(indices.event.length, -1);
        while (true) {
            var songInd = Math.floor(Math.random() * this.songs.length);
            this.probSongs.push(this.songs[songInd]);
            this.songs.splice(songInd, 1);
            if (this.mode == Mode_1.Mode.EASY) {
                if (possibleEvents.equal(this.possibleEventsBySong(this.probSongs))) {
                    this.probSongs.splice(this.probSongs.length - 1, 1);
                }
                else {
                    possibleEvents = this.possibleEventsBySong(this.probSongs);
                    if (this.distinguishableBySong(this.probSongs)) {
                        break;
                    }
                }
            }
            else {
                throw new Error('Not Implemented');
            }
        }
        this.probEvents.push(this.eventName);
        while (true) {
            var i = Math.floor(Math.random() * (indices.event.length));
            if (this.probEvents.indexOf(indices.event[i]) === -1) {
                this.probEvents.push(indices.event[i]);
                if (this.probEvents.length >= 4) {
                    break;
                }
            }
        }
        this.probEvents = (0, shuffle_1.shuffle)(this.probEvents);
    }
    ;
    ProblemGenerator.prototype.possibleEventsBySong = function (songDatum) {
        var possibleEvents = (0, vector_1.makeOneVect)(songDatum[0].event.components.length);
        songDatum.forEach(function (data) {
            var possibleInner = data.event;
            datum.forEach(function (data2) {
                if (data.song.equal(data2.song)) {
                    possibleInner = possibleInner.or(data2.event);
                }
            });
            possibleEvents = possibleEvents.and(possibleInner);
        });
        return possibleEvents;
    };
    ProblemGenerator.prototype.distinguishableBySong = function (songDatum) {
        var possibleEvents = this.possibleEventsBySong(songDatum);
        return possibleEvents.components.filter(function (element) { return element === 1; }).length === 1;
    };
    ProblemGenerator.prototype.distinguishable = function (songDatum) {
        var possibleEvents = songDatum[0].event;
        songDatum.forEach(function (data) {
            datum.forEach(function (data2) {
                if (data.song.equal(data2.song) && data.singer.equal(data2.singer)) {
                    possibleEvents.or(data.event);
                }
            });
        });
        return possibleEvents.components.filter(function (element) { return element == 1; }).length == 1;
    };
    ProblemGenerator.prototype.generateNext = function () {
        // Uncaught TypeError: Cannot read properties of undefined (reading 'song')
        while (true) {
            var songInd = Math.floor(Math.random() * this.songs.length);
            var song = this.songs[songInd];
            this.songs.splice(songInd, 1);
            if (this.probSongs.map(function (x) { return getSongName(x); }).indexOf(getSongName(song)) === -1) {
                this.probSongs.push(song);
                return song;
            }
        }
    };
    return ProblemGenerator;
}());
exports.ProblemGenerator = ProblemGenerator;
