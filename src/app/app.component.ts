import { Component } from '@angular/core';
import { MapComponent } from './map/map.component';
import { SelectedPanelComponent } from './selected-panel/selected-panel.component';
import { GameService } from './services/game/game.service';
// import { MapService } from './services/map.service';

import { PlayerService } from './services/player.service';
import { GameStateComponent } from "./components/game-state/game-state.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    providers: [GameService, PlayerService],
    imports: [MapComponent, SelectedPanelComponent, GameStateComponent]
})
export class AppComponent {
  title = 'airisk';
  center: [number, number] = [51.505, -0.09]
  zoom: number = 13;

  selected: any;
  constructor(public gameService: GameService ) { 
  }
  
}


// this.center = [lat, lng];
// this.zoom = 8;