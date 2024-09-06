import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '../../../../core/authorization/services/auth.facade';
import { RoleService } from '../../../../core/roles/role.service';
import { ButtonComponent } from '../../../../common/button/button.component';
import { TicketComponent } from '../ticket/ticket.component';
import { OrderParameters } from '../../models/orders.model';
import { TicketParameters } from '../../models/ticket.model';
import { OrdersService } from '../../services/orders.service';
import { UsersOrders } from '../../models/users-orders.model';

@Component({
  selector: 'TTP-orders',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TicketComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  public userRole = '';
  public orders!: OrderParameters[];
  public tickets!: TicketParameters[];
  public usersOrders!: UsersOrders[];

  constructor(
    private authFacade: AuthFacade,
    private roleService: RoleService,
    private ordersService: OrdersService,
  ) {}

  ngOnInit(): void {
    this.ordersService.getUsersOrders().subscribe({
      next: (data) => {
        this.usersOrders = [];
        this.usersOrders = data;
      },
    });
    this.ordersService.getOrder().subscribe({
      next: (data) => {
        this.orders = [];
        console.log(data);
        this.orders = data;
      },
    });
  }

  public get isAuthenticated(): boolean {
    return this.authFacade.isAuthenticated;
  }

  public get isAdminRole(): boolean {
    return this.roleService.isAdminRole;
  }
}
