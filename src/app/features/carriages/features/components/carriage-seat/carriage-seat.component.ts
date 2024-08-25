import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'TTP-carriage-seat',
  standalone: true,
  imports: [MatCheckboxModule, MatLabel, MatIcon, MatInput, CommonModule],
  templateUrl: './carriage-seat.component.html',
  styleUrl: './carriage-seat.component.scss',
})
export class CarriageSeatComponent {
  @Input() seatValue = '';
  @Input() carriageNameValue!: string;
  @ViewChild('seatCheckbox') seatCheckbox!: ElementRef;
  check = signal(false);

  clickCheckbox() {
    this.check.set(!this.check());
    console.log(this.seatValue, this.carriageNameValue);
  }

  inspectCheckboxValue(event: MatCheckboxChange): void {
    console.log(event.checked);
    if (event.checked) {
      console.log('checked');
    }
    console.log(this.seatCheckbox);
    console.log(this.seatValue);
  }
}
