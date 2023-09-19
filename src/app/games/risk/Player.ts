import { GameState } from './Game';
import { Territory } from './Territory';

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

    attack(attackingTerritory: Territory, defendingTerritory: Territory, numDice: number): boolean {
        if (attackingTerritory.owner !== this) {
            throw new Error('Attacking territory does not belong to player');
        }

        if (defendingTerritory.owner === this) {
            throw new Error('Defending territory belongs to player');
        }

        if (!attackingTerritory.neighbors.includes(defendingTerritory)) {
            throw new Error('Territories are not neighbors');
        }

        if (attackingTerritory.armies <= 1) {
            throw new Error('Attacking territory does not have enough armies');
        }

        if (numDice < 1 || numDice > 3) {
            throw new Error('Invalid number of dice');
        }

        const attackingDice = this.rollDice(numDice);
        const defendingDice = this.rollDice(Math.min(2, defendingTerritory.armies));

        attackingDice.sort((a, b) => b - a);
        defendingDice.sort((a, b) => b - a);

        const numDiceToCompare = Math.min(attackingDice.length, defendingDice.length);

        for (let i = 0; i < numDiceToCompare; i++) {
            if (attackingDice[i] > defendingDice[i]) {
                defendingTerritory.armies--;
            } else {
                attackingTerritory.armies--;
            }
        }

        if (defendingTerritory.armies === 0) {
            // Move all but one army to the new territory
            defendingTerritory.armies = attackingTerritory.armies - 1;
            attackingTerritory.armies = 1;

            // Remove the defending territory from the old owner
            if (defendingTerritory.owner) {
                defendingTerritory.owner.removeTerritory(defendingTerritory);
            }

            // Add the defending territory to the new owner
            // Player.setOwner(defendingTerritory, this);
        }

        return defendingTerritory.armies === 0;
    }
    rollDice(numDice: number) {
        const dice = [];
        for (let i = 0; i < numDice; i++) {
            dice.push(Math.floor(Math.random() * 6) + 1);
        }
        return dice;
    }

    takeTurn = (gameState: GameState) => {
        if (this.isAI) {
            // Choose a random territory to attack from
            const attackingTerritory = this.territories[Math.floor(Math.random() * this.territories.length)];

            // Choose a random neighboring territory to attack
            const neighboringTerritories = attackingTerritory.neighbors;
            const defendingTerritory = neighboringTerritories[Math.floor(Math.random() * neighboringTerritories.length)];
            return this.attack(attackingTerritory, defendingTerritory, 3);
        } else {
            throw new Error("Method not implemented.");
        }
    }
}