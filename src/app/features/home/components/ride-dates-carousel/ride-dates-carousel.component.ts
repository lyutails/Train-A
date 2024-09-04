import { Component, Input, signal } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'TTP-ride-dates-carousel',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './ride-dates-carousel.component.html',
  styleUrl: './ride-dates-carousel.component.scss',
})
export class RideDatesCarouselComponent {
  @Input() dateItem!: Date;
  public selectDateFilterItem = signal(false);

  setColour() {
    this.selectDateFilterItem.set(!this.selectDateFilterItem());
  }
}
