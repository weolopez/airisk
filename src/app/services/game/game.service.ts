import { Injectable } from '@angular/core';
import { PlayerService, Player } from '../player/player.service';
import { MapService } from '../map/map.service';
import { ActionI } from 'src/app/actions/action';


class Game {
  players: Array<Player>;
  map: Map<County, Player>;
  playerResources: number;
  aiResources: number;
  currentPlayer: Player | undefined;
  name: string;

  constructor() {
    this.name = 'AIRISK'
    this.players = [];
    this.map = new Map();
    this.playerResources = 0;
    this.aiResources = 0;
  }
}
class County {
}

class GameState {
  getCountyColor(county: County): string {
    throw new Error('Method not implemented.');
  }
  game: Game;

  // map: Map<County, Player>;
  // playerResources: number;
  // aiResources: number;
  // currentPlayer: Player | undefined;
  // selected: any | undefined;

  constructor() {
    this.game = new Game();
  }

}

@Injectable({
  providedIn: 'root',
})
export class GameService {

  selected: any;
  previous: any;
  game
  constructor(public mapService: MapService, public playerService: PlayerService) {
    this.game = new Game();
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
  nextAction(value: ActionI) {
    let actionString = `Player: ${this.playerService._currentPlayer.name} takes Action: ${value.Action.name_for_human} on ${this.mapService.selected.feature.properties.NAME}`
    this.mapService.selected.feature.properties.color = this.playerService._currentPlayer.color.background 
    this.mapService.selected.feature.properties.owner = this.playerService._currentPlayer.name 
    alert(actionString);
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