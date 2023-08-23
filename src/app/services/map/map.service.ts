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
  osm!: L.TileLayer;
  constructor() {

    // this.layer.subscribe(layer => {
    //   if (!layer) return;
    //   this.selected = layer;
    //   if (this.previous) {
    //     this.previous.setStyle({
    //       fillColor: this.previous.feature.properties.color
    //     });
    //   }
    //   this.previous = this.selected;

    //   let lat = this.selected.feature.geometry.coordinates[0][0][1];
    //   let lng = this.selected.feature.geometry.coordinates[0][0][0];
    //   this.selected.feature.properties.color = this.selected.options.fillColor;
    // })
  }

  setCenter(cords: [number, number], radius: number) {
    let circle = L.circle(cords, radius).setStyle({fillColor:'blue'}).addTo(this.map)
    return circle
  }

  createEntity(type: string, coordinates?: any, properties?: any): L.Marker  {
   return  F.getIcon(type)
  }
  moveEntity(entity: any, coordinates: any) {
    entity.setLatLng(coordinates)
  }
}
