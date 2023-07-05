import { Component } from '@angular/core';
import { GameI } from '../game';
import { GameService } from '../../services/game/game.service';
import { MapService } from '../../services/map/map.service';
import { MapComponent } from 'src/app/map/map.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { getHistoryData, highlightBuilding, playBackgroundMusic } from '../../services/map/icon-functions';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CardComponent } from "../../components/card.component";

@Component({
    selector: 'app-decatur-war',
    templateUrl: './decatur-war.component.html',
    styleUrls: ['./decatur-war.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MapComponent,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatTabsModule,
        MatSidenavModule,
        MatIconModule,
        MatExpansionModule,
        CardComponent
    ]
})
export class DecaturWarGame implements GameI {
  id: string = 'DecaturWar';
  name: string = 'Decatur War';
  description: string = 'War of Decatur';
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

  center: [number, number] = [33.7748, -84.294]
  zoom = 18
  map: L.Map | undefined;
  selectedPoint: Observable<any> | undefined;
  constructor(public mapService?: MapService, public gameService?: GameService) {
    if (mapService) {
      //wait a second then execute a function
      setTimeout(() => {
        this.selectedPoint = highlightBuilding(mapService.gameLayer, mapService.map)
      }, 1000);
    }
  }
  isGameOver(playerLocation: [number, number]) {
    throw new Error('Method not implemented.');
  }

  myMap(map: L.Map) {
    this.map = map
    // if (this.mapService) {
    // let player = this.mapService.createEntity('player')
    // this.mapService.moveEntity(player, this.features[0].geometry.coordinates)
    // }
  }
  pantolocation() {
    if (this.mapService?.map) {
      let position = navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        this.mapService?.map.panTo([position.coords.latitude, position.coords.longitude]);
      });
    }
  }
  exit() {
    location.href = '/games';
  }
  settings() {
    getHistoryData().then((data) => {
      alert(data)
    })
  }
  play() {
    playBackgroundMusic()
  }
}
