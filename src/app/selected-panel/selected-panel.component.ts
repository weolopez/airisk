import {Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {MatListModule} from '@angular/material/list'
import {MatDividerModule} from '@angular/material/divider'
@Component({
  selector: 'selected-panel',
  templateUrl: './selected-panel.component.html',
  styleUrls: ['./selected-panel.component.css'],
  standalone: true,
  imports: [MatDividerModule,MatListModule, NgIf, MatButtonModule],
})
export class SelectedPanelComponent {
@Input() selected: any=true;

showFiller = false;
}
