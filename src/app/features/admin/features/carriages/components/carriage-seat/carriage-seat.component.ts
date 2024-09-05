import { CommonModule } from '@angular/common';
import {
  AfterContentChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { RoleService } from '../../../../../../core/roles/role.service';

@Component({
  selector: 'TTP-carriage-seat',
  standalone: true,
  imports: [MatCheckboxModule, MatLabel, MatIcon, MatInput, CommonModule],
  templateUrl: './carriage-seat.component.html',
  styleUrl: './carriage-seat.component.scss',
})
export class CarriageSeatComponent implements OnInit, AfterContentChecked {
  @Input() seatValue = '';
  @Input() carriageNameValue!: string;
  @Input() checked = false;
  @Input() carriageNumberValue = 0;
  @ViewChild('seatCheckbox') seatCheckbox!: ElementRef;
  public check = signal(false);
  @Output() chosenSeat = new EventEmitter<string>();
  public isCarriagesPage = signal(false);
  public selectedSeat = '';
  public selectedCarriage = '';
  public selectedCarriageNumber = '';

  constructor(
    private route: ActivatedRoute,
    private roleService: RoleService,
  ) {}

  ngOnInit() {
    this.check.set(!this.checked);
    if (this.route.snapshot.routeConfig && this.route.snapshot.routeConfig.path === 'carriages') {
      this.isCarriagesPage.set(true);
    } else {
      this.isCarriagesPage.set(false);
    }
    if (this.seatValue === this.selectedSeat) {
      this.check.set(true);
    }
    console.log(this.checked);
    console.log(this.selectedSeat);
    console.log(this.selectedCarriage);
  }

  ngAfterContentChecked(): void {
    this.selectedSeat = JSON.parse(localStorage.getItem('seatNumber')!);
    this.selectedCarriage = JSON.parse(localStorage.getItem('carriageName')!);
    this.selectedCarriageNumber = JSON.parse(localStorage.getItem('carriageNumber')!);
    if (this.seatValue === this.selectedSeat) {
      this.check.set(false);
    } else {
      this.check.set(true);
    }
    console.log(this.checked);
    console.log(this.seatValue);
    console.log(this.selectedSeat);
  }

  clickCheckbox() {
    console.log('seatNumber', this.seatValue, 'carriageName', this.carriageNameValue);
    localStorage.setItem('seatNumber', JSON.stringify(this.seatValue));
    localStorage.setItem('carriageName', JSON.stringify(this.carriageNameValue));
    localStorage.setItem('carriageNumber', JSON.stringify(this.carriageNumberValue));
    this.selectedSeat = JSON.parse(localStorage.getItem('seatNumber')!);
    this.selectedCarriage = JSON.parse(localStorage.getItem('carriageName')!);
    this.selectedCarriageNumber = JSON.parse(localStorage.getItem('carriageNumber')!);
    console.log(this.selectedSeat);
    console.log(this.selectedCarriage);
    if (!this.check()) {
      localStorage.removeItem('seatNumber');
      localStorage.removeItem('carriageName');
      localStorage.removeItem('carriageNumber');
    }
    this.check.set(!this.check());
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

  public get isAdminRole(): boolean {
    return this.roleService.isAdminRole;
  }
}
