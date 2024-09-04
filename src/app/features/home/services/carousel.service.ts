import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CarouselService {
  public selectedDate = new BehaviorSubject<Date | null>(null);
  public selectedDate$ = this.selectedDate.asObservable();

  selectDate(date: Date): void {
    const currentDate = this.selectedDate.getValue();

    if (currentDate && currentDate.getTime() === date.getTime()) {
      this.selectedDate.next(null);
    } else {
      this.selectedDate.next(date);
    }
  }
}
