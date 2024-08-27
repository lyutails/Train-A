import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, signal, ViewChild } from '@angular/core';
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
export class CarriageSeatComponent implements OnInit {
  @Input() seatValue = '';
  @Input() carriageNameValue!: string;
  @Input() checked = true;
  @ViewChild('seatCheckbox') seatCheckbox!: ElementRef;
  check = signal(false);

  ngOnInit() {
    this.check.set(!this.checked);
  }

  clickCheckbox() {
    this.check.set(!this.check());
    console.log('seatNumber', this.seatValue, 'carriageName', this.carriageNameValue);
  }

  inspectCheckboxValue(event: MatCheckboxChange): void {
    console.log(event.checked);
    if (event.checked) {
      console.log('checked');
    }
  }
}
