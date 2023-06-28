import { MatCardModule } from '@angular/material/card';
import { MapComponent } from '../../map/map.component';
import { GameI } from '../game';
import { Component } from '@angular/core';
import { MapService } from 'src/app/services/map/map.service';
import { GameService } from 'src/app/services/game/game.service';
import L from 'leaflet';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-gold',
  templateUrl: './gold.game.html',
  styleUrls: ['./gold.game.scss'],
  standalone: true,
  imports: [
    MapComponent,
    MatCardModule,
    MatButtonModule
  ]
})
export class GoldGame implements GameI {
isTracking: any;
setTracking(isTracking: boolean) {
  if (this.gameService) {
    this.gameService.gameState.next({ isTracking: isTracking })
  }
  this.isTracking = isTracking;
}
  isSim = false;
  player: any;
  loop: any;
  _isGameOver: boolean = false;
  setSim(isSim: boolean) {
    if (this.gameService) {
      this.gameService.gameState.next({ isSim: isSim })
    }
  }
  id: string = 'GoldGame'
  name: string = 'Gold Game'
  description: string = 'Find the pot of gold'
  features: Array<any> = [{
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [33.7782, -84.2917]
    },
    "properties": {
      "name": "Downtown Decatur Cemetery",
      "address": "229 Bell St, Decatur, GA 30030",
      "description": "The Downtown Decatur Cemetery is a historic cemetery located in the heart of downtown Decatur. It is the final resting place of many of Decatur's early settlers and prominent citizens.",
      "clue": "In a place older than Atlanta, where the old ways lay.  A haven for the living, as the dogs have their day, Find this place, hold your breath, and the next clue will display",
      "image": "https://via.placeholder.com/350x150",
      "website": "https://www.decaturga.com/city-government/city-departments/cemetery",
      "phone": "(404) 370-4100"
    }
  }]
  center: [number, number] = [33.7748, -84.294]
  zoom = 16
  map: L.Map | undefined;
  circle: L.Circle<any> | undefined;
  constructor(public mapService?: MapService, public gameService?: GameService) {
    if (gameService) {
      gameService.game = this
      gameService.gameState.subscribe((state: any) => {
        if (state.isSim != undefined) {
          this.isSim = state.isSim
          if (!this.isSim) {
            this.loop = setInterval(() => {
              navigator.geolocation.getCurrentPosition((position) => {
                gameService.gameState.next({ playerLocation: [position.coords.latitude, position.coords.longitude] })
              })
            }, 100);
          } else {
            clearInterval(this.loop)
          }
        }
        if (state.playerLocation != undefined) {
          if (!this._isGameOver && mapService) {
            // this.mapService.setCenter(lat, lng, 17)
            if (!this.player) {
              this.player = mapService.createEntity('player')
              this.player.addTo(mapService.map);
            } else {
              let distance = this.distance(state.playerLocation, this.player.getLatLng())
              if (distance && distance < 0.0001) return
              //  L.polyline(state.playerLocation).setStyle({fillColor:'blue'}).addTo(mapService.map);
              if (this.isTracking) L.circle(state.playerLocation, 5).setStyle({fillColor:'blue'}).addTo(mapService.map)
              this.player.setLatLng(state.playerLocation)
              mapService.map.panTo(state.playerLocation);
              distance = this.distance(state.playerLocation, this.features[0].geometry.coordinates)
              if (distance && distance < 0.0001) {
                this.gameService?.gameState.next({ isGameOver: true })
              }
            }
          }
        }
        if (state.isGameOver != undefined) {
          this._isGameOver = state.isGameOver
          alert('Game Over')
        }
      })
    }

    if (this.mapService && !this.circle) {
      //execute next line after 1 second pass in this
      // setTimeout(function(that: any) {
      //   that.circle = that.mapService.setCenter([-84.294,33.7748], 16)
      // }, 1000, this)
      // this.circle = this.mapService.setCenter(this.features[0].geometry.coordinates, 16)
    }
  }
  distance(a: [number, number], b: [number, number]) {
    let dx = a[0] - b[0]
    let dy = a[1] - b[1]
    return Math.sqrt(dx * dx + dy * dy)
  }
  isGameOver(playerLocation: [number, number]) {
    // alert('isGameOver')
    //check if player is at the location
    // if (this.playerService?.playerLocation) {
    if (this.mapService && !this.circle) {
      this.circle = this.mapService.setCenter(this.features[0].geometry.coordinates, 16)
    }
    // let playerLocation = this.playerService.playerLocation
    let distance = this.distance(playerLocation, this.features[0].geometry.coordinates)
    if (distance && distance < 0.0001) {
      this.gameService?.gameState.next({ isGameOver: true })
    }
  }
  myMap(map: L.Map) {
    this.map = map
    // if (this.mapService) {
    // let player = this.mapService.createEntity('player')
    // this.mapService.moveEntity(player, this.features[0].geometry.coordinates)
    // }
  }
}