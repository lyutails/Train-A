import { Component, Input, signal } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'TTP-carriage-seat',
  standalone: true,
  imports: [MatCheckboxModule, MatLabel, MatIcon, MatInput],
  templateUrl: './carriage-seat.component.html',
  styleUrl: './carriage-seat.component.scss',
})
export class CarriageSeatComponent {
  @Input() seatValue = '';
  @Input() carriageNameValue!: string;
  check = signal(false);

  clickCheckbox() {
    this.check.set(!this.check());
  }

  clicked() {
    console.log('checked');
  }
}
