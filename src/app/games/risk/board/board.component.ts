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
    { name: 'John', color: 'lightblue', armies: 50 },
    { name: 'Emily', color: '#33FFC1', armies: 50 },
    { name: 'David', color: '#FF33E9', armies: 50 },
    { name: 'Sarah', color: '#33FF57', armies: 50 },
    { name: 'Michael', color: 'green', armies: 50 },
    { name: 'Tom', color: 'pink', armies: 50 },
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
  auto() {
// switch statment for the different phases of risk
    switch (this.phase) {
      case 'init':
        this.claim()
        this.phase = 'place'
        break;
      case 'place':
        this.place()
        this.phase = 'play'
        break;
      case 'play':
        this.play()
        this.phase = 'fortify'
        break;
      // case 'fortify':
      //   this.fortify()
      //   this.phase = 'place'
      //   break;
    }
  }
  place() {
    let all_armies_placed = false
    while (all_armies_placed == false) {
      this.players.forEach((p, index) => {
        // randomly select a territory that is owned by the player and place an army on it
        let available_territories = this.territories.filter(t => {
          console.log(t.owner)
        return  t.owner == index
        })
        if (available_territories.length > 0 && this.players[index].armies > 0) {
          let territory = available_territories[Math.floor(Math.random() * available_territories.length)]
          if (!territory.armies) territory.armies = 0
          territory.armies = territory.armies + 1
          this.players[index].armies = this.players[index].armies - 1
        } else {
          all_armies_placed = this.players.every(p => p.armies <= 0)
        }
      })
    }
  }
  // attack() {

  claim() {
        // loop until all territories are owned
        let territories_all_owned = false
        while (!territories_all_owned) {
          this.players.forEach((p, index) => {
            // randomly select a territory that is not owned and assign it to the player
            let available_territories = this.territories.filter(t => (!t.owner && t.owner !== 0) )
            if (available_territories.length >  0) {
            let territory = available_territories[Math.floor(Math.random() * available_territories.length)]
            territory.owner = index
            } else {
              territories_all_owned = true
            }
          })
        }
  }
  play() {
    // this is the main game loop, every round each player gets a turn, and can attack, fortify, or end their turn
    let game_over = false
    while (!game_over) {
      this.players.forEach((p, index) => {  
        //give player armys based on the number of territories they own
        p.armies = this.getTerritoriesByOwner(index).length / 3
        // randomly select a territory that is owned by the player and place an army on it
        
      })
    }
  }
 

getTerritoriesByOwner(player: any): Array<any> {
  return this.territories.filter(territory => territory.owner === player);
}

  rollDice(numDice: number) {
    throw new Error('Method not implemented.');
  }
  resolveBattle(attackRolls: any, defendRolls: any): string {
    throw new Error('Method not implemented.');
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
      else {
        console.log('next')
      }
    }
    this.currentPlayer = this.currentPlayer + 1
    if (this.currentPlayer >= this.players.length) this.currentPlayer=0
  }
  own(territory: any) {
    territory.owner=this.currentPlayer; 
    // this.next()
  }
}
