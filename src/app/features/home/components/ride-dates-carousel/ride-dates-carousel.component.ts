import { Component, Input, signal } from '@angular/core';
import { TripDates } from '../home/home.component';

@Component({
  selector: 'TTP-ride-dates-carousel',
  standalone: true,
  imports: [],
  templateUrl: './ride-dates-carousel.component.html',
  styleUrl: './ride-dates-carousel.component.scss',
})
export class RideDatesCarouselComponent {
  @Input() dateItem!: TripDates;
  public selectDateFilterItem = signal(false);

  setColour() {
    this.selectDateFilterItem.set(true);
  }
}
