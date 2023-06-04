import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GameService } from '../../services/game/game.service';
import { PlayerService } from '../../services/player.service';
import { CommonModule } from '@angular/common';
import { PlayerColorDirective } from '../../directives/currrent-player-color';
import { ThemePalette } from '@angular/material/core';
import { MapService } from '../../services/map/map.service';
import { Actions } from '../../actions/action';

@Component({
  selector: 'app-game-state',
  templateUrl: './game-state.component.html',
  styleUrls: ['./game-state.component.scss'],
  imports: [PlayerColorDirective, CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  standalone: true,
})
export class GameStateComponent {
  currentPlayer = new FormControl();
  currentLayer: any;
  currentAction: FormControl<any> = new FormControl();
  actions: any;

  favorite() {
    if (this.currentPlayer.value) {
      // this.playerService._currentPlayer.score(this.currentPlayer.value);
    }
  }
  constructor( public gameService: GameService,  public playerService: PlayerService, public mapService: MapService) {
    this.currentPlayer.valueChanges.subscribe(() => this.onChangeCurrentPlayer());
    this.currentAction.valueChanges.subscribe((value) => {
      console.log(value);
    })
    this.mapService.layer.subscribe((layer) => this.currentLayer = layer);
    this.actions = Actions.action
   }

  onChangeCurrentPlayer() {
    if (this.currentPlayer.value) {
      this.playerService.currentPlayer.next(this.currentPlayer.value);
    }
  }
}
