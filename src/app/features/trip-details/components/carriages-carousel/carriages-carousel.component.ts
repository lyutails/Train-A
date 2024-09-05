import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'TTP-carriages-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carriages-carousel.component.html',
  styleUrl: './carriages-carousel.component.scss',
})
export class CarriagesCarouselComponent {
  @Input() carriage = '';
  @Input() selected = false;
  @Input() price = 0;
  @Input() freeSeats = 0;
  @Output() carriageNameEvent = new EventEmitter<string>();

  passCarriageName() {
    console.log(this.selected);
    if (this.selected) {
      this.carriageNameEvent.emit('');
    } else {
      this.carriageNameEvent.emit(this.carriage);
    }
  }
}
