export class Player implements Player {
  set color(color: string) {
    this.color = color;
  }
  get color(): string {
    return this.color;
  }
  set score(score: number) {
    this.score = score;
  }
  get score(): number {
    return this.score;
  }
  set name(name: string) {
    this.name = name;
  }
  get name(): string {
    return this.name;
  }
  set id(id: number) {
    this.id = id;
  }
  get id(): number {
    return this.id;
  }
  

}