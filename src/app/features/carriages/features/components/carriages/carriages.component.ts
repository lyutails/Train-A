import { Component, signal } from '@angular/core';
import { ButtonComponent } from '../../../../../common/button/button.component';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { Carriage } from '../models/carriages.model';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { Observable } from 'rxjs';

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
  ],
  templateUrl: './carriages.component.html',
  styleUrl: './carriages.component.scss',
})
export class CarriagesComponent {
  /* public carriageForm!: FormGroup<Carriage>; */
  public carriagesArray!: FormGroup<Carriage>[];
  create = signal(false);
  update = signal(false);
  selectedRowsValue = '';
  selectedLeftSideSeatsValue = '';
  selectedRightSideSeatsValue = '';
  carriagesData!: Carriage[];

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
  ];

  constructor(
    private http: HttpClient,
    private fb: NonNullableFormBuilder,
    private httpClient: HttpClient,
  ) {}

  /* ngOnInit() {
    this.carriageForm = this.carriageFormInstance;
  } */

  carriageInputValues = {
    name: '',
    rows: 0,
    leftSeats: 0,
    rightSide: 0,
  };

  carriageParamsToUpdate = {};

  public getCarriages(): Observable<Carriage> {
    return this.httpClient.get<Carriage>('carriage');
  }

  public getCarriagesInfo() {
    this.getCarriages().subscribe((data) => {
      console.log(data);
    });
  }

  public postCarriages() {
    return this.httpClient.post<Carriage>('carriage', this.testCarriagesArray[2]);
  }

  public updateCarriages(code: string, body: Carriage) {
    return this.httpClient.put<Carriage>(`carriage/{ ${code} }`, body);
  }

  public createCarriage() {
    /* this.postCarriages().subscribe((data) => {
      console.log(data);
    }); */
    this.getCarriagesInfo();

    this.create.set(!this.create());
    return this.fb.group({
      name: this.fb.control({ value: '', disabled: false }),
      rows: this.fb.control({ value: 0, disabled: false }),
      leftSeats: this.fb.array([new FormControl()]),
      rightSeats: this.fb.array([new FormControl()]),
    });
  }

  /* public saveCarriage() {
    this.carriagesArray.push(this.carriageForm);
  } */

  /* ngOnInit() {
    this.carriageForm = this.carriageFormInstance;
  } */

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

  /* private register() {
    this.getCarriages(this.userInfo).subscribe({
      next: () => {
        this.router.navigate(['auth/signin']);
      },
      error: ({ error }: HttpErrorResponse) => {
        if (error.reason === 'invalidUniqueKey') {
          this.signUpForm.controls['email'].setErrors({ invalidUniqueKey: true });
          this.emailValue.set(this.signUpForm.controls.email.value);
        }
      },
    });
  } */
}
