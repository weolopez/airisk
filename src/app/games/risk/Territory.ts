import { Player } from "./Player";

export class Territory {
    attackingTerritory: any;
    defendingTerritory: any;
    numDice: any;
    attack(defendingTerritory: Territory, numDice: any) {
        throw new Error('Method not implemented.');
    }
  name: string;
  continent: string;
  armies: number;
  owner: Player | null;
  territories: Territory[] = [];
  neighbors: Territory[] = [];
    numTroops: number;

  constructor(name: string, continent: string, armies?: number) {
    this.name = name;
    this.continent = continent;
    this.armies = armies;
    this.owner = null;
  }

  static setOwner(territory: any , player: Player): void {
    territory.owner = player;
    player.addTerritory(territory);
  }

  static removeOwner(territory: any): void {
    if (territory.owner) {
      territory.owner = null;
    }
  }
  
}