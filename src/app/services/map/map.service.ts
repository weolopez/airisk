import { Injectable } from '@angular/core';
import { GeoJsonObject, Geometry } from 'geojson';
import { BehaviorSubject } from 'rxjs';
import * as L from 'leaflet';
import * as F from './icon-functions'

@Injectable({
  providedIn: 'root'
})
export class MapService {
  selected: any;
  map: any;
  gameLayer!: L.GeoJSON<any, Geometry>
  layer: BehaviorSubject<any>=new BehaviorSubject(undefined)
  event: BehaviorSubject<any>=new BehaviorSubject(undefined)
  previous: any;
  constructor() { 
    // playerService.currentPlayer.subscribe(player => {
    //   this.currentPlayer = player
    // })

    this.layer.subscribe(layer => {
      if (!layer) return;
      this.selected = layer;
      if (this.previous) {
        this.previous.setStyle({
          fillColor: this.previous.feature.properties.color
        });
      }
      this.previous = this.selected;


      // console.dir(event.feature.geometry.coordinates[0][0]);
      let lat = this.selected.feature.geometry.coordinates[0][0][1];
      let lng = this.selected.feature.geometry.coordinates[0][0][0];
      this.selected.feature.properties.color = this.selected.options.fillColor;
      // console.dir(this.selected.feature.properties)
      // let style = {fillColor: playerService._currentPlayer.color.background}
      // this.selected.setStyle(style);

//TODO change to https://leafletjs.com/reference.html#map-fitbounds
    // this.map.panTo([lat,lng]);
    //pan to mouse click
    // this.map.setZoom(13);

    })
  }

  // setCenter(latitude: number, longitude: number, radius: number) {
  //   L.circle([latitude,longitude], radius).setStyle({fillColor:'blue'}).addTo(this.map);
  //   // .addTo( map);
  //   this.map.setZoom(radius);
  //   this.map.panTo([latitude, longitude])
  // }

  setCenter(cords: [number, number], radius: number) {
    let circle = L.circle(cords, radius).setStyle({fillColor:'blue'}).addTo(this.map)
    // this.map.setZoom(radius)
    // this.map.panTo(cords)
    return circle
  }

  createEntity(type: string, coordinates?: any, properties?: any): L.Marker  {
   return  F.getIcon(type)
  }
  moveEntity(entity: any, coordinates: any) {
    entity.setLatLng(coordinates)
  }
}
