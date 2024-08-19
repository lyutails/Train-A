import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'TTP-sign-up',
  standalone: true,
  imports: [CommonModule, MatButton],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  signUpButtonName = 'Sign Up';

  constructor(private router: Router) {}

  navigateSignIn() {
    this.router.navigate(['/signin']);
  }
}
