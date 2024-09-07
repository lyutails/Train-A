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
import { debounceTime, filter, map, Observable, Subject } from 'rxjs';
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
  public filteredCitiesFrom!: Observable<string[]>;
  public filteredCitiesTo!: Observable<string[]>;
  public isSeatSelected = signal(false);
  public minDate = new Date();
  public width!: number;
  public height!: number;
  public windowHeight!: number;
  public homeContent!: HTMLElement;
  public prev!: HTMLElement;
  public next!: HTMLElement;
  public content!: HTMLElement;
  public cities: string[] = [];
  public stationsData: StationInfo[] = [];
  public showArrowTop = signal(false);

  private filterFromSubject: Subject<string> = new Subject<string>();

  private filterToSubject: Subject<string> = new Subject<string>();

  constructor(
    private fb: NonNullableFormBuilder,
    public homeFacade: HomeFacade,
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
    this.homeContent = document.getElementById('home')!;
    this.height = this.homeContent.offsetHeight;
    this.windowHeight = window.innerHeight;

    this.searchForm = this.searchFormInstance;
    this.filterFromSubject
      .pipe(
        debounceTime(350),
        map((value: string | null) => value?.trim().toLowerCase() ?? ''),
        filter((value) => this.shouldEmitValue(value)),
      )
      .subscribe((value) => {
        this.filterCities(value, 'from');
      });

    this.filterToSubject
      .pipe(
        debounceTime(350),
        map((value: string | null) => value?.trim().toLowerCase() ?? ''),
        filter((value) => this.shouldEmitValue(value)),
      )
      .subscribe((value) => {
        this.filterCities(value, 'to');
      });
    this.searchDateFormControl.valueChanges.subscribe((value) => {
      this.toggleTimeControl(value);
    });
  }

  private shouldEmitValue(controlValue: string): boolean {
    return Boolean(controlValue) && controlValue.length > 2;
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

  ngAfterViewChecked(): void {
    this.height = this.homeContent.offsetHeight;
    this.windowHeight = window.innerHeight;
    if (this.height > this.windowHeight) {
      this.showArrowTop.set(true);
    }
  }

  public filterFrom() {
    this.filterFromSubject.next(this.inputFrom.nativeElement.value);
  }

  public filterTo() {
    this.filterToSubject.next(this.inputTo.nativeElement.value);
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
    localStorage.removeItem('seatNumber');
    localStorage.removeItem('carriageName');
    localStorage.removeItem('carriageNumber');

    if (this.searchForm.invalid) {
      return;
    }
    const search: SearchApi = this.createSearchApiObject();
    this.homeFacade.searchTickets(search).subscribe({
      error: () => {
        this.homeFacade.trainSearchResults.next([]);
        this.homeFacade.routesDates.next([]);
      },
      complete: () => {
        this.searchRides.set(true);
      },
    });
  }

  onSubmit() {
    if (this.searchForm.invalid) {
      return;
    }
    this.searchForm.reset();
  }

  private createSearchApiObject() {
    let unixTime: number;
    if (this.searchTimeFormControl.value) {
      unixTime = transformDateToUnixString(this.searchDateFormControl.value, this.searchTimeFormControl.value);
    } else {
      unixTime = transformDateToUnixString(this.searchDateFormControl.value, '00:00');
    }
    return {
      fromLatitude: this.getCityCoordinateOrExternal(this.searchFromFormControl.value, 'latitude'),
      fromLongitude: this.getCityCoordinateOrExternal(this.searchFromFormControl.value, 'longitude'),
      toLatitude: this.getCityCoordinateOrExternal(this.searchToFormControl.value, 'latitude'),
      toLongitude: this.getCityCoordinateOrExternal(this.searchToFormControl.value, 'longitude'),
      ...(unixTime !== undefined && { time: unixTime }),
    };
  }

  private getCityCoordinateOrExternal(cityName: string, coordinateType: 'latitude' | 'longitude'): number {
    const localCoordinate = this.getCityCoordinate(cityName, coordinateType);
    if (localCoordinate !== 0) {
      return localCoordinate;
    }
    return this.getExternalCityCoordinate(cityName, coordinateType);
  }

  private getCityCoordinate(cityName: string, coordinateType: 'latitude' | 'longitude'): number {
    const city = this.stationsData.find((c) => c.city === cityName);
    return city ? (coordinateType === 'latitude' ? city.latitude : city.longitude) : 0;
  }

  private getExternalCityCoordinate(cityName: string, coordinateType: 'latitude' | 'longitude'): number {
    let coordinate = 0;

    this.homeFacade.cities$
      .pipe(map((cities) => cities.find((city) => city.display_name === cityName)))
      .subscribe((city) => {
        if (city) {
          coordinate = coordinateType === 'latitude' ? parseFloat(city.lat) : parseFloat(city.lon);
        }
      });

    return coordinate;
  }

  public filterCities(inputString: string, filterType: 'from' | 'to') {
    const localFiltered = this.cities.filter((item) => item.toLowerCase().includes(inputString));

    if (localFiltered.length > 0) {
      this.filteredOptions = localFiltered;
    } else {
      this.homeFacade.getCity(inputString).subscribe({
        next: (result) => {
          this.filteredOptions = result.map((city) => city.display_name);
        },
        error: (err) => {
          console.error(`Error fetching city for ${filterType}:`, err);
          this.filteredOptions = [];
        },
      });
    }
  }

  public trackByCity(index: number, city: string): string {
    return city;
  }

  private toggleTimeControl(date: string) {
    if (date) {
      this.searchTimeFormControl.enable();
    } else {
      this.searchTimeFormControl.disable();
      this.searchTimeFormControl.setValue('');
    }
  }
}
