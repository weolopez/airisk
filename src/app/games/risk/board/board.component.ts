import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import territories from '../../../../assets/risk.json'

@Component({
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  standalone: true,
  imports: [ CommonModule, MatButtonModule ]
})
export class RiskBoardComponent {

  id: string = 'risk';
  name: string = 'Risk Game';
  description: string = 'Risk Board Game';
  map: any;
  playerResources: number;
  aiResources: number;
  items: Array<string>;

  territories: Array<any> = territories
  players: Array<any> = [
    { name: 'John', color: '#FF5733' },
    { name: 'Emily', color: '#33FFC1' },
    { name: 'David', color: '#FF33E9' },
    { name: 'Sarah', color: '#33FF57' },
    { name: 'Michael', color: '#FF5733' },
  ];
  features!: { type: string; geometry: { type: string; coordinates: number[]; }; properties: { name: string; address: string; description: string; image: string; website: string; phone: string; }; }[];
phase: any="init";
  currentPlayer: number=0;
  constructor() {
    this.playerResources = 0;
    this.aiResources = 0;
    this.items = ['item1', 'item2', 'item3', 'item4', 'item5'];
    //make a randome player go first
    this.currentPlayer = Math.floor(Math.random() * this.players.length);
  }
  assign() {
    let p=0
    console.log(this.territories.length)
    this.territories = this.territories.map(t => {
      t.owner = this.currentPlayer
      this.next()
      // p = p+1
      // if (p>=this.players.length) p = 0;
      return t
    })
  }
  shuffle(anyArray: Array<any>) {
    return  "any"
  }
  gameOver(): unknown {
    throw new Error("Method not implemented.");
  }
  isGameOver(): boolean {
    throw new Error("Method not implemented.");
  }
  strigify(obj:any): string {
    return JSON.stringify(obj);
  }
  next() {
    if (this.phase=='init') {
      let finished = this.territories.findIndex(t=>(!t.owner&&t.owner!==0))
      if (finished == -1) {
        this.phase = 'place'
        console.log(finished)
      }
      else console.log(finished)
    }
    this.currentPlayer = this.currentPlayer + 1
    if (this.currentPlayer >= this.players.length) this.currentPlayer=0
  }
  own(territory: any) {
    territory.owner=this.currentPlayer; 
    // this.next()
  }
}
