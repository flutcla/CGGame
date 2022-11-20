import { Vector } from "./vector";

export type _SongData = {
  event: number[],
  song: number[],
  singer: number[],
}

export type SongData = {
  event: Vector,
  song: Vector,
  singer: Vector,
};