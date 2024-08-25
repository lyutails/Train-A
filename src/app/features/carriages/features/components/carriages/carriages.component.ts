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
import { RowsTrimPipe } from '../pipes/rows-trim.pipe';
import { LeftSeatsTrimPipe } from '../pipes/left-seats-trim.pipe';
import { RigthSeatsTrimPipe } from '../pipes/rigth-seats-trim.pipe';

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
    RowsTrimPipe,
    LeftSeatsTrimPipe,
    RigthSeatsTrimPipe,
  ],
  templateUrl: './carriages.component.html',
  styleUrl: './carriages.component.scss',
})
export class CarriagesComponent implements OnInit {
  selectedRowsValue = '';
  selectedLeftSideSeatsValue = '';
  selectedRightSideSeatsValue = '';
  carriagesData!: Carriage[];
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
  carriageBluePrint!: Carriage;

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
      name: 'carriage2F',
      rows: 12,
      leftSeats: 2,
      rightSeats: 2,
    },
    {
      name: 'carriage8K',
      rows: 10,
      leftSeats: 3,
      rightSeats: 3,
    },
    {
      name: 'carriageVIP',
      rows: 6,
      leftSeats: 1,
      rightSeats: 1,
    },
    {
      name: 'lalala',
      rows: 8,
      leftSeats: 3,
      rightSeats: 1,
    },
  ];

  constructor(
    private fb: NonNullableFormBuilder,
    private httpClient: HttpClient,
  ) {}

  ngOnInit() {
    this.getCarriagesData();
    this.createCarriageForm = this.createCarriageFormInstance;
    this.retrievedCarriagesForm = new FormGroup({
      code: new FormControl(''),
      name: new FormControl(''),
      rows: new FormControl(0),
      leftSeats: new FormControl(0),
      rightSeats: new FormControl(0),
    });
  }

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

  public get carriageNameFormControl(): FormControl<string> {
    if (this.createCarriageForm.controls.name !== undefined) {
      return this.createCarriageForm.controls.name;
    } else {
      throw new Error('no carriage name provided');
    }
  }

  public get carriageRowsFormControl(): FormControl<number> {
    return this.createCarriageForm.controls.rows;
  }

  public get carriageLeftSeatsFormControl(): FormControl<number> {
    return this.createCarriageForm.controls.leftSeats;
  }

  public get carriageRightSeatsFormControl(): FormControl<number> {
    return this.createCarriageForm.controls.rightSeats;
  }

  public postCarriage(data: Carriage) {
    console.log('post');
    // console.log(data);
    return this.httpClient.post<Carriage>('carriage', data);
  }

  passPostCarriageData() {
    this.postCarriage({
      name: this.createCarriageForm.controls.name?.value,
      rows: +this.createCarriageForm.controls.rows.value,
      leftSeats: +this.createCarriageForm.controls.leftSeats.value,
      rightSeats: +this.createCarriageForm.controls.rightSeats.value,
    }).subscribe((data) => {
      console.log(data);
    });
  }

  public createCarriageView() {
    this.create.set(!this.create());
  }

  private get createCarriageFormInstance(): FormGroup<CarriageForm> {
    return this.fb.group<CarriageForm>({
      code: this.fb.control({ value: '', disabled: false }),
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
    });
  }

  public updateCarriages(code: string, body: Carriage) {
    return this.httpClient.put<Carriage>(`carriage/{ '${code}' }`, body);
  }

  onSubmit() {
    if (this.createCarriageForm.valid) {
      console.log('create is valid');
    }
  }
}
