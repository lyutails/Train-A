import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthFacade } from '../../../../core/authorization/services/auth.facade';
import { RoleService } from '../../../../core/roles/role.service';
import { ButtonComponent } from '../../../../common/button/button.component';
// import { OrderParameters } from '../../models/orders.model';

@Component({
  selector: 'TTP-orders',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  public userRole = '';
  public isSmallScreen: boolean = window.innerWidth < 640;
  // public orderParams!: OrderParameters = ;

  constructor(
    private authFacade: AuthFacade,
    private roleService: RoleService,
  ) {
    this.initializeUserRole();
  }

  private initializeUserRole(): void {
    this.roleService.userRole$.subscribe((role) => {
      this.userRole = role;
    });

    if (this.authFacade.isAuthenticated) {
      this.authFacade.getUserRole();
    }
  }

  public get isAuthenticated(): boolean {
    return this.authFacade.isAuthenticated;
  }

  public get isAdminRole(): boolean {
    return this.roleService.isAdminRole;
  }
}
