import { Injectable } from '@angular/core';
import { GeoJsonObject, Geometry } from 'geojson';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  selected: any;
  map: any;
  gameLayer!: L.GeoJSON<any, Geometry>
  layer: BehaviorSubject<any>=new BehaviorSubject(undefined)
  previous: any;
  constructor() {
    this.layer.subscribe(layer => {
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
      console.dir(this.selected.feature.properties)
      this.selected.setStyle({
        fillColor: 'red'
      });

//TODO change to https://leafletjs.com/reference.html#map-fitbounds
    this.map.setZoom(8);
    this.map.panTo([lat,lng]);

    })
  }
}
