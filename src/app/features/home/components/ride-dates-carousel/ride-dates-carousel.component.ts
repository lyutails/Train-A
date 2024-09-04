import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CarouselService } from '../../services/carousel.service';
import { map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'TTP-ride-dates-carousel',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './ride-dates-carousel.component.html',
  styleUrls: ['./ride-dates-carousel.component.scss'],
})
export class RideDatesCarouselComponent implements OnInit, OnDestroy {
  @Input() dateItem!: Date;
  private readonly destroy$$ = new Subject<void>();

  public isSelected = false;

  constructor(private readonly carouselService: CarouselService) {}

  ngOnInit(): void {
    this.carouselService.selectedDate$
      .pipe(
        takeUntil(this.destroy$$),
        map((selectedDate) => selectedDate?.getTime() === this.dateItem.getTime()),
      )
      .subscribe((isSelected) => {
        this.isSelected = isSelected;
      });
  }

  ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  public setColour(): void {
    this.carouselService.selectDate(this.dateItem);
  }
}
