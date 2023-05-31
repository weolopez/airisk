import { Injectable } from '@angular/core';
import { PlayerService } from '../player.service';
import { Player } from '../../models/player.model';
import { MapService } from '../map/map.service';


class County {
}

class GameState {
  getCountyColor(county: County): string {
    throw new Error('Method not implemented.');
  }

  map: Map<County, Player>;
  playerResources: number;
  aiResources: number;
  currentPlayer: Player | undefined;
  selected: any | undefined;

  constructor() {
    this.map = new Map();
    this.playerResources = 0;
    this.aiResources = 0;
    // this.currentPlayer = Player.Human; // Assuming you have a Player enum
  }

  // You might have methods to manipulate the game state, like:
  // - Assigning a county to a player
  // - Updating resource counts
  // - Changing the current player
  // - etc.
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public name = 'AIRISK'
  public players: Array<Player> = [
    { id: 1, name: 'Player 1', color: 'pink', score: 0 },
    { id: 1, name: 'Player 2', color: 'blue', score: 0 },
    { id: 1, name: 'Player 3', color: 'seagreen', score: 0 }
  ]

  selected: any;
  previous: any;

  constructor(public mapService: MapService) {

  }
  set gameState(gameState: GameState) {
    this.gameState = gameState;
  }
  get gameState(): GameState {
    return this.gameState;
  }
  set currentPlayer(player: Player) {
    // this.selected = player.selected
    this.gameState.currentPlayer = player
  }
  get currentPlayer(): Player {
    if (!this.gameState.currentPlayer) {
      throw new Error('Current player is not set');
    }
    return this.gameState.currentPlayer;
  }


  // Player or AI action
  attack(county: County): void {
    // Implementation here
  }

  // Player or AI action
  fortify(county: County): void {
    // Implementation here
  }

  // AI decision-making logic
  aiTurn(): void {
    // AI logic here
  }

  // Update game state according to the rules of the game
  updateGameState(): void {
    // Update game state here
  }

  // Get county color for UI binding
  getCountyColor(county: County): string {
    // Retrieve the color from your game state
    // This is a simplification, actual implementation may vary
    // return this.gameState.getCountyColor(county);
    return 'red';
  }

  // Game progression logic
  gameLoop(): void {
    while (!this.isGameOver()) {
      for (let player of this.players) {
        this.currentPlayer = player;

        while (!this.isPlayerTurnOver()) {
          this.processPlayerInput();
          this.updateGameState();
        }
      }
    }

  }
  nextPlayer() {
    this.currentPlayer = this.players[(this.players.indexOf(this.currentPlayer) + 1) % this.players.length];
  }
  mapClick(event: any) {
  }

  isGameOver() {
    throw new Error('Function not implemented.')
    return false
  }

  isPlayerTurnOver() {
    throw new Error('Function not implemented.')
    return false
  }

  processPlayerInput() {
    throw new Error('Function not implemented.');
  }


}