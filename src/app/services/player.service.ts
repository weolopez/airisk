import { Injectable, Inject } from '@angular/core';
import { Player } from '../models/player.model';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  color: string | undefined;

//   constructor(@Inject('color') private _color: string) { 
//     this.color = _color;
//   }
}

