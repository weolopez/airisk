import { Component, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import * as L from 'leaflet';
import * as geojsonData from '../../assets/output.json'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  standalone: true,
})
export class MapComponent implements AfterViewInit {
  private map: any;
  @Output() eventEmitter = new EventEmitter<any>();
  @Input() center: [number, number] = [51.505, -0.09];
  @Input() zoom: number = 13;

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
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
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

    // on hover change color
    geojsonLayer.eachLayer((layer: any) => {
      layer.on('mouseover', function() {
        // console.log(layer.options.fillColor);
        // layer.feature.properties.fillColor = 'red';
        layer.setStyle({
          fillColor: 'red'
        });
      });
      layer.on('mouseout', function() {
        layer.setStyle({
          fillColor: layer.options.randomColor
        });
      });
      layer.on('click', () => {
        this.eventEmitter.emit(layer);
      });
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
}
