import { Injectable } from '@angular/core';
import { MapService } from '../map/map.service';
import { ActionI } from 'src/app/actions/action';
import { GameI } from 'src/app/games/game';
import { GoldGame } from 'src/app/games/gold/gold.game';
import { _RecycleViewRepeaterStrategy } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class GameService {

  selected: any;
  previous: any;
  game!: GameI;
  _isGameOver: boolean = false;
  playerLocation: GeolocationPosition = {
    coords: {
      latitude: 33.7748, longitude: -84.294, accuracy: 0,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null
    }, timestamp: 0
  };
  loop: any

  gameState: BehaviorSubject<any> = new BehaviorSubject(undefined)
  constructor(public mapService: MapService) {
    // this.game = new GoldGame(mapService);
  }
  // set gameState(gameState: GameState) {
  //   this.gameState = gameState;
  // }
  // get gameState(): GameState {
  //   return this.gameState;
  // }

  // AI decision-making logic
  aiTurn(): void {
    // AI logic here
  }

  // Update game state according to the rules of the game
  updateGameState(): void {
    // Update game state here
  }

  // Game progression logic
  gameLoop(options: any): void {

    if (options.timedLoop) {
      //check player location every 100ms
      this.loop = setInterval(() => {
        if (options.trackPlayerLocation)
          navigator.geolocation.getCurrentPosition((position) => {
            this.gameState.next({playerLocation: [this.playerLocation.coords.latitude, this.playerLocation.coords.longitude]})
          })
          this.isGameOver(this.game.isGameOver())
      }, 100);
  }

  // while (!this.isGameOver()) {

  // this.mapService.moveEntity('player', [this.playerLocation.coords.latitude, this.playerLocation.coords.longitude])//, this.playerLocation.coords.accuracy)

  // Generate a prompt for the AI
  // let prompt = this.generatePrompt(this.gameState);

  // Get the AI's response
  // let response = this.getAIResponse(prompt);

  // Parse the response into an action
  // let action = this.parseResponse(response);

  // Execute the action
  // this.executeAction(action);

  // for (let player of this.players) {
  //   this.currentPlayer = player;

  //   while (!this.isPlayerTurnOver()) {
  //     this.processPlayerInput();
  //     this.updateGameState();
  //   }
  // }
  // }

}

executeAction(action: void) {
  throw new Error('Method not implemented.');
}
nextAction(value: ActionI) {
  // let actionString = `Player: ${this.playerService._currentPlayer.name} takes Action: ${value.Action.name_for_human} on ${this.mapService.selected.feature.properties.NAME}`
  // this.mapService.selected.feature.properties.color = this.playerService._currentPlayer.color.background
  // this.mapService.selected.feature.properties.owner = this.playerService._currentPlayer.name
  // alert(actionString);
}
parseResponse(response: void) {

}
getAIResponse(prompt: void) {
  throw new Error('Method not implemented.');
}
mapClick(event: any) {
}

isGameOver(setGameOver: boolean) {
  if (setGameOver) {
    clearInterval(this.loop);
    this._isGameOver = true
    this.game.gameOver() 
  }
  return this._isGameOver
}

isPlayerTurnOver() {
  throw new Error('Function not implemented.')
  return false
}

processPlayerInput() {
  throw new Error('Function not implemented.');
}


}