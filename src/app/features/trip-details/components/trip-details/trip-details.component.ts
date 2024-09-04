import { CommonModule } from '@angular/common';
import { AfterContentChecked, AfterViewInit, Component, inject, model, OnInit, signal } from '@angular/core';
import { ButtonComponent } from '../../../../common/button/button.component';
import { MatIcon } from '@angular/material/icon';
import { MatLabel } from '@angular/material/form-field';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthFacade } from '../../../../core/authorization/services/auth.facade';
import { RoleService } from '../../../../core/roles/role.service';
import { AuthBuySeatComponent } from '../auth-buy-seat/auth-buy-seat.component';
import { TripDetailsResponse } from '../../models/trip-details-response.model';
import { MatIconButton } from '@angular/material/button';
import { CarriagesCarouselComponent } from '../carriages-carousel/carriages-carousel.component';
import { HttpClient } from '@angular/common/http';
import { Carriage } from '../../../admin/features/carriages/models/carriage.model';
import { CarriageRowComponent } from '../../../admin/features/carriages/components/carriage-row/carriage-row.component';
import { Segments } from '../../models/segments.model';
import { Price } from '../../models/price.model';
import { LoadingService } from '../../../../common/services/loading/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'TTP-trip-details',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    MatIcon,
    MatLabel,
    MatCheckbox,
    MatIconButton,
    CarriagesCarouselComponent,
    CarriageRowComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './trip-details.component.html',
  styleUrl: './trip-details.component.scss',
})
export class TripDetailsComponent implements OnInit, AfterContentChecked, AfterViewInit {
  public popupAuth = signal('');
  public authValue = model('');
  public dialog = inject(MatDialog);
  public userRole = '';
  public openBookSeatPopup = signal(false);
  public seatIsSelected = signal(true);
  public width!: number;
  public content!: HTMLElement;
  public rideIdResponse!: TripDetailsResponse;
  public rideCarriagesNames!: string[];
  public allAvailableAppCarriages!: Carriage[];
  public uniqueCarriageNames!: string[];
  public filteredOnlyRideCarriagesTypes!: Carriage[];
  public allRideCarriages: Carriage[] = [];
  public allFilteredRideCarriages: Carriage[] = [];
  public areCarriages = signal(false);
  public filterSliderCarriageName!: string;
  public isCarriageTypeSelected = signal('');
  public trainCarriageNumber!: number[];
  public selectedSeat = '';
  public selectedCarriageName = '';
  public rideSegments: Segments[] = [];
  public selectedTrainCarriageNumber!: number;
  public rideAllSegmentsPrices!: Price[];
  public rideAllSegmentsPricesNumbers!: number[];
  public totalRidePrice!: number;
  public totalRidePrices: number[] = [];
  public uniqueCarriagePrices: number[] = [];
  public totalSelectedRidePrice = 0;
  loadingService = inject(LoadingService);
  viewChecked = signal(false);

  constructor(
    private router: Router,
    private authFacade: AuthFacade,
    private roleService: RoleService,
    private httpClient: HttpClient,
  ) {
    this.initializeUserRole();
  }

  rideId = 1;
  stationFrom = 39;
  stationTo = 132;

