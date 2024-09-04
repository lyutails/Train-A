import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CarouselService {
  private selectedDate = signal<Date | null>(null);

  getSelectedDate() {
    return this.selectedDate;
  }

  selectDate(date: Date) {
    this.selectedDate.set(date);
  }
}
