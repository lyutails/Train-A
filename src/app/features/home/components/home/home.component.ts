import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatFormField, MatFormFieldModule, MatHint, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { ButtonComponent } from '../../../../common/button/button.component';
import { SearchForm } from '../../models/search-form.model';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TrimPipe } from '../../../../common/pipes/trim-pipe/trim.pipe';
import { Carriage } from '../../../admin/features/carriages/models/carriage.model';
import { CarriageRowComponent } from '../../../admin/features/carriages/components/carriage-row/carriage-row.component';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'TTP-home',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon,
    MatSuffix,
    MatDatepicker,
    MatHint,
    MatDatepickerToggle,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    UpperCasePipe,
    MatButton,
    ReactiveFormsModule,
    ButtonComponent,
    MatAutocompleteModule,
    TrimPipe,
    CarriageRowComponent,
    AsyncPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public searchForm!: FormGroup<SearchForm>;
  private datePattern = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
  cityControl = new FormControl('');
  carriageName!: string | undefined;
  rowNumber!: number;
  leftSeatCount!: number;
  rightSeatCount!: number;

  testCities: string[] = ['london', 'Paris', 'Amsterdam', 'Kirovsk', 'SPb'];
  filteredTestCities!: Observable<string[]>;

  testCarriages: Carriage[] = [
    { code: 'lalala', name: 'lalala', rows: 5, leftSeats: 2, rightSeats: 2 },
    { code: 'justCarriage', name: 'justCarriage', rows: 10, leftSeats: 3, rightSeats: 1 },
    { code: 'oneMore', name: 'oneMore', rows: 6, leftSeats: 2, rightSeats: 3 },
    { code: 'carriage2A', name: 'carriage2A', rows: 16, leftSeats: 2, rightSeats: 2 },
  ];

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit() {
    this.searchForm = this.searchFormInstance;
    this.filteredTestCities = this.cityControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '')),
    );
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.testCities.filter((city) => city.toLowerCase().includes(filterValue));
  }

  private get searchFormInstance(): FormGroup<SearchForm> {
    return this.fb.group<SearchForm>({
      from: this.fb.control(
        { value: '', disabled: false },
        {
          validators: [Validators.required],
        },
      ),
      to: this.fb.control(
        { value: '', disabled: false },
        {
          validators: [Validators.required],
        },
      ),
      date: this.fb.control(
        { value: '', disabled: false },
        /* {
          validators: [Validators.required, Validators.pattern(this.datePattern)],
        }, */
      ),
    });
  }

  public get searchFromFormControl(): FormControl<string> {
    return this.searchForm.controls.from;
  }

  public get searchToFormControl(): FormControl<string> {
    return this.searchForm.controls.to;
  }

  public get searchDateFormControl(): FormControl<string> {
    return this.searchForm.controls.date;
  }

  public getCarriages() {
    // api call here
    // this.carriages = data
    // tolowercase
  }

  public searchTrips() {
    // api call here
  }

  onSubmit() {
    this.searchForm.reset();
  }
}
