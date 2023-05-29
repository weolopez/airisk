import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GameService } from '../../services/game/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-state',
  templateUrl: './game-state.component.html',
  styleUrls: ['./game-state.component.scss'],
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  standalone: true,
})
export class GameStateComponent {
  currentPlayer = new FormControl();

  constructor(public gameService: GameService) { }

  onChangeCurrentPlayer() {
    if (this.currentPlayer.value) {
      this.gameService.currentPlayer = this.currentPlayer.value;
    }
  }
}
