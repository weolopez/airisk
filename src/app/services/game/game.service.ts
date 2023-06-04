import { Injectable } from '@angular/core';
import { PlayerService, Player } from '../player.service';
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

  // Game progression logic
  gameLoop(): void {
    while (!this.isGameOver()) {

      // Generate a prompt for the AI
      let prompt = this.generatePrompt(this.gameState);

      // Get the AI's response
      let response = this.getAIResponse(prompt);

      // Parse the response into an action
      let action = this.parseResponse(response);

      // Execute the action
      this.executeAction(action);

      // for (let player of this.players) {
      //   this.currentPlayer = player;

      //   while (!this.isPlayerTurnOver()) {
      //     this.processPlayerInput();
      //     this.updateGameState();
      //   }
      // }
    }

  }

  generatePrompt(gameState: GameState) {
    throw new Error('Method not implemented.');
  }

  executeAction(action: void) {
    throw new Error('Method not implemented.');
  }
  parseResponse(response: void) {
    
  }
  getAIResponse(prompt: void) {
    throw new Error('Method not implemented.');
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