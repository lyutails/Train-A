import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, signal, ViewChild } from '@angular/core';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';

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
  @Input() checked = false;
  @ViewChild('seatCheckbox') seatCheckbox!: ElementRef;
  public check = signal(false);
  @Output() chosenSeat = new EventEmitter<string>();
  public isCarriagesPage = signal(false);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.check.set(!this.checked);
    console.log(this.check());
    if (this.route.snapshot.routeConfig && this.route.snapshot.routeConfig.path === 'carriages') {
      this.isCarriagesPage.set(true);
    }
  }

  clickCheckbox() {
    console.log('seatNumber', this.seatValue, 'carriageName', this.carriageNameValue);
    // localStorage.setItem('carriageName', this.carriageNameValue);
    localStorage.setItem('seatNumber', this.seatValue);
    localStorage.setItem('carriageName', JSON.stringify(this.carriageNameValue));
    this.check.set(!this.check());
    if (!this.check()) {
      localStorage.removeItem('seatNumber');
      localStorage.removeItem('seatNumber');
    }
  }

  inspectCheckboxValue(event: MatCheckboxChange): void {
    console.log(event.checked);
    if (event.checked) {
      console.log('checked');
    }
    this.check.set(!this.check());
    console.log('checked');
    console.log(this.check());
  }
}
