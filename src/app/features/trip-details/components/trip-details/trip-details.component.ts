import { CommonModule, DatePipe } from '@angular/common';
import { AfterContentChecked, AfterViewInit, Component, inject, model, OnInit, signal } from '@angular/core';
import { ButtonComponent } from '../../../../common/button/button.component';
import { MatIcon } from '@angular/material/icon';
import { MatLabel } from '@angular/material/form-field';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthFacade } from '../../../../core/authorization/services/auth.facade';
import { RoleService } from '../../../../core/roles/role.service';
import { AuthBuySeatComponent } from '../auth-buy-seat/auth-buy-seat.component';
import { TripDetailsResponse } from '../../models/trip-details-response.model';
import { MatIconButton } from '@angular/material/button';
import { CarriagesCarouselComponent } from '../carriages-carousel/carriages-carousel.component';
import { Carriage } from '../../../admin/features/carriages/models/carriage.model';
import { CarriageRowComponent } from '../../../admin/features/carriages/components/carriage-row/carriage-row.component';
import { Segments } from '../../models/segments.model';
import { Price } from '../../models/price.model';
import { LoadingService } from '../../../../common/services/loading/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TripDetailsService } from '../../services/trip-details.service';
import { TripRouteModalComponent } from '../trip-route-modal/trip-route-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    DatePipe,
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
  public occupiedSeats: number[][] = [];
  public freeSeats = 0;
  public ridePath!: number[];
  public firstStationIndex = 0;
  public lastStationIndex = 0;
  public rideId!: string;
  public queryParamFrom!: string;
  public queryParamTo!: string;
  public numberOfSeatsInCarriageType!: number[];
  public uniqueRideCarriages!: Carriage[];
  public departureTime = '';
  public arrivalTime = '';
  public selectedCarriageNumber = '';
  public snackBar = inject(MatSnackBar);
  loadingService = inject(LoadingService);
  viewChecked = signal(false);

  constructor(
    private router: Router,
    private authFacade: AuthFacade,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private tripDetailsService: TripDetailsService,
  ) {
    this.initializeUserRole();
  }

  ngOnInit() {
    this.tripDetailsService.getActiveOrder().subscribe((data) => console.log(data));
    this.tripDetailsService.getUsersOrders().subscribe((data) => console.log(data));

    const rideId = this.route.snapshot.paramMap.get('rideId');
    if (!rideId) {
      this.router.navigate(['/404']);
      return;
    }
    this.rideId = rideId;
    this.queryParamFrom = this.route.snapshot.queryParamMap.get('from')!;
    this.queryParamTo = this.route.snapshot.queryParamMap.get('to')!;

    this.tripDetailsService.getCarriages().subscribe({
      next: (data) => {
        this.allAvailableAppCarriages = data;
      },
    });

    this.tripDetailsService.getRideDetails(this.rideId).subscribe({
      next: (data) => {
        this.rideCarriagesNames = data.carriages;
        if (data.carriages.length > 0) {
          this.areCarriages.set(true);
        }
        this.rideCarriagesNames.map((element) => {
          for (let i = 0; i <= this.allAvailableAppCarriages.length - 1; i++) {
            if (this.allAvailableAppCarriages[i].code === element) {
              this.allRideCarriages.push(this.allAvailableAppCarriages[i]);
              this.allFilteredRideCarriages = this.allRideCarriages;
            }
          }
        });

        this.uniqueCarriageNames = [...new Set(this.rideCarriagesNames)];

        this.numberOfSeatsInCarriageType = [];

        this.uniqueRideCarriages = [...new Set(this.allRideCarriages)];

        this.uniqueRideCarriages.filter((carriage) => {
          this.numberOfSeatsInCarriageType.push(carriage.rows * (carriage.leftSeats + carriage.rightSeats));
        });

        this.ridePath = [];
        this.ridePath = data.path;
        this.firstStationIndex = this.ridePath.findIndex((element) => element === +this.queryParamFrom);
        this.lastStationIndex = this.ridePath.findIndex((element) => element === +this.queryParamTo);

        this.rideSegments = data.schedule.segments;
        this.rideAllSegmentsPrices = [];
        this.rideSegments.map((item) => this.rideAllSegmentsPrices.push(item.price));
        this.rideAllSegmentsPricesNumbers = [];
        this.uniqueCarriageNames.forEach((name) => {
          this.rideAllSegmentsPrices.slice(this.firstStationIndex, this.lastStationIndex).map((price) => {
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

        this.occupiedSeats = [];
        this.rideSegments.map((item) => this.occupiedSeats.push(item.occupiedSeats));
        //this.freeSeats = amountOfSeatsInCarriage - this.occupiedSeats.length;

        this.departureTime = this.rideSegments[this.firstStationIndex].time[0];
        this.arrivalTime = this.rideSegments[this.lastStationIndex].time[1];
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

    if (
      localStorage.getItem('seatNumber') &&
      localStorage.getItem('carriageName') &&
      localStorage.getItem('carriageNumber')
    ) {
      this.selectedSeat = JSON.parse(localStorage.getItem('seatNumber') ?? '');
      this.selectedCarriageName = JSON.parse(localStorage.getItem('carriageName') ?? '');
      this.selectedCarriageNumber = JSON.parse(localStorage.getItem('carriageNumber') ?? '');

      if (this.selectedCarriageName && this.uniqueCarriageNames) {
        const carriageIndex = this.uniqueCarriageNames.indexOf(this.selectedCarriageName);
        this.totalSelectedRidePrice = this.totalRidePrices[carriageIndex];
      }
    } else {
      this.selectedSeat = '';
      this.selectedCarriageName = '';
      this.selectedCarriageNumber = '';
      this.totalSelectedRidePrice = 0;
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

  moveLeft() {
    this.content.scrollBy(-(this.width + 10), 0);
  }

  moveRight() {
    this.content.scrollBy(this.width + 10, 0);
  }

  getCarriageName(item: string) {
    this.filterSliderCarriageName = item;
  }

  public openTripRouteModal() {
    const dialogRef = this.dialog.open(TripRouteModalComponent, {
      data: {
        rideId: this.rideId,
        routes: [
          { time: this.departureTime, station: this.queryParamFrom, stop: 'First Station' },
          { time: this.arrivalTime, station: this.queryParamTo, stop: 'Last Station' },
        ],
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      return;
    });
  }

  public buyTicket() {
    this.tripDetailsService
      .buyTicket(this.rideId, this.selectedSeat, this.queryParamFrom, this.queryParamTo)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.snackBar.open(
            `You successfully bought the ticket with the seat number ${this.selectedSeat}, in the carriage of type ${this.selectedCarriageName}
            and number ${this.selectedCarriageNumber} for ${this.totalSelectedRidePrice}$`,
            'close',
            {
              duration: 4000,
            },
          );
          localStorage.removeItem('seatNumber');
          localStorage.removeItem('carriageName');
          localStorage.removeItem('carriageNumber');
        },
        error: () => {
          this.snackBar.open(
            `You already have a ticket for this ride, please cancel active one and try again`,
            'close',
            {
              duration: 4000,
            },
          );
          localStorage.removeItem('seatNumber');
          localStorage.removeItem('carriageName');
          localStorage.removeItem('carriageNumber');
        },
      });
  }
}
