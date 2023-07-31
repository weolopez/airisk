import { Component } from '@angular/core';
import { GameI } from '../game';
import { CardComponent } from 'src/app/components/card/card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MapComponent } from 'src/app/map/map.component';

@Component({
  selector: 'app-card-game',
  templateUrl: './card.game.html',
  styleUrls: ['./card.game.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MapComponent,
    MatCardModule,
    MatButtonModule,FormsModule,
    CardComponent
  ]
})
export class CardGame implements GameI {
  id: string = 'CardGame';
  name: string = 'Card Game';
  description: string = 'Card game like magic the gathering';
  map: any;
  playerResources: number;
  aiResources: number;
  items: Array<string>;

  features!: { type: string; geometry: { type: string; coordinates: number[]; }; properties: { name: string; address: string; description: string; image: string; website: string; phone: string; }; }[];
  constructor() {
    this.playerResources = 0;
    this.aiResources = 0;
    this.items = ['item1', 'item2', 'item3', 'item4', 'item5'];
  }
  gameOver(): unknown {
    throw new Error("Method not implemented.");
  }
  isGameOver(): boolean {
    throw new Error("Method not implemented.");
  }

}