  ngOnInit() {
    this.httpClient.get<Carriage[]>('carriage').subscribe({
      next: (data) => {
        console.log(data);
        this.allAvailableAppCarriages = data;
      },
    });
    this.httpClient
      .get<TripDetailsResponse>(`search/${this.rideId}?from=${this.stationFrom}&to=${this.stationTo}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.rideCarriagesNames = data.carriages;
          console.log(data.carriages);
          this.uniqueCarriageNames = [...new Set(this.rideCarriagesNames)];
          if (data.carriages.length > 0) {
            this.areCarriages.set(true);
          }
          console.log(this.uniqueCarriageNames);
          console.log(this.allRideCarriages);
          this.rideCarriagesNames.map((element) => {
            for (let i = 0; i <= this.allAvailableAppCarriages.length - 1; i++) {
              if (this.allAvailableAppCarriages[i].code === element) {
                this.allRideCarriages.push(this.allAvailableAppCarriages[i]);
                this.allFilteredRideCarriages = this.allRideCarriages;
              }
            }
          });
          console.log(data.schedule.segments);
          this.rideSegments = data.schedule.segments;
          this.rideAllSegmentsPrices = [];
          this.rideSegments.map((item) => this.rideAllSegmentsPrices.push(item.price));
          console.log(this.rideAllSegmentsPrices);
          this.rideAllSegmentsPricesNumbers = [];
          this.uniqueCarriageNames.forEach((name) => {
            this.rideAllSegmentsPrices.map((price) => {
              if (price[name]) {
                this.rideAllSegmentsPricesNumbers.push(price[name]);
              }
              this.totalRidePrice = this.rideAllSegmentsPricesNumbers.reduce((acc, curr) => {
                return acc + curr;
              }, 0);
            });
            this.totalRidePrices.push(this.totalRidePrice);
            this.rideAllSegmentsPricesNumbers = [];
          });
          console.log(this.totalRidePrices);
        },
      });

    try {
      this.loadingService.show();
      this.viewChecked.set(false);
    } finally {
      this.loadingService.hide();
      this.viewChecked.set(true);
    }
  }

  ngAfterViewInit(): void {
    if (this.viewChecked()) {
      this.content = document.querySelector('#carousel-content')!;
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
  }

  ngAfterContentChecked() {
    if (this.filterSliderCarriageName) {
      this.allFilteredRideCarriages = this.allRideCarriages.filter(
        (item) => item.code === this.filterSliderCarriageName,
      );
      console.log(this.allRideCarriages);
      this.trainCarriageNumber = [];
      this.allRideCarriages.forEach((element, index) => {
        if (element.code === this.filterSliderCarriageName) {
          this.trainCarriageNumber.push(index);
        }
      });
    }
    if (!this.filterSliderCarriageName) {
      this.allFilteredRideCarriages = this.allRideCarriages;
      this.trainCarriageNumber = [];
      this.allRideCarriages.forEach((element, index) => {
        if (element.name === this.filterSliderCarriageName) {
          this.trainCarriageNumber.push(index);
        }
      });
    }

    if (localStorage.getItem('seatNumber') && localStorage.getItem('carriageName')) {
      this.selectedSeat = JSON.parse(localStorage.getItem('seatNumber') ?? '');
      // console.log(this.selectedSeat);
      console.log(localStorage.getItem('carriageName'));
      this.selectedCarriageName = JSON.parse(localStorage.getItem('carriageName') ?? '');

      if (this.selectedCarriageName && this.uniqueCarriageNames) {
        const carriageIndex = this.uniqueCarriageNames.indexOf(this.selectedCarriageName);
        this.totalSelectedRidePrice = this.totalRidePrices[carriageIndex];
      }
    }
  }

  redirectToHomePage() {
    this.router.navigate(['/']);
  }

  private initializeUserRole(): void {
    this.roleService.userRole$.subscribe((role) => {
      this.userRole = role;
    });

    if (this.authFacade.isAuthenticated) {
      this.authFacade.getUserRole();
    }
  }

  public get isAuthenticated(): boolean {
    return this.authFacade.isAuthenticated;
  }

  public openAuthModal() {
    const dialogRef = this.dialog.open(AuthBuySeatComponent, {
      data: this.authValue(),
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.authValue.set(result);
      }
    });
  }

  public buyTicket() {
    console.log('call api to buy ticket and /order');
    this.httpClient.post('order', { rideId: 1, seat: 33, stationStart: 69, stationEnd: 160 }).subscribe({
      next: (data) => {
        console.log(data);
      },
      /* error: ({ error }: HttpErrorResponse) => {
        if (error.reason === 'alreadyLoggedIn') {
          this.signInForm.controls['email'].setErrors({ alreadyLoggedIn: true });
        }
        if (error.reason === 'userNotFound') {
          this.signInForm.controls['email'].setErrors({ userNotFound: true });
        }
        if (error.reason === 'invalidEmail') {
          this.signInForm.controls['email'].setErrors({ invalidEmail: true });
        }
        if (error.reason === 'invalidFields') {
          this.signInForm.controls['email'].setErrors({ invalidFields: true });
        }
      }, */
    });
  }

  moveLeft() {
    this.content.scrollBy(-(this.width + 10), 0);
  }

  moveRight() {
    this.content.scrollBy(this.width + 10, 0);
  }

  getCarriageName(item: string) {
    this.filterSliderCarriageName = item;
    console.log(this.filterSliderCarriageName);
  }
}
