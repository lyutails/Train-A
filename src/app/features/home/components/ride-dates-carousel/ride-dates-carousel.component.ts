import { Component, Input, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CarouselService } from '../../services/carousel.service';

@Component({
  selector: 'TTP-ride-dates-carousel',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './ride-dates-carousel.component.html',
  styleUrls: ['./ride-dates-carousel.component.scss'],
})
export class RideDatesCarouselComponent {
  @Input() dateItem!: Date;

  constructor(private readonly carouselService: CarouselService) {}

  public isSelected = computed(() => this.carouselService.getSelectedDate()() === this.dateItem);

  public setColour() {
    this.carouselService.selectDate(this.dateItem);
  }
}
