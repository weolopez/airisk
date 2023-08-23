import { Player } from "./Player";

export class Territory {
    attack(defendingTerritory: Territory, numDice: any) {
        throw new Error('Method not implemented.');
    }
  name: string;
  continent: string;
  armies: number;
  owner: Player | null;
  neighbors: Territory[] = [];
    numTroops: number;

  constructor(name: string, continent: string, armies?: number) {
    this.name = name;
    this.continent = continent;
    this.armies = armies;
    this.owner = null;
  }

  setOwner(player: Player): void {
    this.owner = player;
    player.addTerritory(this);
  }

  removeOwner(): void {
    if (this.owner) {
      this.owner.removeTerritory(this);
      this.owner = null;
    }
  }
}