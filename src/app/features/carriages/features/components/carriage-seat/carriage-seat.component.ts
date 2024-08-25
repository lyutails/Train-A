import { Component, Input } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'TTP-carriage-seat',
  standalone: true,
  imports: [MatCheckboxModule, MatLabel, MatIcon],
  templateUrl: './carriage-seat.component.html',
  styleUrl: './carriage-seat.component.scss',
})
export class CarriageSeatComponent {
  @Input() seatValue = '';
  @Input() carriageNameValue!: string;
}
