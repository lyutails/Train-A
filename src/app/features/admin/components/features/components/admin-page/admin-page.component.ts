import { Component, OnInit } from '@angular/core';
import { MatTabsModule, MatTabChangeEvent } from '@angular/material/tabs';
import { RouterModule, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { filter } from 'rxjs';

@Component({
  selector: 'TTP-admin-page',
  standalone: true,
  imports: [MatTabsModule, RouterModule, MatIcon],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent implements OnInit {
  selectedIndex = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.updateSelectedIndex();
    });

    this.updateSelectedIndex();
  }

  onTabChange(event: MatTabChangeEvent) {
    const index = event.index;
    let path: string;
    switch (index) {
      case 0:
        path = '/admin/stations';
        break;
      case 1:
        path = '/admin/carriages';
        break;
      case 2:
        path = '/admin/routes';
        break;
      default:
        path = '/admin/stations';
        break;
    }
    this.router.navigate([path]);
  }

  private updateSelectedIndex() {
    const url = this.router.url;

    if (url.includes('/admin/stations')) {
      this.selectedIndex = 0;
    } else if (url.includes('/admin/carriages')) {
      this.selectedIndex = 1;
    } else if (url.includes('/admin/routes')) {
      this.selectedIndex = 2;
    } else {
      this.selectedIndex = 0;
    }
  }
}
