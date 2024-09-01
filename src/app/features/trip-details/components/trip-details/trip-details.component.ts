import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, model, signal } from '@angular/core';
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

@Component({
  selector: 'TTP-trip-details',
  standalone: true,
  imports: [CommonModule, ButtonComponent, MatIcon, MatLabel, MatCheckbox, MatIconButton, CarriagesCarouselComponent],
  templateUrl: './trip-details.component.html',
  styleUrl: './trip-details.component.scss',
})
export class TripDetailsComponent implements AfterViewInit {
  public popupAuth = signal('');
  public authValue = model('');
  public dialog = inject(MatDialog);
  public userRole = '';
  public openBookSeatPopup = signal(false);
  public seatIsSelected = signal(true);
  public uniqueCarriageNames!: string[];
  public width!: number;
  public content!: HTMLElement;
  public rideIdResponse!: TripDetailsResponse;
  public rideCarriages!: string[];

  constructor(
    private router: Router,
    private authFacade: AuthFacade,
    private roleService: RoleService,
    private httpClient: HttpClient,
  ) {
    this.initializeUserRole();
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

  rideId = 1;

  public buyTicket() {
    console.log('call api to buy ticket');
    this.httpClient.get<TripDetailsResponse>('route').subscribe({
      next: (data) => {
        console.log(data);
        this.rideCarriages = data.carriages;
        this.uniqueCarriageNames = [...new Set(this.rideCarriages)];
        console.log(data.carriages);
      },
    });
    this.httpClient.get(`search/${this.rideId}`).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
    this.httpClient.post('order', { rideId: 34, seat: 33, stationStart: 69, stationEnd: 160 }).subscribe({
      next: (data) => {
        console.log(data);
      },
      /* error: ({ error }: HttpErrorResponse) => {
        //  this.isSubmitting = false;
        // this.clearErrorMessages();

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
}
