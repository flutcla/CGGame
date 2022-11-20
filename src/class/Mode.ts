class _Mode {
  private score = 0;
  private gameCount = 1;
  private gameLimit = 5;
  constructor(private modeName: string){
  };

  public getModeName(): string {
    return this.modeName;
  }

  public getScore(): number {
    return this.score;
  }

  public addScore(n: number): void {
    this.score += n;
  }

  public isGameOver(): boolean {
    return this.gameCount >= this.gameLimit;
  }

  public setGameLimit(n: number) {
    this.gameLimit = n;
  }

  public getGameLimit(): number {
    return this.gameLimit;
  }

  public getGameCount(): number {
    return this.gameCount;
  }

  public resetGameCount(): void {
    this.gameCount = 1;
  }

  public resetScore(): void {
    this.score = 0;
  }

  public incrementGameCount(): void {
    this.gameCount++;
  }

}

export class Easy extends _Mode {
  constructor(){
    super('Easy');
    this.setGameLimit(5);
  };
}

export class Normal extends _Mode {
  constructor() {
    super('Normal');
  };
}

export class Hard extends _Mode {
  constructor() {
    super('Hard');
  };
}

export const Mode = {
  EASY: new Easy(),
  NORMAL: new Normal(),
  HARD: new Hard()
} as const;

export type Mode = typeof Mode[keyof typeof Mode]
