import { CommonModule } from '@angular/common';
import { Component, inject, model, signal } from '@angular/core';
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

@Component({
  selector: 'TTP-trip-details',
  standalone: true,
  imports: [CommonModule, ButtonComponent, MatIcon, MatLabel, MatCheckbox],
  templateUrl: './trip-details.component.html',
  styleUrl: './trip-details.component.scss',
})
export class TripDetailsComponent {
  public popupAuth = signal('');
  public authValue = model('');
  public dialog = inject(MatDialog);
  public userRole = '';
  public openBookSeatPopup = signal(false);
  public seatIsSelected = signal(true);

  constructor(
    private router: Router,
    private authFacade: AuthFacade,
    private roleService: RoleService,
  ) {
    this.initializeUserRole();
  }

  fakeTripResponse: TripDetailsResponse = {
    rideId: 234,
    path: [23, 33, 90],
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
    schedule: {
      segments: [
        {
          time: ['2024-08-08T22:19:57.708Z', '2024-08-12T03:29:57.708Z'],
          price: [2342, 3333, 6666, 9897],
          occupiedSeats: [4, 28, 42, 61],
        },
      ],
    },
  };

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
    console.log('call api to buy ticket');
  }
}
