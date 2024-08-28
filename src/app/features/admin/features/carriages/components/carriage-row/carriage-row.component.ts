import { Component, Input, OnChanges, OnInit } from '@angular/core';
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
  seats!: string[];

  ngOnInit(): void {
    this.seatsInRowNumber = this.leftSeatCount + this.rightSeatCount;
  }

  ngOnChanges(): void {
    this.seatsInRowNumber = this.leftSeatCount + this.rightSeatCount;
  }

  clickSeat(seat: string) {
    this.seats.push(seat);
    console.log(seat);
  }
}
