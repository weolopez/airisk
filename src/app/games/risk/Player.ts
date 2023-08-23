import { GameState } from './Game';
import { Territory } from './Territory';
import { Action } from './Action';

export class Player {
    name: string;
    color: string;
    territories: Territory[];
    isAI: boolean;

    constructor(name: string, color: string, isAI: boolean = true) {
        this.name = name;
        this.color = color;
        this.territories = [];
        this.isAI = isAI;
    }

    addTerritory(territory: Territory): void {
        this.territories.push(territory);
    }

    removeTerritory(territory: Territory): void {
        const index = this.territories.indexOf(territory);
        if (index !== -1) {
            this.territories.splice(index, 1);
        }
    }

    takeTurn(gameState: GameState) {
        if (this.isAI) {
            // Choose a random territory to attack from
            const attackingTerritory = this.territories[Math.floor(Math.random() * this.territories.length)];

            // Choose a random neighboring territory to attack
            const neighboringTerritories = attackingTerritory.neighbors;
            const defendingTerritory = neighboringTerritories[Math.floor(Math.random() * neighboringTerritories.length)];
            return Action.attack(attackingTerritory, defendingTerritory, 3);
        } else {
            throw new Error("Method not implemented.");
        }
    }
}