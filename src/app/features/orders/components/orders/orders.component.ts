import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../../core/roles/role.service';
import { ButtonComponent } from '../../../../common/button/button.component';
import { TicketComponent } from '../ticket/ticket.component';
import { OrderParameters } from '../../models/orders.model';
import { TicketParameters } from '../../models/ticket.model';
import { OrdersService } from '../../services/orders.service';
import { UserOrdersComponent } from './user-orders/user-orders.component';

@Component({
  selector: 'TTP-orders',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TicketComponent, UserOrdersComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  public orders!: OrderParameters[];
  public tickets!: TicketParameters[];

  constructor(
    public roleService: RoleService,
    private ordersService: OrdersService,
  ) {}

  ngOnInit(): void {
    this.ordersService.getOrder().subscribe({
      next: (data) => {
        this.orders = [];
        this.orders = data;
      },
    });
  }
}
