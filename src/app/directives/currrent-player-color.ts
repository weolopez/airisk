import { Directive, ElementRef, Renderer2, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PlayerService } from '../services/player/player.service';

@Directive({
  selector: '[currentPlayerColor]',
  standalone: true,
})
export class PlayerColorDirective implements OnChanges {
  @Input('currentPlayerColor') playerColor: string | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2, private playerService: PlayerService) {
    this.playerService.currentPlayer.subscribe(player => {
        if (player) {
            this.ngOnChanges({});
        }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    let background = 'white'
    let foreground = 'black'
    let player = this.playerService._currentPlayer
    if (player) {
        if (/item|button|label/.test(this.el.nativeElement.localName)) {
            background = this.playerService._currentPlayer.color.componentBackground
            foreground = this.playerService._currentPlayer.color.text
        } else { 
            background = this.playerService._currentPlayer.color.background
        }
        this.el.nativeElement.style.background = background
        this.el.nativeElement.style.color = foreground
    }

    // if (this.playerColor) {
    //     this.el.nativeElement.style.background =  this.playerColor;
    // } 
    // if (this.playerService._currentPlayer) {
    // } else {
    //     this.renderer.setStyle(this.el.nativeElement, 'background-color', 'white');
    // }
    
  }
}