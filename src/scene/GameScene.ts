import { Game } from 'phaser';
import { Button } from '../class/Button';
import { Mode } from '../class/Mode';
import { getSingerNames, getSongName, ProblemGenerator } from '../class/ProblemGenerator';
import { shuffle } from '../function/shuffle';
import { SongData } from '../type/SongData';

export class GameScene extends Phaser.Scene {
  private drawIndex = 0;
  private mode: Mode = Mode.EASY;
  private pg?: ProblemGenerator;
  private textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
    fontSize: '24px'
  };
  private width?: number;
  private height?: number;
  private bgLayer?: Phaser.GameObjects.Container;
  private uiLayer?: Phaser.GameObjects.Container;
  private score: number = 100;
  private scoreText?: Phaser.GameObjects.Text;
  private gameCountText?: Phaser.GameObjects.Text;

  constructor() {
    super('game');
  }

  init(data: any){
    this.mode = data.mode;
  }

  create() {
    this.drawIndex = 0;
    const { width, height } = this.game.canvas;
    this.width = width;
    this.height = height;
    this.bgLayer = this.add.container(0, 0);
    this.uiLayer = this.add.container(0, 0);
    this.bgLayer.add(new Phaser.GameObjects.Text(this, 20, this.height - 40, this.mode.getModeName(), this.textStyle).setOrigin(0));
    this.scoreText = new Phaser.GameObjects.Text(this, this.width - 20, this.height - 40, 'Score: ' + this.mode.getScore().toLocaleString() + ' + ' + this.score, this.textStyle).setOrigin(1, 0);
    this.bgLayer.add(this.scoreText);
    this.gameCountText = new Phaser.GameObjects.Text(this, this.width / 2, this.height - 40, this.mode.getGameCount() + ' / ' + this.mode.getGameLimit(), this.textStyle).setOrigin(0.5, 0);
    this.bgLayer.add(this.gameCountText);

    this.pg = new ProblemGenerator(this.mode);
    this.drawSongs();
    this.drawChoices();

    if (this.game.config.gameVersion === 'debug') console.log(this.pg!.eventName);
  }

  public reduceScore(n: number) {
    if (this.score - n >= 0) {
      this.score -= n;
      this.scoreText?.destroy();
      this.scoreText = new Phaser.GameObjects.Text(this, this.width! - 20, this.height! - 40, 'Score: ' + this.mode.getScore().toLocaleString() + ' + ' + this.score, this.textStyle).setOrigin(1, 0);
      this.bgLayer!.add(this.scoreText);
    } else {
      this.score = 0;
    }
  }

  drawSongs(showNextButton = true) {
    let songs = this.pg!.probSongs;
    for(; this.drawIndex<songs.length; this.drawIndex++){
      let songRow = new SongRow(this, this.bgLayer!, this.uiLayer!, songs[this.drawIndex], this.drawIndex);
    }

    if(showNextButton) {
      const hintButton = new Button(
        '楽曲追加',
        () => {
          this.reduceScore(10);
          hintButton.destroy();
          this.pg!.generateNext();
          this.drawSongs(songs.length < 8);
        },
        this,
        this.uiLayer!,
        40,
        40 * (songs.length + 1),
        {
          xOrigin: 0,
          yOrigin: 0.5,
        }
      );
    }
  }

  drawChoices() {
    let events = this.pg!.probEvents;
    for(let i=0; i<events.length; i++){
      new Button(
        events[i],
        () => {
          this.score = 100;
          let isCorrect = events[i] === this.pg!.eventName;
          if (isCorrect) {
            this.mode.addScore(this.score);
          }
          let buttonText = isCorrect ? '正解！' : '不正解 (' + this.pg!.eventName + ')'
          new Button(
            buttonText,
            () => {
              if (this.mode.isGameOver()) {
                let score = this.mode.getScore();
                this.mode.resetGameCount();
                this.mode.resetScore();
                this.scene.start('ending', {score: score});
              } else {
                this.mode.incrementGameCount();
                this.gameCountText?.destroy;
                this.gameCountText = new Phaser.GameObjects.Text(this, this.width! / 2, this.height! - 40, this.mode.getGameCount() + ' / ' + this.mode.getGameLimit(), this.textStyle).setOrigin(0.5, 0);
                this.bgLayer!.add(this.gameCountText);
                this.newProblem();
              }
            },
            this,
            this.uiLayer!,
            this.width! / 2,
            this.height! - 140,
            {
              buttonWidth: this.width! - 20,
              buttonHeight: this.height! / 3 - 20
            }
          );

        },
        this,
        this.uiLayer!,
        this.width! / 2,
        this.height! - 80 - 40 * i,
        {
          buttonWidth: this.width! - 50,
        }
      );
    }
  }

  newProblem() {
    this.bgLayer!.destroy();
    this.uiLayer!.destroy();
    this.create();
  }
}

class SongRow {
  private textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
    fontSize: '24px'
  };
  private singerIndex = 0;
  private singers: Array<string>;
  private x = 0;
  private y = 0;
  private songNameText: Phaser.GameObjects.Text;
  constructor(
    private scene: GameScene,
    private bgLayer: Phaser.GameObjects.Container,
    private uiLayer: Phaser.GameObjects.Container,
    private song: SongData,
    private drawIndex: number,
  ){
    this.singers = shuffle(getSingerNames(song)).filter((x) => x != '');
    this.x = 40;
    this.y = 40 + 40 * this.drawIndex;
    this.songNameText = new Phaser.GameObjects.Text(
      this.scene,
      this.x,
      this.y,
      getSongName(this.song),
      this.textStyle)
      .setOrigin(0, 0.5);
    this.bgLayer!.add(this.songNameText);
    this.x += this.songNameText.width + 20;
    this.drawSingerHint();
  }

  public drawSingerHint(noSingerLeft = false) {
    if(!noSingerLeft) {
      let singerHintButton = new Button(
        '歌唱者ヒント',
        () => {
          this.scene.reduceScore(5);
          singerHintButton.destroy();
          let singerNameText = new Phaser.GameObjects.Text(
            this.scene,
            this.x,
            this.y,
            this.singers[this.singerIndex],
            this.textStyle)
            .setOrigin(0, 0.5);
          this.bgLayer.add(singerNameText);
          this.singerIndex += 1;
          this.x += singerNameText.width + 20;
          if (this.scene.game.config.gameVersion === 'debug') console.log(this.singers);
          if (this.x + singerHintButton.rect.width >= this.scene.game.canvas.width) {
            this.bgLayer.add(
              new Phaser.GameObjects.Text(
                this.scene,
                this.x,
                this.y,
                this.singers.length != this.singerIndex ? '・・・' : '',
                this.textStyle)
                .setOrigin(0, 0.5)
            )
          } else {
            this.drawSingerHint(
              this.singerIndex >= this.singers.length
            );
          }
        },
        this.scene,
        this.uiLayer,
        this.x,
        this.y,
        {
          xOrigin: 0,
          yOrigin: 0.5
        }
      )
    }

  }
}
