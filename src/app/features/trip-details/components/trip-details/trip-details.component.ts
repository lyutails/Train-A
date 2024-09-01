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

@Component({
  selector: 'TTP-trip-details',
  standalone: true,
  imports: [CommonModule, ButtonComponent, MatIcon, MatLabel, MatCheckbox],
  templateUrl: './trip-details.component.html',
  styleUrl: './trip-details.component.scss',
})
export class TripDetailsComponent {
  public popupPassword = signal('');
  public passwordValue = model('');
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
      data: { password: this.passwordValue() },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.passwordValue.set(result);
      }
    });
  }

  public buyTicket() {
    console.log('call api to buy ticket');
  }
}
