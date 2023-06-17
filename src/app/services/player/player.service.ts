import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Player {
  id: number;
  name: string;
  color: {
    background: string;
    componentBackground: string;
    text: string;
  };
  score: number;
  owned?: {
    counties: Array<any>;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  static _ps: any
  public players: Array<Player> = [
    {
      id: 1, name: 'Player 1',
      color: {
        background: 'darkred',
        componentBackground: 'pink',
        text: 'black'
      },
      score: 0
    },
    {
      id: 2, name: 'Player 2',
      color: {
        background: 'darkblue',
        componentBackground: 'lightblue',
        text: 'black'
      },
      score: 0
    },
    {
      id: 3, name: 'Player 3',
      color: {
        background: 'darkgreen',
        componentBackground: 'darkseagreen',
        text: 'black'
      },
      owned: {
        counties: [],
      },
      score: 0
    },
  ]
  currentPlayer: BehaviorSubject<Player> = new BehaviorSubject(this.players[0])
  _currentPlayer: Player = this.players[0];
  constructor() {
    this.currentPlayer.subscribe(player => {
      if (!player) return;
      this._currentPlayer = player
    })
  }

  nextPlayer() {
    this.currentPlayer.next( this.players[(this.players.indexOf(this._currentPlayer) + 1) % this.players.length] )
  }
}

