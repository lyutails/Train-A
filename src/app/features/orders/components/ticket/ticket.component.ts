import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
export class TicketComponent implements OnInit {
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
  public tripDuration!: number;
  public hours!: number;
  public minutes!: number;

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.tripDuration = (new Date(this.arrivalTime).getTime() - new Date(this.departureTime).getTime()) / 60000;
    this.minutes = this.tripDuration % 60;
    this.hours = (this.tripDuration - this.minutes) / 60;
  }

  public cancelOrder(id: number) {
    this.ordersService.deleteOrder(id).subscribe((data) => console.log(data));
  }
}
