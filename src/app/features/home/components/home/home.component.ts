import { AsyncPipe, CommonModule, UpperCasePipe } from '@angular/common';
import { Component, ElementRef, inject, model, OnInit, signal, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
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
import { MatSelect } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouteModalComponent } from '../route-modal/route-modal.component';

export interface Trip {
  name: string;
}

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
    ButtonComponent,
    CommonModule,
    FormsModule,
    MatSelect,
    MatLabel,
    MatOption,
    MatDialogModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  @ViewChild('inputFrom') inputFrom!: ElementRef<HTMLInputElement>;
  @ViewChild('inputTo') inputTo!: ElementRef<HTMLInputElement>;
  public searchForm!: FormGroup<SearchForm>;
  public carriageName!: string | undefined;
  public rowNumber!: number;
  public leftSeatCount!: number;
  public rightSeatCount!: number;
  public searchCarriages = signal(false);
  public searchRides = signal(false);
  public filteredOptions!: string[];
  public filteredTestCitiesFrom!: Observable<string[]>;
  public filteredTestCitiesTo!: Observable<string[]>;
  public isSeatSelected = signal(false);
  public minDate = new Date();
  public dialog = inject(MatDialog);
  public popupRoute = signal('');
  public routeValue = model('');

  testCities: string[] = ['london', 'Paris', 'Amsterdam', 'Kirovsk', 'SPb'];
  testCarriages: Carriage[] = [
    { code: 'lalala', name: 'lalala', rows: 5, leftSeats: 2, rightSeats: 2 },
    { code: 'justCarriage', name: 'justCarriage', rows: 10, leftSeats: 3, rightSeats: 1 },
    { code: 'oneMore', name: 'oneMore', rows: 6, leftSeats: 2, rightSeats: 3 },
    { code: 'carriage2A', name: 'carriage2A', rows: 16, leftSeats: 2, rightSeats: 2 },
  ];
  // testTrips: Trip[] = [{ name: 'ride1' }, { name: 'ride2' }, { name: 'ride3' }, { name: 'ride4' }];
  testTrips: Trip[] = [];

  constructor(private fb: NonNullableFormBuilder) {
    this.filteredOptions = this.testCities.slice();
  }

  ngOnInit() {
    this.searchForm = this.searchFormInstance;
    this.filteredTestCitiesFrom = this.searchForm.controls.from.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '')),
    );
    this.filteredTestCitiesTo = this.searchForm.controls.to.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '')),
    );
  }

  public filterFrom() {
    const filterValue = this.inputFrom.nativeElement.value.toLowerCase();
    this.filteredOptions = this.testCities.filter((item) => item.toLowerCase().includes(filterValue));
  }

  public filterTo() {
    const filterValue = this.inputTo.nativeElement.value.toLowerCase();
    this.filteredOptions = this.testCities.filter((item) => item.toLowerCase().includes(filterValue));
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
        {
          validators: [Validators.required],
        },
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

  public getRides() {
    this.searchRides.set(true);
    // api call here
  }

  public pickTrip() {
    this.getCarriages();
  }

  public getCarriages() {
    this.searchCarriages.set(true);
    // api call here
    // this.carriages = data
  }

  public buyTicket() {
    // api call here
  }

  onSubmit() {
    this.searchForm.reset();
  }

  public openRouteModal() {
    const dialogRef = this.dialog.open(RouteModalComponent, {
      data: {
        routes: [
          { time: '18:00', station: 'endStationName', stop: 'First station' },
          { time: '19:00', station: 'lalala1', stop: '2m' },
          { time: '20:00', station: 'lalala2', stop: '5m' },
          { time: '20:00', station: 'startStationName', stop: 'Last station' },
        ],
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      return;
    });
  }
}
