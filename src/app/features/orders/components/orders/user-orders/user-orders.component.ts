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
  public usersData!: UsersOrders[];

  constructor(private ordersService: OrdersService) {
    this.ordersService.getUsersInfo().subscribe({
      next: (data) => {
        this.usersData = [];
        this.usersData = data;
      },
    });
  }
}
