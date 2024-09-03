import { SELECT_OPTIONS_ROWS } from './../../models/select-options-rows.model';
import { Component, inject, OnInit, signal } from '@angular/core';
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
import { CarriageCreatingParams } from '../../models/carriage-select.model';
import { SELECT_LEFT_OPTION_ROWS } from '../../models/select-options-left-seats.model';
import { SELECT_RIGHT_OPTION_ROWS } from '../../models/select-options-right-seats.model';
import { ButtonComponent } from '../../../../../../common/button/button.component';
import { CarriagesService } from '../../../../../../repositories/carriages/services/carriages.service';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../../../../../common/services/loading/loading.service';

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
    MatProgressSpinner,
    MatProgressSpinnerModule,
  ],
  templateUrl: './carriages.component.html',
  styleUrl: './carriages.component.scss',
})
export class CarriagesComponent implements OnInit {
  public carriagesData!: Carriage[];
  public carriageData!: Carriage;
  public carrigeCode = '';
  public retrievedCarriagesForm!: FormGroup<CarriageForm>;
  public carriageForm!: FormGroup<CarriageForm>;
  public create = signal(false);
  public update = signal(false);
  public selectOptionsRows!: CarriageCreatingParams[];
  public selectOptionsLeftSeats!: CarriageCreatingParams[];
  public selectOptionsRightSeats!: CarriageCreatingParams[];
  loadingService = inject(LoadingService);

  constructor(
    private fb: NonNullableFormBuilder,
    private carriagesService: CarriagesService,
  ) {}

  ngOnInit() {
    this.getCarriagesData();
    this.carriageForm = this.carriageFormInstance;
    this.retrievedCarriagesForm = this.retrievedCarriagesFormInstance;
  }

  public getCarriagesData() {
    this.carriagesService.getCarriages().subscribe((data) => {
      this.carriagesData = data.filter((item) => {
        return item.code !== '';
      });
    });
  }

  public createCarriageData() {
    const carriageWithoutCode = {
      name: this.carriageForm.controls.name?.value,
      rows: +this.carriageForm.controls.rows.value,
      leftSeats: +this.carriageForm.controls.leftSeats.value,
      rightSeats: +this.carriageForm.controls.rightSeats.value,
    };
    this.carriagesService.postCarriage(carriageWithoutCode).subscribe((data) => {
      this.carriagesData.unshift({
        code: data.code,
        ...carriageWithoutCode,
      });
    });
    this.carriageForm.reset();
    this.create.set(false);
    this.update.set(false);
  }

  public showCreateCarriageView() {
    this.selectOptionsRows = SELECT_OPTIONS_ROWS;
    this.selectOptionsLeftSeats = SELECT_LEFT_OPTION_ROWS;
    this.selectOptionsRightSeats = SELECT_RIGHT_OPTION_ROWS;
    this.create.set(true);
    if (this.create()) {
      this.update.set(false);
    }
    this.carriageForm.reset();
  }

  public getCarriageData(data: Carriage) {
    this.carriageData = data;
    return this.carriageData;
  }

  public getCarriageCode(code: string) {
    return (this.carrigeCode = code);
  }

  public updateExistingCarriage() {
    const carriageWithoutCode = {
      name: this.carriageForm.controls.name?.value,
      rows: +this.carriageForm.controls.rows.value,
      leftSeats: +this.carriageForm.controls.leftSeats.value,
      rightSeats: +this.carriageForm.controls.rightSeats.value,
    };
    if (this.carriageForm.controls.code !== undefined && this.carriageForm.controls.name !== undefined) {
      this.carriagesService.updateCarriage(this.carrigeCode, carriageWithoutCode).subscribe(() => {
        const updatedCarriageIndex = this.carriagesData.findIndex((item) => item.code === this.carrigeCode);
        const updatedCarriage = {
          code: this.carrigeCode,
          ...carriageWithoutCode,
        };
        this.carriagesData[updatedCarriageIndex] = updatedCarriage;
      });
    }
    this.carriageForm.reset();
    this.update.set(false);
    this.create.set(false);
  }

  public showUpdateCarriageView() {
    this.selectOptionsRows = SELECT_OPTIONS_ROWS;
    this.selectOptionsLeftSeats = SELECT_LEFT_OPTION_ROWS;
    this.selectOptionsRightSeats = SELECT_RIGHT_OPTION_ROWS;
    this.update.set(!this.update());
    if (this.update()) {
      this.create.set(false);
    }
    if (this.update()) {
      const carriageDataForUpdate = {
        name: this.carriageForm.controls.name?.value,
        rows: +this.carriageForm.controls.rows.value,
        leftSeats: +this.carriageForm.controls.leftSeats.value,
        rightSeats: +this.carriageForm.controls.rightSeats.value,
      };
      return carriageDataForUpdate;
    }
    return;
  }

  private get carriageFormInstance(): FormGroup<CarriageForm> {
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
    if (this.carriageForm.controls.name !== undefined) {
      return this.carriageForm.controls.name;
    } else {
      throw new Error('no carriage name provided');
    }
  }

  public get carriageRowsFormControl(): FormControl<number> {
    return this.carriageForm.controls.rows;
  }

  public get carriageLeftSeatsFormControl(): FormControl<number> {
    return this.carriageForm.controls.leftSeats;
  }

  public get carriageRightSeatsFormControl(): FormControl<number> {
    return this.carriageForm.controls.rightSeats;
  }

  public get carriageCodeFormControl(): FormControl<string> {
    if (this.carriageForm.controls.code !== undefined) {
      return this.carriageForm.controls.code;
    } else {
      throw new Error('no code provided');
    }
  }

  private get retrievedCarriagesFormInstance(): FormGroup<CarriageForm> {
    return this.fb.group<CarriageForm>({
      code: this.fb.control({ value: '', disabled: false }),
      name: this.fb.control({ value: '', disabled: false }),
      rows: this.fb.control({ value: 0, disabled: false }),
      leftSeats: this.fb.control({ value: 0, disabled: false }),
      rightSeats: this.fb.control({ value: 0, disabled: false }),
    });
  }

  onCreateSubmit() {
    if (this.carriageForm.valid) {
      this.create.set(false);
    }
  }

  onUpdateSubmit() {
    if (this.carriageForm.valid) {
      this.update.set(false);
    }
  }
}
