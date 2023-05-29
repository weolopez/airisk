import { Component, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import * as L from 'leaflet';
import * as geojsonData from '../../assets/output.json'
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
})
export class MapComponent implements AfterViewInit {
  private map: any;
  @Output() eventEmitter = new EventEmitter<any>();
  @Input() center: [number, number] = [51.505, -0.09];
  @Input() zoom: number = 13;

  constructor(public mapService: MapService) { }

  //on @Input() change change the zoom level of the map
  ngOnChanges() {
    if (this.map) {
      console.log("zooming to " + this.zoom);
    this.map.setZoom(this.zoom);
    this.map.panTo(this.center);
    }
  }

  private initMap(): void {

    this.map = L.map('map', {
      center: this.center,
      zoom: this.zoom
    });
    //render default map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(this.map);

    this.map.setView([32.1656, -82.9001], 6);
    // create an overlay that colors each state a different random color
    const geojsonLayer = L.geoJSON(geojsonData as any, {
      style: function(feature: any) {
        //for each state, generate a random color
        var randomColor
        if (feature.properties.STATE === "13") {
          //for each county generate a randome color
          randomColor = '#c0c0c0'// + Math.floor(Math.random()*16777215).toString(16);
          // randomColor = "ff7800";
        } else {
          randomColor = "#FFFFFF";
        }

        return {
          fillColor: randomColor,
          weight: 1,
          opacity: 1,
          color: 'white',
          fillOpacity: 0.9,
          randomColor: randomColor
        };
      }
    }).addTo(this.map);

    geojsonLayer.eachLayer((layer: any) => {
      layer.on('click', () => {
        this.eventEmitter.emit(layer);
        this.mapService.selected = layer;
      });
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
}
