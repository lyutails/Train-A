import { AsyncPipe, CommonModule, UpperCasePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
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
import { HomeFacade } from '../../services/home.facade';
import { StationInfo } from '../../../admin/features/stations/models/station-info';
import { transformDateToUnixString } from './helpers/transform-date-to-unix-string';
import { SearchApi } from '../../models/search-form-api.model';

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
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('inputFrom') inputFrom!: ElementRef<HTMLInputElement>;
  @ViewChild('inputTo') inputTo!: ElementRef<HTMLInputElement>;
  public searchForm!: FormGroup<SearchForm>;
  public carriageName!: string | undefined;
  public rowNumber!: number;
  public leftSeatCount!: number;
  public rightSeatCount!: number;
  public searchRides = signal(false);
  public filteredOptions!: string[];
  public filteredCitiesFrom!: Observable<string[]>;
  public filteredCitiesTo!: Observable<string[]>;
  public isSeatSelected = signal(false);
  public minDate = new Date();
  public width!: number;
  public prev!: HTMLElement;
  public next!: HTMLElement;
  public content!: HTMLElement;
  public cities: string[] = [];
  public stationsData: StationInfo[] = [];

  testTrips: Trip[] = [{ name: 'ride1' }, { name: 'ride2' }, { name: 'ride3' }, { name: 'ride4' }];
  // to check pic for no rides: testTrips: Trip[] = [];
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

  constructor(
    private fb: NonNullableFormBuilder,
    private readonly homeFacade: HomeFacade,
  ) {
    this.homeFacade.stations.subscribe({
      next: (stations) => {
        this.filteredOptions = stations.map((station) => station.city);
        this.cities = [...this.filteredOptions];
        this.stationsData = stations;
      },
    });
  }

  ngOnInit() {
    this.searchForm = this.searchFormInstance;
    this.filteredCitiesFrom = this.searchForm.controls.from.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '')),
    );
    this.filteredCitiesTo = this.searchForm.controls.to.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '')),
    );
  }

  ngAfterViewInit(): void {
    this.prev = document.querySelector('#prev')!;
    this.next = document.querySelector('#next')!;
    this.content = document.querySelector('#carousel-content')!;
    if (!this.prev) {
      throw new Error('no prev out there');
    }
    if (!this.next) {
      throw new Error('no next out there');
    }
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
    if (this.prev) {
      this.prev.addEventListener('click', () => {
        this.content.scrollBy(-(this.width + 10), 0);
      });
    }
    if (this.next) {
      this.next.addEventListener('click', () => {
        this.content.scrollBy(this.width + 10, 0);
      });
    }
  }

  public filterFrom() {
    const filterValue = this.inputFrom.nativeElement.value.toLowerCase();
    this.filteredOptions = this.cities.filter((item) => item.toLowerCase().includes(filterValue));
  }

  public filterTo() {
    const filterValue = this.inputTo.nativeElement.value.toLowerCase();
    this.filteredOptions = this.cities.filter((item) => item.toLowerCase().includes(filterValue));
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.cities.filter((city) => city.toLowerCase().includes(filterValue));
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
      time: this.fb.control({ value: '', disabled: false }),
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
    const search: SearchApi = this.createSearchApiObject();
    console.log(search);
    // api call here
  }

  public buyTicket() {
    // api call here
  }

  onSubmit() {
    if (this.searchForm.invalid) {
      return;
    }
    this.searchForm.reset();
  }

  private createSearchApiObject() {
    let unixTime: number | undefined;
    if (this.searchTimeFormControl.value) {
      unixTime = transformDateToUnixString(this.searchDateFormControl.value, this.searchTimeFormControl.value);
    }
    return {
      fromLatitude: this.stationsData.find((city) => city.city === this.searchFromFormControl.value)?.latitude || 0,
      fromLongitude: this.stationsData.find((city) => city.city === this.searchFromFormControl.value)?.longitude || 0,
      toLatitude: this.stationsData.find((city) => city.city === this.searchToFormControl.value)?.latitude || 0,
      toLongitude: this.stationsData.find((city) => city.city === this.searchToFormControl.value)?.longitude || 0,
      ...(unixTime !== undefined && { time: unixTime }),
    };
  }
}
