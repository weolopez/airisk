import { Component, HostListener } from '@angular/core';
import { MapComponent } from './map/map.component';
import { SelectedPanelComponent } from './components/selected-panel/selected-panel.component';
import { GameService } from './services/game/game.service';
// import { MapService } from './services/map.service';

import { GameStateComponent } from "./components/game-state/game-state.component";
import { MapService } from './services/map/map.service';
import L from 'leaflet';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'airisk';
  center: [number, number] = [-84.294, 33.7748]
  zoom: number = 13;

  selected: any;
  lat: any = 33.7748;
  lng: any = -84.294;
  delta: any = 0.0001;
  isSim=false;

    @HostListener('document:keydown.arrowup', ['$event'])
    onArrowUp(event: KeyboardEvent) {
      this.lat += this.delta;
      if (this.isSim) this.gameService.gameState.next({playerLocation: [this.lat, this.lng]})
    }

    @HostListener('document:keydown.arrowdown', ['$event'])
    onArrowDown(event: KeyboardEvent) {
      this.lat -= this.delta;
      if (this.isSim) this.gameService.gameState.next({playerLocation: [this.lat, this.lng]})
    }

    @HostListener('document:keydown.arrowleft', ['$event'])
    onArrowLeft(event: KeyboardEvent) {
      this.lng -= this.delta;
      if (this.isSim) this.gameService.gameState.next({playerLocation: [this.lat, this.lng]})
    }

    @HostListener('document:keydown.arrowright', ['$event'])
    onArrowRight(event: KeyboardEvent) {
      this.lng += this.delta
      if (this.isSim) this.gameService.gameState.next({playerLocation: [this.lat, this.lng]})
    }
    marker: any;
    constructor(public gameService: GameService) {
      gameService.gameState.subscribe((state: any) => {
        if (state.isSim!=undefined) {
          this.isSim = state.isSim
        }
      })
      
    }
  }
  


// this.center = [lat, lng];
// this.zoom = 8;