import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import * as geojsonData from '../../assets/gz_2010_us_050_00_20m.json';;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 51.505, -0.09 ],
      zoom: 13
    });
    //render default map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(this.map);

    this.map.setView([32.1656, -82.9001], 6);
    //hide every state except georgia
    L.geoJSON(geojsonData as any, {
      filter: function(feature: any) {
        return feature.properties.STATE === "13";
      },
      style: function(feature: any) {
        return {
          fillColor: '#ff7800',
          weight: 1,
          opacity: 1,
          color: 'white',
          fillOpacity: 0.7
        };
      }
    }).addTo(this.map);




    //get a list of counties in GA from the geojson data color them with different colors all other counties make them opaque
    // var counties = geojsonData.features;
    // var countyList = [];
    // for (var i = 0; i < counties.length; i++) {
    //   if (counties[i].properties.STATE === "13") {
    //     countyList.push(counties[i]);
    //   }
    // }

    // //hide city names and only show county names
    // L.geoJSON(countyList as any, {
    //   style: function(feature) {
    //     return {
    //       fillColor: '#ff7800',
    //       weight: 1,
    //       opacity: 1,
    //       color: 'white',
    //       fillOpacity: 0.7
    //     };
    //   }
    // }).addTo(this.map);
 

  }

  ngAfterViewInit(): void {
    this.initMap();
  }
}
