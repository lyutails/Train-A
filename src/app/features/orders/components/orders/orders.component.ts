import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'TTP-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {}
