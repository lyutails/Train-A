import { Component } from '@angular/core';
import { OrdersService } from '../../../services/orders.service';
import { UsersOrders } from '../../../models/users-orders.model';

@Component({
  selector: 'TTP-user-orders',
  standalone: true,
  imports: [],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.scss',
})
export class UserOrdersComponent {
  public usersOrders!: UsersOrders[];

  constructor(private ordersService: OrdersService) {
    this.ordersService.getUsersOrders().subscribe({
      next: (data) => {
        this.usersOrders = [];
        this.usersOrders = data;
      },
    });
  }
}
