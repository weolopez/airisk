import { Component, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import * as L from 'leaflet';
import * as geojsonData from '../../assets/output.json'
import { MapService } from '../services/map/map.service';
import { GeoJsonObject } from 'geojson';
import { PlayerService, Player } from '../services/player/player.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
})
export class MapComponent implements AfterViewInit {
  @Input() center: [number, number] = [51.505, -0.09];
  @Input() zoom: number = 13;
  layer: any;

  constructor(public mapService: MapService, public playerService: PlayerService) {
    playerService.currentPlayer.subscribe(player => {
      if (this.setStyle) {
        this.setStyle(player.color.background)
      }
    })
  }

  //on @Input() change change the zoom level of the map
  ngOnChanges() {
    if (this.mapService.map) {
      console.log("zooming to " + this.zoom);
      this.mapService.map.setZoom(this.zoom);
      this.mapService.map.panTo(this.center);
    }
  }

  private initMap(): void {

    this.mapService.map = L.map('map', {
      center: this.center,
      zoom: this.zoom
    });
    //render default map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(this.mapService.map);

    this.mapService.map.setView([32.1656, -82.9001], 6);

    const layer = L.geoJSON(geojsonData as GeoJsonObject).addTo(this.mapService.map)
    this.mapService.gameLayer = layer

    layer.eachLayer((layer: any) => {
      layer.on('click', () => {
        this.mapService.layer.next(layer)
      });
    });
    this.layer = layer
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.playerService.currentPlayer.next(this.playerService.players[2])
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
