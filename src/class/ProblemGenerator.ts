import dataOneHot = require('../data/data_onehot.json');
import DataOneHotIndices = require('../data/data_onehot_indices.json');
import { Mode } from '../class/Mode';
import { makeVect, makeOneVect, Vector } from '../type/vector';
import { SongData, _SongData } from '../type/SongData';
import { shuffle } from '../function/shuffle';

const datum: SongData[] = (dataOneHot as _SongData[]).map(element => {
  return {
    event: new Vector(element.event),
    song: new Vector(element.song),
    singer: new Vector(element.singer)
  };
});;
const indices = DataOneHotIndices;

export function getEventName(songData: SongData): string {
  return indices.event[songData.event.components.findIndex(element => element === 1)];
}
export function getSongName(songData: SongData): string {
  return indices.song[songData.song.components.findIndex(element => element === 1)];
}
export function getSingerNames(songData: SongData): string[] {
  let ret: string[] = [];
  for(let i = 0; i < indices.singer.length; i++){
    if (songData.singer.components[i] === 1) {
      ret.push(indices.singer[i]);
    }
  }
  return ret;
}

export class ProblemGenerator {
  public mode: Mode;
  public eventInd: number;
  public eventVec: Vector;
  public eventName: string;
  public songs: SongData[];
  public probSongs: SongData[] = [];
  public probEvents: string[] = [];

  constructor(mode: Mode){
    this.mode = mode;
    this.eventInd = Math.floor(Math.random() * (indices.event.length));
    this.eventVec = makeVect(indices.event.length, this.eventInd);
    this.eventName = indices.event[this.eventInd];
    this.songs = datum.filter(element => element.event.equal(this.eventVec));

    let possibleEvents = makeVect(indices.event.length, -1);
    while (true) {
      let songInd = Math.floor(Math.random() * this.songs.length);
      this.probSongs.push(this.songs[songInd]);
      this.songs.splice(songInd, 1);
      if (this.mode == Mode.EASY) {
        if (possibleEvents.equal(this.possibleEventsBySong(this.probSongs))) {
          this.probSongs.splice(this.probSongs.length - 1, 1);
        } else {
          possibleEvents = this.possibleEventsBySong(this.probSongs);
          if (this.distinguishableBySong(this.probSongs)) {
            break;
          }
        }
      } else {
        throw new Error('Not Implemented');
      }
    }

    this.probEvents.push(this.eventName);
    while(true){
      let i = Math.floor(Math.random() * (indices.event.length));
      if (this.probEvents.indexOf(indices.event[i]) === -1) {
        this.probEvents.push(indices.event[i]);
        if (this.probEvents.length >= 4) {
          break;
        }
      }
    }

    this.probEvents = shuffle(this.probEvents);
  };

  public possibleEventsBySong(songDatum: SongData[]): Vector {
    let possibleEvents = makeOneVect(songDatum[0].event.components.length);
    songDatum.forEach(data => {
      let possibleInner = data.event;
      datum.forEach(data2 => {
        if (data.song.equal(data2.song)) {
          possibleInner = possibleInner.or(data2.event);
        }
      });
      possibleEvents = possibleEvents.and(possibleInner);
    });
    return possibleEvents;
  }

  public distinguishableBySong(songDatum: SongData[]): boolean {
    let possibleEvents = this.possibleEventsBySong(songDatum);
    return possibleEvents.components.filter(element => element === 1).length === 1;
  }

  public distinguishable(songDatum: SongData[]): boolean {
    let possibleEvents = songDatum[0].event;
    songDatum.forEach(data => {
      datum.forEach(data2 => {
        if (data.song.equal(data2.song) && data.singer.equal(data2.singer)) {
          possibleEvents.or(data.event);
        }
      });
    });
    return possibleEvents.components.filter(element => element == 1).length == 1;
  }

  public generateNext(): SongData {
    // Uncaught TypeError: Cannot read properties of undefined (reading 'song')
    while (true) {
      let songInd = Math.floor(Math.random() * this.songs.length);
      let song = this.songs[songInd];
      this.songs.splice(songInd, 1);
      if (this.probSongs.map(x => getSongName(x)).indexOf(getSongName(song)) === -1) {
        this.probSongs.push(song);
        return song;
      }
    }
  }
}
