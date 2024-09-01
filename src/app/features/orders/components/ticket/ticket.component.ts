import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../../../common/button/button.component';

@Component({
  selector: 'TTP-ticket',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss',
})
export class TicketComponent {
  @Input() stationStart!: string;
  @Input() stationEnd!: string;
  @Input() routeId!: number;
  @Input() seatId!: number;
  @Input() userId!: number;

  public cancel() {
    // cancel order
  }
}
