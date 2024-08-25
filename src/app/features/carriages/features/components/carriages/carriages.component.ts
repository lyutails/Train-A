import { Component, OnInit, signal } from '@angular/core';
import { ButtonComponent } from '../../../../../common/button/button.component';
import { HttpClient } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { Carriage } from '../../models/carriage.model';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { Observable } from 'rxjs';
import { CarriageRowComponent } from '../carriage-row/carriage-row.component';
import { CarriageForm } from '../../models/carriage-form.model';

export interface CarriageCreatingParams {
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
    MatFormField,
    FormsModule,
    CarriageRowComponent,
  ],
  templateUrl: './carriages.component.html',
  styleUrl: './carriages.component.scss',
})
export class CarriagesComponent implements OnInit {
  selectedRowsValue = '';
  selectedLeftSideSeatsValue = '';
  selectedRightSideSeatsValue = '';
  carriagesData!: Carriage[];
  /* public carriageForm!: FormGroup<Carriage>; */
  public carriagesArray!: FormGroup<CarriageForm>[];
  retrievedCarriagesForm = new FormGroup({
    code: new FormControl(''),
    name: new FormControl(''),
    rows: new FormControl(0),
    leftSeats: new FormControl(0),
    rightSeats: new FormControl(0),
  });
  public createCarriageForm!: FormGroup<CarriageForm>;
  create = signal(false);
  update = signal(false);

  possibleRows: CarriageCreatingParams[] = [
    { value: 'row-2', viewValue: '2' },
    { value: 'row-3', viewValue: '3' },
    { value: 'row-4', viewValue: '4' },
    { value: 'row-5', viewValue: '5' },
    { value: 'row-6', viewValue: '6' },
    { value: 'row-7', viewValue: '7' },
    { value: 'row-8', viewValue: '8' },
    { value: 'row-8', viewValue: '9' },
    { value: 'row-8', viewValue: '10' },
  ];

  possibleLeftSeats: CarriageCreatingParams[] = [
    { value: 'leftSeats-1', viewValue: '1' },
    { value: 'leftSeats-2', viewValue: '2' },
    { value: 'leftSeats-3', viewValue: '3' },
  ];

  possibleRightSeats: CarriageCreatingParams[] = [
    { value: 'rightSeats-1', viewValue: '1' },
    { value: 'rightSeats-2', viewValue: '2' },
    { value: 'leftSeats-3', viewValue: '3' },
  ];

  initialPostCarriagesArray = [
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
      leftSeats: 3,
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

  constructor(
    private fb: NonNullableFormBuilder,
    private httpClient: HttpClient,
  ) {}

  ngOnInit() {
    // this.carriageForm = this.carriageFormInstance;
    this.getCarriagesData();
    this.retrievedCarriagesForm = new FormGroup({
      code: new FormControl(''),
      name: new FormControl(''),
      rows: new FormControl(0),
      leftSeats: new FormControl(0),
      rightSeats: new FormControl(0),
    });
  }

  carriageParamsToUpdate = {};

  public getCarriages(): Observable<Carriage[]> {
    return this.httpClient.get<Carriage[]>('carriage');
  }

  public getCarriagesData() {
    this.getCarriages().subscribe((data) => {
      console.log(data);
      this.carriagesData = data.filter((item) => {
        return item.code !== '';
      });
    });
  }

  public postCarriage() {
    return this.httpClient.post<Carriage>('carriage', this.initialPostCarriagesArray[2]);
  }

  public updateCarriages(code: string, body: Carriage) {
    return this.httpClient.put<Carriage>(`carriage/{ '${code}' }`, body);
  }

  public createCarriage() {
    /* this.postCarriages().subscribe((data) => {
      console.log(data);
    }); */

    this.create.set(!this.create());

    return (this.createCarriageForm = this.fb.group<CarriageForm>({
      name: this.fb.control(
        { value: '', disabled: false },
        {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(20)],
        },
      ),
      rows: this.fb.control(
        { value: 0, disabled: false },
        {
          validators: [Validators.required],
        },
      ),
      leftSeats: this.fb.control(
        { value: 0, disabled: false },
        {
          validators: [Validators.required],
        },
      ),
      rightSeats: this.fb.control(
        { value: 0, disabled: false },
        {
          validators: [Validators.required],
        },
      ),
    }));
  }

  /* public saveCarriage() {
    this.carriagesArray.push(this.carriageForm);
  } */

  /* ngOnInit() {
    this.carriageForm = this.carriageFormInstance;
  } */

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

  /*  public paintCarriage(this.initialPostCarriagesArray[0]) {

  } */
}
