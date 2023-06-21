import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Games } from '../../games/game';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  standalone: true,
  imports: [RouterLink,CommonModule]
})
export class GamesComponent {
  games = Games.games
  game: any | null;
  constructor(private route: ActivatedRoute) {
    this.game = this.games.find(game => game.id === this.route.snapshot.paramMap.get('game'));
  }
}
