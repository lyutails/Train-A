import { AsyncPipe, CommonModule, UpperCasePipe } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatFormFieldModule, MatHint, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from '../../../../common/button/button.component';
import { SearchForm } from '../../models/search-form.model';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TrimPipe } from '../../../../common/pipes/trim-pipe/trim.pipe';
import { CarriageRowComponent } from '../../../admin/features/carriages/components/carriage-row/carriage-row.component';
import { map, Observable, startWith } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { HomeRideComponent } from '../home-ride/home-ride.component';
import { RideDatesCarouselComponent } from '../ride-dates-carousel/ride-dates-carousel.component';
import { ArrowTopComponent } from '../../../../common/arrow-top/arrow-top.component';
import { SearchResponse } from '../../models/search-response';

export interface Trip {
  name: string;
}

export interface TripDates {
  date: string;
  day: string;
}

@Component({
  selector: 'TTP-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatIcon,
    MatSuffix,
    MatDatepicker,
    MatHint,
    MatDatepickerToggle,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    UpperCasePipe,
    MatButton,
    ButtonComponent,
    MatAutocompleteModule,
    TrimPipe,
    CarriageRowComponent,
    AsyncPipe,
    ButtonComponent,
    MatSelect,
    MatLabel,
    MatOption,
    MatTooltip,
    HomeRideComponent,
    RideDatesCarouselComponent,
    MatIconButton,
    ArrowTopComponent,
    MatTooltipModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: HomeComponent,
    },
  ],
})
export class HomeComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild('inputFrom') inputFrom!: ElementRef<HTMLInputElement>;
  @ViewChild('inputTo') inputTo!: ElementRef<HTMLInputElement>;
  public searchForm!: FormGroup<SearchForm>;
  public carriageName!: string | undefined;
  public rowNumber!: number;
  public leftSeatCount!: number;
  public rightSeatCount!: number;
  public searchRides = signal(false);
  public filteredOptions!: string[];
  public filteredTestCitiesFrom!: Observable<string[]>;
  public filteredTestCitiesTo!: Observable<string[]>;
  public isSeatSelected = signal(false);
  public minDate = new Date();
  public width!: number;
  public content!: HTMLElement;
  public dateValid = signal(false);

  testCities: string[] = ['London', 'Paris', 'Amsterdam', 'Kirovsk', 'SPb'];
  // currently in template from to are values from inputs
  tripsResponse: SearchResponse[] = [
    {
      from: {
        stationId: 5,
        city: 'Paris',
        geolocation: { latitude: 48.8575, longitude: 2.3514 },
      },
      to: {
        stationId: 48,
        city: 'London',
        geolocation: { latitude: 48.8575, longitude: 2.3514 },
      },
      routes: {
        id: 45,
        path: [33, 5, 62, 11, 48, 34],
        carriages: [
          'carriage_type_2',
          'carriage_type_2',
          'carriage_type_2',
          'carriage_type_2',
          'carriage_type_7',
          'carriage_type_7',
          'carriage_type_7',
          'carriage_type_7',
        ],
        schedule: [
          {
            rideId: 24,
            segments: {
              time: {
                departure_from_prev_station: '2024-08-08T22:19:57.708Z',
                arrival_at_next_station: '2024-08-12T03:29:57.708Z',
              },
              price: { type: 3523 },
              occupiedSeats: [345, 44, 3],
            },
          },
          {
            rideId: 576,
            segments: {
              time: {
                departure_from_prev_station: '2024-08-08T09:19:57.708Z',
                arrival_at_next_station: '2024-08-12T10:29:57.708Z',
              },
              price: { type: 3523 },
              occupiedSeats: [345, 44, 3],
            },
          },
          {
            rideId: 88,
            segments: {
              time: {
                departure_from_prev_station: '2024-08-08T12:19:57.708Z',
                arrival_at_next_station: '2024-08-12T13:29:57.708Z',
              },
              price: { type: 3523 },
              occupiedSeats: [345, 44, 3],
            },
          },
        ],
      },
    },
  ];

  // to show pic for no rides: tripsResponse: SearchResponse[] = [];

  allDaysChosenRideAvailableAt: TripDates[] = [
    { date: 'September 01', day: 'Monday' },
    { date: 'September 08', day: 'Monday' },
    { date: 'September 16', day: 'Monday' },
    { date: 'September 23', day: 'Monday' },
    { date: 'September 30', day: 'Monday' },
    { date: 'October 07', day: 'Monday' },
    { date: 'October 14', day: 'Monday' },
    { date: 'October 21', day: 'Monday' },
    { date: 'October 28', day: 'Monday' },
  ];

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

  ngAfterViewInit(): void {
    this.content = document.querySelector('#carousel-content')!;
    if (!this.content) {
      throw new Error('no content out there');
    }
    if (this.content) {
      this.width = this.content.offsetWidth;
      window.addEventListener('resize', () => {
        if (!this.content) {
          throw new Error('no content out there');
        }
        this.width = this.content.offsetWidth;
      });
    }
  }

  ngAfterViewChecked() {
    if (this.searchForm.controls.date.valid) {
      this.dateValid.set(true);
      this.searchForm.controls.time.enable();
    } else {
      this.dateValid.set(false);
      this.searchForm.controls.time.disable();
    }
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
      time: this.fb.control({ value: '', disabled: true }),
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

  public get searchTimeFormControl(): FormControl<string> {
    return this.searchForm.controls.time;
  }

  public getRides() {
    if (this.searchForm.valid) {
      this.searchRides.set(true);
    }
    console.log('date unix timestamp', Math.floor(new Date(this.searchForm.controls.date.value).getTime() / 1000));
    // api call here
  }

  onSubmit() {
    this.searchForm.reset();
  }

  moveLeft() {
    this.content.scrollBy(-(this.width + 10), 0);
  }

  moveRight() {
    this.content.scrollBy(this.width + 10, 0);
  }
}
