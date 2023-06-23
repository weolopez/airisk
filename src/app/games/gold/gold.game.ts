import { MapComponent } from '../../map/map.component';
import { GameI } from '../game';
import { Component } from '@angular/core';

@Component({
  selector: 'app-gold',
  templateUrl: './gold.game.html',
  styleUrls: ['./gold.game.scss'],
  standalone: true,
  imports: [MapComponent]
})
export class GoldGame implements GameI {
    id: string = 'GoldGame'
    name: string = 'Gold Game'
    description: string = 'Find the pot of gold'
    features: Array<any> = [{
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-84.2945, 33.7748]
      },
      "properties": {
        "name": "Downtown Decatur Cemetery",
        "address": "229 Bell St, Decatur, GA 30030",
        "description": "The Downtown Decatur Cemetery is a historic cemetery located in the heart of downtown Decatur. It is the final resting place of many of Decatur's early settlers and prominent citizens.",
        "image": "https://via.placeholder.com/350x150",
        "website": "https://www.decaturga.com/city-government/city-departments/cemetery",
        "phone": "(404) 370-4100"
      }
    }]
    center = this.features[0].geometry.coordinates
    zoom = 16
    constructor() {
      
    }
}