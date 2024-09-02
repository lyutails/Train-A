import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'TTP-carriages-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carriages-carousel.component.html',
  styleUrl: './carriages-carousel.component.scss',
})
export class CarriagesCarouselComponent {
  @Input() carriage = '';
  public isCarriageSliderItemChecked = signal(false);

  onCarriageSliderItemClick() {
    this.isCarriageSliderItemChecked.set(!this.isCarriageSliderItemChecked());
  }
}
