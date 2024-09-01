import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../common/button/button.component';

@Component({
  selector: 'TTP-trip-details',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './trip-details.component.html',
  styleUrl: './trip-details.component.scss',
})
export class TripDetailsComponent {
  constructor(private readonly router: Router) {}

  redirectToHomePage() {
    this.router.navigate(['/']);
  }
}
