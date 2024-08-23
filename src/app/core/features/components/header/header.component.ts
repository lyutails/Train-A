import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';

@Component({
  selector: 'TTP-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private router: Router) {}

  public redirectToSignIn() {
    return this.router.navigate(['/auth/signin']);
  }

  public redirectToSignUp() {
    return this.router.navigate(['/auth/signup']);
  }

  public redirectToHome() {
    return this.router.navigate(['/']);
  }
}
