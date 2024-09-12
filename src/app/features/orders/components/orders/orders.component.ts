import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../../core/roles/role.service';
import { ButtonComponent } from '../../../../common/button/button.component';
import { TicketComponent } from '../ticket/ticket.component';
import { OrderParameters } from '../../models/orders.model';
import { TicketParameters } from '../../models/ticket.model';
import { OrdersService } from '../../services/orders.service';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { Segments } from '../../../trip-details/models/segments.model';

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
  public usersOrders!: OrderParameters[];
  public departureTime!: string;
  public arrivalTime!: string;
  public startStationIndex!: number[];
  public endStationIndex!: number[];
  public ordersScheduleStartSegments!: Omit<Segments, 'occupiedSeats'>[][];
  public ordersStartSegments!: Omit<Segments, 'occupiedSeats'>[];
  public ordersScheduleEndSegments!: Omit<Segments, 'occupiedSeats'>[][];
  public ordersEndSegments!: Omit<Segments, 'occupiedSeats'>[];

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

    this.ordersService.getAllOrders().subscribe({
      next: (data) => {
        this.usersOrders = [];
        this.usersOrders = data;

        this.startStationIndex = [];
        this.usersOrders.map((index) =>
          this.startStationIndex.push(index.path.findIndex((i) => i === index.stationStart)),
        );
        this.ordersScheduleStartSegments = [];
        this.usersOrders.map((order) => this.ordersScheduleStartSegments.push(order.schedule.segments));
        this.ordersStartSegments = [];
        this.ordersScheduleStartSegments.filter((item, index) =>
          this.ordersStartSegments.push(item[this.startStationIndex[index]]),
        );

        this.endStationIndex = [];
        this.usersOrders.map((index) => this.endStationIndex.push(index.path.findIndex((i) => i === index.stationEnd)));
        this.ordersScheduleEndSegments = [];
        this.usersOrders.map((order) => this.ordersScheduleEndSegments.push(order.schedule.segments));
        this.ordersEndSegments = [];
        this.ordersScheduleEndSegments.filter((item, index) =>
          this.ordersEndSegments.push(item[this.endStationIndex[index]]),
        );
      },
    });
  }
}
