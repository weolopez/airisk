// game-state.model.ts

interface Player {
    id: string;
    name: string;
    armies: number;
    territories: string[];
    cards: string[];
    isEliminated: boolean;
  }
  
  interface Territory {
    id: string;
    owner: string;
    armies: number;
  }
  
  interface Turn {
    currentPlayer: string;
    phase: string;
  }
  
  interface Deck {
    cards: string[];
    discards: string[];
  }
  
  interface GameState {
    gameId: string;
    players: Player[];
    map: {
      territories: Territory[];
    };
    turn: Turn;
    deck: Deck;
    history: string[];
    rules: {
      tradeInValue: number;
      maxDeployPerTurn: number;
    };
  }
// game-state.service.ts
import { Injectable, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  private _gameState = new Signal<GameState>();

  get gameState() {
    return this._gameState.readOnly;
  }

  updateGameState(newState: GameState) {
    this._gameState.value = newState;
  }
}
  