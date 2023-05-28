import { Component } from '@angular/core';
import { MapComponent } from './map/map.component';
import { SelectedPanelComponent } from './selected-panel/selected-panel.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [MapComponent, SelectedPanelComponent],
})
export class AppComponent {
  title = 'airisk';
  selected: any;
  center: [number,number] = [51.505, -0.09]
  zoom: number= 13;
  handleEvent(event: any) {
    this.selected = event; 
    console.dir(event.feature.geometry.coordinates[0][0]);
    let lat = event.feature.geometry.coordinates[0][0][1];
    let lng = event.feature.geometry.coordinates[0][0][0];
    this.center = [lat, lng];
    this.zoom = 8;
    //set this.zoom to a randome number between 3 and 8
    // this.zoom = Math.floor(Math.random() * 5) + 3;
    // console.dir(this.selected); 
  }
}
