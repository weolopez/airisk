import { Component, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import * as L from 'leaflet';
import * as geojsonData from '../../assets/output.json'
import { MapService } from '../services/map/map.service';
import { GeoJsonObject, Geometry } from 'geojson';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
})
export class MapComponent implements AfterViewInit {
  @Input() center: [number, number] = [51.505, -0.09];
  @Input() zoom: number = 18;
  @Output() map = new EventEmitter<L.Map>();
  layer: any;

  constructor(public mapService: MapService) {
    // playerService.currentPlayer.subscribe(player => {
    //   if (this.setStyle) {
    //     this.setStyle(player.color.background)
    //   }
    // })
  }

  //on @Input() change change the zoom level of the map
  ngOnChanges() {
    if (this.mapService.map) {
      console.log("zooming to " + this.zoom);
      this.mapService.map.panTo(this.center);
      this.mapService.map.setZoom(this.zoom);
    }
  }

  private initMap(): void {

    this.mapService.map = L.map('map', {
      zoomControl: false,
      touchZoom: false,
      center: this.center,
      zoom: this.zoom
    });
    this.mapService.map._handlers.forEach((handler: any) => {
      handler.disable();

    });
    //render default map
    let osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(this.mapService.map);
    this.mapService.osm = osm
   
    // this.mapService.map.on('click', (e: any) => {
    //   var lat = e.latlng.lat;
    //   var lon = e.latlng.lng;

    //   fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`)
    //     .then(function (response) {
    //       return response.json();
    //     })
    //     .then(function (jsonData) {
    //       console.log(jsonData);
    //     });
    // });

    // this.mapService.map.setView([32.1656, -82.9001], 6);

    const layer: L.GeoJSON<any, Geometry> = L.geoJSON(geojsonData as GeoJsonObject).addTo(this.mapService.map)
    this.mapService.gameLayer = layer

    layer.eachLayer((layer: any) => {
      layer.on('click', (event: any) => {
        //get event data lat lng
        let lat = event.latlng.lat;
        let lng = event.latlng.lng;
        // this.mapService.map.setZoom(18);
        // this.mapService.map.panTo([lat, lng])
        // this.mapService.layer.next(layer)
        this.mapService.event.next(event)
      });
    });
    this.layer = layer
    this.mapService.map.setView([this.center[0], this.center[1]], this.zoom);

    this.map.emit(this.mapService.map);
  }

  ngAfterViewInit(): void {
    this.initMap();
    // this.playerService.currentPlayer.next(this.playerService.players[2])
  }

  setStyle(color: string) {
    let mystyle = function (feature: any) {
      let border = "white"
      color = border
      //for each state, generate a random color
      var randomColor
      if (feature.properties.STATE === "13") {
        //for each county generate a randome color
        randomColor = '#c0c0c0'// + Math.floor(Math.random()*16777215).toString(16);
        // randomColor = "ff7800";
      } else {
        randomColor = color;
        border = color
      }

      return {
        fillColor: randomColor,
        weight: 0,
        opacity: 1,
        color: border,
        fillOpacity: 0,
        randomColor: randomColor
      };
    }

    if (this.layer)
      this.layer.setStyle(mystyle)
  }

}
