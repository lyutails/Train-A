import { Component, signal } from '@angular/core';
import { ButtonComponent } from '../../../../../common/button/button.component';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { Carriage } from '../models/carriages.model';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';

export interface Rows {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'TTP-carriages',
  standalone: true,
  imports: [
    ButtonComponent,
    MatCheckboxModule,
    CommonModule,
    ReactiveFormsModule,
    MatInput,
    MatSelect,
    MatLabel,
    MatOption,
  ],
  templateUrl: './carriages.component.html',
  styleUrl: './carriages.component.scss',
})
export class CarriagesComponent {
  public carriageForm!: FormGroup<Carriage>;
  public carriagesArray!: FormGroup<Carriage>[];
  create = signal(false);
  update = signal(false);
  rows: Rows[] = [
    { value: 'row-1', viewValue: '1 row' },
    { value: 'row-2', viewValue: '2 row' },
    { value: 'row-3', viewValue: '3 row' },
    { value: 'row-4', viewValue: '4 row' },
    { value: 'row-5', viewValue: '5 row' },
    { value: 'row-6', viewValue: '6 row' },
    { value: 'row-7', viewValue: '7 row' },
    { value: 'row-8', viewValue: '8 row' },
  ];

  constructor(
    private http: HttpClient,
    private fb: NonNullableFormBuilder,
  ) {}

  carriageInputValues = {
    name: '',
    rows: 0,
    leftSeats: 0,
    rightSide: 0,
  };

  public createCarriage() {
    this.create.set(!this.create());
    return this.fb.group({
      name: this.fb.control({ value: '', disabled: false }),
      rows: this.fb.control({ value: 0, disabled: false }),
      leftSeats: this.fb.array([new FormControl()]),
      rightSeats: this.fb.array([new FormControl()]),
    });
  }

  public updateCarriage() {
    this.update.set(!this.update());
  }

  public saveCarriage() {
    this.carriagesArray.push(this.carriageForm);
  }

  /* ngOnInit() {
    this.carriageForm = this.carriageFormInstance;
  } */

  fetch() {
    return this.http.get('route').subscribe((data) => {
      console.log(data);
    });
  }

  testCarriagesArray = [
    {
      code: '',
      name: 'carriage2F',
      rows: 12,
      leftSeats: 2,
      rightSeats: 2,
    },
    {
      code: '',
      name: 'carriage8K',
      rows: 10,
      leftSeats: 2,
      rightSeats: 3,
    },
    {
      code: '',
      name: 'carriageVIP',
      rows: 6,
      leftSeats: 1,
      rightSeats: 1,
    },
  ];

  private get carriageFormInstance() {
    return this.fb.group({
      name: this.fb.control({ value: '', disabled: false }),
      rows: this.fb.control({ value: 0, disabled: false }),
      leftSeats: this.fb.array([new FormControl()]),
      rightSeats: this.fb.array([new FormControl()]),
    });
  }

  /* private get leftSeats() {
    return this.carriageForm.controls.leftSeats;
  }

  private get rightSeats() {
    return this.carriageForm.controls.rightSeats;
  } */

  /*  public paintCarriage(this.testCarriagesArray[0]) {

  } */
}
