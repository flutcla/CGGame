export class Vector{
  public components: number[]
  constructor(components: number[]) {
    this.components = components;
  }

  public or(other: Vector): Vector {
    if(this.components.length != other.components.length){
      throw new EvalError('ベクトルの次元が異なります。');
    }
    let ret = makeVect(this.components.length, -1);
    for (let index = 0; index < other.components.length; index++) {
      if(this.components[index] === 1 || other.components[index] === 1){
        ret.components[index] = 1;
      }
    }
    return ret;
  }

  public and(other: Vector): Vector {
    if (this.components.length != other.components.length) {
      throw new EvalError('ベクトルの次元が異なります。');
    }
    let ret = makeVect(this.components.length, -1);
    for (let index = 0; index < other.components.length; index++) {
      if (this.components[index] === 1 && other.components[index] === 1) {
        ret.components[index] = 1;
      }
    }
    return ret;
  }

  public equal(other: Vector): boolean {
    if (this.components.length != other.components.length) {
      throw new EvalError('ベクトルの次元が異なります。');
    }
    for (let index = 0; index < other.components.length; index++) {
      if (this.components[index] != other.components[index]) {
        return false;
      }
    }
    return true;
  }
}

export function makeVect(len: number, ind: number): Vector {
  let comp: number[] = []
  for (let i = 0; i < len; i++) {
    if (i === ind) {
      comp.push(1);
    } else {
      comp.push(0);
    }
  }
  return new Vector(comp);
}

export function makeOneVect(len: number): Vector {
  let comp: number[] = []
  for (let i = 0; i < len; i++) {
    comp.push(1);
  }
  return new Vector(comp);
}
