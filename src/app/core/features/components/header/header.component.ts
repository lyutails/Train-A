import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { AuthFacade } from '../../../authorization/services/auth.facade';

@Component({
  selector: 'TTP-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private authFacade: AuthFacade,
  ) {}

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

  public get isAuthenticated(): boolean {
    return this.authFacade.isAuthenticated;
  }
}
