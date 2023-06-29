import { Component } from '@angular/core';
import { GameI } from '../game';
import { GameService } from '../../services/game/game.service';
import { MapService } from '../../services/map/map.service';
import { MapComponent } from 'src/app/map/map.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-decatur-war',
  templateUrl: './decatur-war.component.html',
  styleUrls: ['./decatur-war.component.scss'],
  standalone: true,
  imports: [
    MapComponent,
    MatCardModule,
    MatButtonModule
  ]
})
export class DecaturWarGame implements GameI {
  id: string = 'DecaturWar';
  name: string= 'Decatur War';
  description: string='War of Decatur';
  features: { type: string; geometry: { type: string; coordinates: number[]; }; properties: { name: string; address: string; description: string; image: string; website: string; phone: string; }; }[]
  = [
    {
      "type": "Feature",
      "geometry": {
        "type": "Circle",
        "coordinates": [
          -84.2941,
          30.8797
        ],
      },
      "properties": {
        "name": "Downtown Decatur",
        "address": "229 Bell St, Decatur, GA 30030",
        "description": "The Downtown Decatur",
        "image": "https://via.placeholder.com/350x150",
        "website": "https://www.decaturga.com/city-government/city-departments/cemetery",
        "phone": "(404) 370-4100"
      }
    }
  ];

  constructor(public mapService?: MapService, public gameService?: GameService) {
  }
  isGameOver(playerLocation: [number, number]) {
    throw new Error('Method not implemented.');
  }

}
