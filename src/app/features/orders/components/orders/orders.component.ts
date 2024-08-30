import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthFacade } from '../../../../core/authorization/services/auth.facade';
import { RoleService } from '../../../../core/roles/role.service';
import { ButtonComponent } from '../../../../common/button/button.component';
import { TicketComponent } from '../ticket/ticket.component';
import { OrderParameters } from '../../models/orders.model';
import { TicketParameters } from '../../models/ticket.model';

@Component({
  selector: 'TTP-orders',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TicketComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  public userRole = '';
  public orders!: OrderParameters[];
  public tickets!: TicketParameters[];

  constructor(
    private authFacade: AuthFacade,
    private roleService: RoleService,
  ) {
    this.initializeUserRole();
    this.orders = [
      {
        id: 88,
        rideId: 25,
        routeId: 68,
        seatId: 54,
        userId: 16,
        status: 'active',
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
      },
    ];

    this.tickets = [
      {
        id: 58,
        stationStart: 'London',
        stationEnd: 'Paris',
        routeId: 3,
        seatId: 33,
        userId: 3552,
      },
    ];
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

  public get isAdminRole(): boolean {
    return this.roleService.isAdminRole;
  }
}
