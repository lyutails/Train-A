import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'TTP-carriages-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carriages-carousel.component.html',
  styleUrl: './carriages-carousel.component.scss',
})
export class CarriagesCarouselComponent {
  @Input() carriage = '';
  @Output() carriageNameEvent = new EventEmitter<string>();
  public isCarriageSliderItemChecked = signal(false);

  onCarriageSliderItemClick() {
    this.isCarriageSliderItemChecked.set(!this.isCarriageSliderItemChecked());
  }

  passCarriageName() {
    if (this.isCarriageSliderItemChecked()) {
      this.carriageNameEvent.emit(this.carriage);
    }
    if (!this.isCarriageSliderItemChecked()) {
      this.carriageNameEvent.emit('');
    }
  }
}
