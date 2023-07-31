import { CommonModule, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, CdkDropList, NgFor, CdkDrag],
  template: `
   <mat-card  class="card" [ngClass]="{'is-flipped': isFlipped}" (click)="flipCard()" cdkDrag>
    <div class=" card-front" [ngStyle]="{ 'width.px': width, 'height.px': height }">
      <mat-card-header>
        <mat-card-title>{{ title }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>{{ content }}</p>
      </mat-card-content>
    </div>
    <div class=" card-back jc" >
      <!-- <svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg"> <g _ngcontent-ng-c1086969967=""><rect _ngcontent-ng-c1086969967="" x="0" y="0" width="100" height="145" fill="#fff"></rect><text _ngcontent-ng-c1086969967="" x="10%" y="15%" fill="#000" font-size="20" font-family="Arial" text-anchor="middle">A</text><text _ngcontent-ng-c1086969967="" x="50%" y="50%" fill="#000" font-size="50" font-family="Arial" text-anchor="middle">♠</text><text _ngcontent-ng-c1086969967="" x="90%" y="95%" fill="#000" font-size="20" font-family="Arial" text-anchor="middle">A</text></g> </svg> -->
    </div>
    </mat-card>
        `,
  styles: [
    `
              /* .card.spades.rank6 .face { */
            .jc {
              background-image: url("/assets/cards/js.svg");
              background-size: 100%;
            }
            
            .card {
              width: 150px;
              height: 240px;
              perspective: 1000px;
              position: relative;
              box-shadow: none;
            }

            .card-front, .card-back {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              backface-visibility: hidden;
              transition: transform 0.6s;
              border-radius: 10px;
              border: 3px solid #ccc;
            }

            .card-front {
              transform: rotateY(0deg);
            }

            .card-back {
              transform: rotateY(180deg);
            }

            .is-flipped .card-front {
              transform: rotateY(-180deg);
            }

            .is-flipped .card-back {
              transform: rotateY(0deg);
            }
          `,
  ],
})
export class CardComponent { 
  @Input() title: string = 'generic title';
  @Input() content: string = 'generic content';

  @Input() width = 150;
  @Input() height = 240;

  isFlipped = false;

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }
}