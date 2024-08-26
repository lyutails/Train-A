import { Component } from '@angular/core';
import { MatTabsModule, MatTabChangeEvent } from '@angular/material/tabs';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'TTP-admin-page',
  standalone: true,
  imports: [MatTabsModule, RouterModule],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent {
  constructor(private router: Router) {}

  onTabChange(event: MatTabChangeEvent) {
    const index = event.index;
    switch (index) {
      case 0:
        this.router.navigate(['/admin/stations']);
        break;
      case 1:
        this.router.navigate(['/admin/carriages']);
        break;
      case 2:
        this.router.navigate(['/admin/routes']);
        break;
      default:
        this.router.navigate(['/admin/stations']);
        break;
    }
  }
}
