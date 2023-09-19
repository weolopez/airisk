import { GameState } from './Game';
import { Territory } from './Territory';

export class Action {
    apply(state: GameState) {
        switch (this.type) {
            case Action.PLACE_ARMIES:
                this.applyPlaceArmies(state);
                break;
            case Action.ATTACK:
                this.applyAttack(state);
                break;
            case Action.MOVE_ARMIES:
                this.applyMoveArmies(state);
                break;
        }
    }
    applyPlaceArmies(state: GameState) {
        throw new Error('Method not implemented.');
    }
    applyMoveArmies(state: GameState) {
        throw new Error('Method not implemented.');
    }

    private applyAttack(state: GameState) {
        const attackingTerritory = this.payload.attackingTerritory;
        const defendingTerritory = this.payload.defendingTerritory;
        const numDice = this.payload.numDice;

        const attackingPlayer = attackingTerritory.owner;
        const defendingPlayer = defendingTerritory.owner;

        const attackingRolls = attackingTerritory.rollDice(numDice);
        const defendingRolls = defendingTerritory.rollDice(Math.min(defendingTerritory.numArmies, numDice));

        const results = this.compareRolls(attackingRolls, defendingRolls);

        if (results.attackerWins) {
            defendingTerritory.numArmies = results.defenderRemaining;
            defendingTerritory.owner = attackingPlayer;
            attackingPlayer.territories.push(defendingTerritory);
            defendingPlayer.territories.splice(defendingPlayer.territories.indexOf(defendingTerritory), 1);
        } else {
            attackingTerritory.numArmies = results.attackerRemaining;
        }
    }
    static PLACE_ARMIES = 'PLACE_ARMIES';
    static ATTACK = 'ATTACK';
    static MOVE_ARMIES = 'MOVE_ARMIES';
  
    type: string;
    payload: Territory;
  
    constructor(type: string, payload: any) {
      this.type = type;
      this.payload = payload;
    }
  
    static placeArmies(territory: Territory, numArmies: number): Action {
      return new Action(Action.PLACE_ARMIES, { territory, numArmies });
    }
  
    static attack(attackingTerritory: Territory, defendingTerritory: Territory, numDice: number): Action {
      return new Action(Action.ATTACK, { attackingTerritory, defendingTerritory, numDice });
    }
  
    static moveArmies(sourceTerritory: Territory, destTerritory: Territory, numArmies: number): Action {
      return new Action(Action.MOVE_ARMIES, { sourceTerritory, destTerritory, numArmies });
    }
    private compareRolls(attackerRolls: number[], defenderRolls: number[]): { attackerWins: boolean, attackerRemaining: number, defenderRemaining: number } {
        attackerRolls.sort((a, b) => b - a);
        defenderRolls.sort((a, b) => b - a);

        const numDice = Math.min(attackerRolls.length, defenderRolls.length);
        let attackerWins = false;
        let attackerRemaining = 0;
        let defenderRemaining = 0;

        for (let i = 0; i < numDice; i++) {
            if (attackerRolls[i] > defenderRolls[i]) {
                defenderRemaining--;
            } else {
                attackerRemaining--;
            }
        }

        if (attackerRemaining >= 0) {
            attackerWins = true;
            defenderRemaining = defenderRolls.length - numDice;
        } else {
            attackerRemaining = attackerRolls.length - numDice;
        }

        return { attackerWins, attackerRemaining, defenderRemaining };
    }
  }