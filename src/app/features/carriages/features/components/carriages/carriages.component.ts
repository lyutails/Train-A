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
import { CarriageRowComponent } from '../carriage-row/carriage-row.component';
import { CarriageForm } from '../../models/carriage-form.model';
import { CarriagesService } from '../../services/carriages.service';

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
  carrigeCode = '';
  carriageData!: Carriage;

  possibleRows: CarriageCreatingParams[] = [
    { value: '1', viewValue: '1' },
    { value: '2', viewValue: '2' },
    { value: '3', viewValue: '3' },
    { value: '4', viewValue: '4' },
    { value: '5', viewValue: '5' },
    { value: '6', viewValue: '6' },
    { value: '7', viewValue: '7' },
    { value: '8', viewValue: '8' },
    { value: '9', viewValue: '9' },
    { value: '10', viewValue: '10' },
    { value: '11', viewValue: '11' },
    { value: '12', viewValue: '12' },
    { value: '13', viewValue: '13' },
    { value: '14', viewValue: '14' },
    { value: '15', viewValue: '15' },
    { value: '16', viewValue: '16' },
    { value: '17', viewValue: '17' },
    { value: '18', viewValue: '18' },
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
      name: 'lalalaUp',
      rows: 3,
      leftSeats: 2,
      rightSeats: 2,
    },
  ];

  constructor(
    private fb: NonNullableFormBuilder,
    private httpClient: HttpClient,
    private carriagesService: CarriagesService,
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

  public getCarriagesData() {
    this.carriagesService.getCarriages().subscribe((data) => {
      console.log(data);
      this.carriagesData = data.filter((item) => {
        return item.code !== '';
      });
    });
  }

  public passPostCarriageData() {
    this.carriagesService
      .postCarriage({
        name: this.createCarriageForm.controls.name?.value,
        rows: +this.createCarriageForm.controls.rows.value,
        leftSeats: +this.createCarriageForm.controls.leftSeats.value,
        rightSeats: +this.createCarriageForm.controls.rightSeats.value,
      })
      .subscribe((data) => {
        console.log(data);
        this.getCarriagesData();
      });
  }

  public showCreateCarriageView() {
    this.create.set(!this.create());
    if (this.create()) {
      this.update.set(false);
    }
  }

  public getCarriageData(data: Carriage) {
    this.carriageData = data;
    console.log(this.carriageData);
    return this.carriageData;
  }

  public getCarriageCode(code: string) {
    return (this.carrigeCode = code);
  }

  public updateExistingCarriage() {
    if (this.createCarriageForm.controls.code !== undefined && this.createCarriageForm.controls.name !== undefined) {
      this.carriagesService
        .updateCarriage(this.carrigeCode, {
          name: this.createCarriageForm.controls.name?.value,
          rows: +this.createCarriageForm.controls.rows.value,
          leftSeats: +this.createCarriageForm.controls.leftSeats.value,
          rightSeats: +this.createCarriageForm.controls.rightSeats.value,
        })
        .subscribe((data) => {
          console.log(data);
          this.getCarriagesData();
        });
    }
    this.update.set(!this.update());
  }

  public showUpdateCarriageView() {
    this.update.set(!this.update());
    if (this.update()) {
      this.create.set(false);
    }
    if (this.update()) {
      const carriageDataForUpdate = {
        name: this.createCarriageForm.controls.name?.value,
        rows: +this.createCarriageForm.controls.rows.value,
        leftSeats: +this.createCarriageForm.controls.leftSeats.value,
        rightSeats: +this.createCarriageForm.controls.rightSeats.value,
      };
      return carriageDataForUpdate;
    }
    return;
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
          validators: [Validators.required, Validators.pattern('^([1-9]|1[0-8])$')],
        },
      ),
      leftSeats: this.fb.control(
        { value: 0, disabled: false },
        {
          validators: [Validators.required, Validators.pattern('^([1-9]|1[0-8])$')],
        },
      ),
      rightSeats: this.fb.control(
        { value: 0, disabled: false },
        {
          validators: [Validators.required, Validators.pattern('^([1-9]|1[0-8])$')],
        },
      ),
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

  public get carriageCodeFormControl(): FormControl<string> {
    if (this.createCarriageForm.controls.code !== undefined) {
      return this.createCarriageForm.controls.code;
    } else {
      throw new Error('no code provided');
    }
  }

  onSubmit() {
    if (this.createCarriageForm.valid) {
      this.create.set(false);
    }
  }
}
