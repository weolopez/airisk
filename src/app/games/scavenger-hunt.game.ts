import { Player } from "../services/player/player.service";
import { GameI } from "./game";

export class ScavengerHuntGame implements GameI {
  id: string = 'ScavengerHuntGame';
  name: string = 'Scavenger Hunt';
  description: string = 'Find all the items on the scavenger hunt list';
  players: Array<Player>;
  map: any;
  playerResources: number;
  aiResources: number;
  currentPlayer: Player | undefined;
  items: Array<string>;

  constructor() {
    this.players = [];
    this.playerResources = 0;
    this.aiResources = 0;
    this.items = ['item1', 'item2', 'item3', 'item4', 'item5'];
  }

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