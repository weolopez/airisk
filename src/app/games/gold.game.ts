import { Player } from '../services/player/player.service';
import { GameI } from './game';

export class GoldGame implements GameI {
    id: string = 'GoldGame'
    name: string = 'Find the pot of gold'
    description: string = 'Find the pot of gold'
    players: Array<Player>;
    map: any;
    playerResources: number;
    aiResources: number;
    currentPlayer: Player | undefined;
  
    constructor() {
      this.players = [];
      this.playerResources = 0;
      this.aiResources = 0;
    }
}