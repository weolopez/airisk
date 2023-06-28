import { GameI } from "./game";

export class ScavengerHuntGame implements GameI {
  id: string = 'ScavengerHuntGame';
  name: string = 'Scavenger Hunt';
  description: string = 'Find all the items on the scavenger hunt list';
  map: any;
  playerResources: number;
  aiResources: number;
  items: Array<string>;

  constructor() {
    this.playerResources = 0;
    this.aiResources = 0;
    this.items = ['item1', 'item2', 'item3', 'item4', 'item5'];
  }
  gameOver(): unknown {
    throw new Error("Method not implemented.");
  }
  isGameOver(): boolean {
    throw new Error("Method not implemented.");
  }
  features!: { type: string; geometry: { type: string; coordinates: number[]; }; properties: { name: string; address: string; description: string; image: string; website: string; phone: string; }; }[];

  start() {
    // Start the game
  }

  end() {
    // End the game
  }

  addItem(item: string) {
    this.items.push(item);
  }

  removeItem(item: string) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
}