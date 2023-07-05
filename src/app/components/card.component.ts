import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ CommonModule, MatCardModule ],
  template: `
    <mat-card [ngStyle]="{ 'width.px': width, 'height.px': height }">
      <mat-card-header>
        <mat-card-title>{{ title }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>{{ content }}</p>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      mat-card {
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        transition: 0.3s;
        background-color: white;
        margin: 10px;
        display: inline-block;
      }
    `,
  ],
})
export class CardComponent {
  @Input() title: string = 'generic title';
  @Input() content: string = 'generic content';
  @Input() width = 150;
  @Input() height = 200;
}