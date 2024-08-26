import { Component, computed, Input, OnChanges, OnInit, signal } from '@angular/core';
import { CarriageSeatComponent } from '../carriage-seat/carriage-seat.component';

@Component({
  selector: 'TTP-carriage-row',
  standalone: true,
  imports: [CarriageSeatComponent],
  templateUrl: './carriage-row.component.html',
  styleUrl: './carriage-row.component.scss',
})
export class CarriageRowComponent implements OnInit, OnChanges {
  @Input() rowNumber = 0;
  @Input() leftSeatCount = 0;
  @Input() rightSeatCount = 0;
  @Input() carriageName!: string;
  seatsInRow!: number[];
  seatsInRowNumber!: number;
  leftSeatSignal = signal(0);
  rightSeatSignal = signal(0);

  ngOnInit(): void {
    this.seatsInRowNumber = this.leftSeatCount + this.rightSeatCount;
    this.leftSeatSignal.set(this.leftSeatCount);
    this.rightSeatSignal.set(this.rightSeatCount);
  }

  ngOnChanges(): void {
    this.seatsInRowNumber = this.leftSeatCount + this.rightSeatCount;
    this.leftSeatSignal.set(this.leftSeatCount);
    this.rightSeatSignal.set(this.rightSeatCount);
  }

  public totalSeats = computed(() => {
    return this.leftSeatSignal() + this.rightSeatSignal();
  });
}
