import { Component, OnInit } from '@angular/core';
import { RouteAPI } from './routes.model';
import { RoutesHttpService } from '../../../../../../../repositories/routes/services/routes-http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../../../../common/button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'TTP-routes',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.scss',
})
export class RoutesComponent implements OnInit {
  routes: RouteAPI[] = [];

  constructor(private readonly routesHttpService: RoutesHttpService) {}

  ngOnInit(): void {
    this.routesHttpService.getRoutes().subscribe({
      next: (data) => {
        console.log('Routes received:', data);
        this.routes = data;
      },
      error: (error) => console.error('There was an error!', error),
    });
  }
}
