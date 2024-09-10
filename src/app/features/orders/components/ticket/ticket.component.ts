import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../../../common/button/button.component';
import { OrdersService } from '../../services/orders.service';
import { OrderParameters } from '../../models/orders.model';

@Component({
  selector: 'TTP-ticket',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss',
})
export class TicketComponent {
  @Input() stationStart!: number;
  @Input() stationEnd!: number;
  @Input() routeId!: number;
  @Input() seatId!: number;
  @Input() userId!: number;
  @Input() departureTime!: string;
  @Input() arrivalTime!: string;
  @Input() status!: string;
  @Input() id!: number;
  public listOfOrders!: OrderParameters[];

  constructor(private ordersService: OrdersService) {}

  public cancelOrder(id: number) {
    console.log('del');
    this.ordersService.deleteOrder(id).subscribe((data) => console.log(data));
  }
}
