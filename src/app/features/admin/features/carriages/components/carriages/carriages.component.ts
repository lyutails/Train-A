import { Component, OnInit, signal } from '@angular/core';
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
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { CarriageRowComponent } from '../carriage-row/carriage-row.component';
import { Carriage } from '../../models/carriage.model';
import { CarriageForm } from '../../models/carriage-form.model';
import { CarriageCreatingParams } from '../../models/carriage-select.model';
import { ButtonComponent } from '../../../../../../common/button/button.component';
import { CarriagesService } from '../../../../../../repositories/carriages/services/carriages.service';
import { SELECT_OPTIONS_ROWS } from '../../models/carrage-option-rows';
import { SELECT_RIGHT_OPTION_ROWS } from '../../models/carriages-right-seat-default';
import { SELECT_LEFT_OPTION_ROWS } from '../../models/carriages-left-seat-default';

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
  public carriagesData!: Carriage[];
  public retrievedCarriagesForm!: FormGroup<CarriageForm>;
  public createCarriageForm!: FormGroup<CarriageForm>;
  public create = signal(false);
  public update = signal(false);
  public carriageBluePrint!: Carriage;
  public carrigeCode = '';
  public carriageData!: Carriage;
  public selectOptionsRows: CarriageCreatingParams[] = SELECT_OPTIONS_ROWS;
  public selectOptionsLeftSeats: CarriageCreatingParams[] = SELECT_LEFT_OPTION_ROWS;
  public selectOptionsRightSeats: CarriageCreatingParams[] = SELECT_RIGHT_OPTION_ROWS;

  constructor(
    private fb: NonNullableFormBuilder,
    private carriagesService: CarriagesService,
  ) {}

  ngOnInit() {
    this.getCarriagesData();
    this.createCarriageForm = this.createCarriageFormInstance;
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
      name: this.createCarriageForm.controls.name?.value,
      rows: +this.createCarriageForm.controls.rows.value,
      leftSeats: +this.createCarriageForm.controls.leftSeats.value,
      rightSeats: +this.createCarriageForm.controls.rightSeats.value,
    };
    this.carriagesService.postCarriage(carriageWithoutCode).subscribe((data) => {
      this.carriagesData.unshift({
        code: data.code,
        ...carriageWithoutCode,
      });
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
    return this.carriageData;
  }

  public getCarriageCode(code: string) {
    return (this.carrigeCode = code);
  }

  public updateExistingCarriage() {
    const carriageWithoutCode = {
      name: this.createCarriageForm.controls.name?.value,
      rows: +this.createCarriageForm.controls.rows.value,
      leftSeats: +this.createCarriageForm.controls.leftSeats.value,
      rightSeats: +this.createCarriageForm.controls.rightSeats.value,
    };
    if (this.createCarriageForm.controls.code !== undefined && this.createCarriageForm.controls.name !== undefined) {
      this.carriagesService.updateCarriage(this.carrigeCode, carriageWithoutCode).subscribe(() => {
        const updatedCarriageIndex = this.carriagesData.findIndex((item) => item.code === this.carrigeCode);
        const updatedCarriage = {
          code: this.carrigeCode,
          ...carriageWithoutCode,
        };
        this.carriagesData[updatedCarriageIndex] = updatedCarriage;
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

  private get retrievedCarriagesFormInstance(): FormGroup<CarriageForm> {
    return this.fb.group<CarriageForm>({
      code: this.fb.control({ value: '', disabled: false }),
      name: this.fb.control({ value: '', disabled: false }),
      rows: this.fb.control({ value: 0, disabled: false }),
      leftSeats: this.fb.control({ value: 0, disabled: false }),
      rightSeats: this.fb.control({ value: 0, disabled: false }),
    });
  }

  onSubmit() {
    if (this.createCarriageForm.valid) {
      this.create.set(false);
    }
  }
}
