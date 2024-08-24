import { Component, Input, OnInit } from '@angular/core';
import { CarriageSeatComponent } from '../carriage-seat/carriage-seat.component';

@Component({
  selector: 'TTP-carriage-row',
  standalone: true,
  imports: [CarriageSeatComponent],
  templateUrl: './carriage-row.component.html',
  styleUrl: './carriage-row.component.scss',
})
export class CarriageRowComponent implements OnInit {
  @Input() rowNumber = 0;
  @Input() leftSeatCount = 0;
  @Input() rightSeatCount = 0;
  initialSeatValue = 0;

  ngOnInit(): void {
    this.initialSeatValue = 1 + this.leftSeatCount + this.rightSeatCount;
  }
}
