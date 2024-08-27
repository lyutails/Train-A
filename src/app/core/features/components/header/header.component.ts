import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { AuthFacade } from '../../../authorization/services/auth.facade';
import { RoleService } from '../../../roles/role.service';

@Component({
  selector: 'TTP-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDividerModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public userRole = '';
  isSmallScreen: boolean = window.innerWidth < 640;

  constructor(
    private router: Router,
    private authFacade: AuthFacade,
    private roleService: RoleService,
  ) {
    this.initializeUserRole();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  private initializeUserRole(): void {
    this.roleService.userRole$.subscribe((role) => {
      this.userRole = role;
    });

    if (this.authFacade.isAuthenticated) {
      this.authFacade.getUserRole();
    }
  }

  public redirectToSignIn() {
    this.router.navigate(['/auth/signin']);
  }

  public redirectToSignUp() {
    this.router.navigate(['/auth/signup']);
  }

  public redirectToHome() {
    this.router.navigate(['/']);
  }

  public redirectToProfile() {
    this.router.navigate(['/profile']);
  }

  public redirectToOrders() {
    this.router.navigate(['/orders']);
  }

  public redirectToAdmin() {
    this.router.navigate(['/admin/stations']);
  }

  public get isAuthenticated(): boolean {
    return this.authFacade.isAuthenticated;
  }

  public get isAdminRole(): boolean {
    return this.roleService.isAdminRole;
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 640;
  }
}
