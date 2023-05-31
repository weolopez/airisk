import {Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {MatListModule} from '@angular/material/list'
import {MatDividerModule} from '@angular/material/divider'
import { AppComponent } from '../app.component';
import { GameService } from '../services/game/game.service';
import { PlayerService } from '../services/player.service';
import { MapService } from '../services/map/map.service';
@Component({
  selector: 'selected-panel',
  templateUrl: './selected-panel.component.html',
  styleUrls: ['./selected-panel.component.scss'],
  standalone: true,
  imports: [MatDividerModule,MatListModule, NgIf, MatButtonModule],
})
export class SelectedPanelComponent {
  selected: any
  constructor(public gameService: GameService, public mapService: MapService, public playerService: PlayerService) {
    mapService.layer.subscribe(layer => {
      this.selected=layer
    })
  }
  showFiller = false;

}
