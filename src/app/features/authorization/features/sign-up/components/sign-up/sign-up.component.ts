import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'TTP-sign-up',
  standalone: true,
  imports: [CommonModule, MatButton, MatInput, MatIcon, MatLabel, MatFormField],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  signUpButtonName = 'Register';
  signInButtonName = 'Sign In';

  constructor(private router: Router) {}

  navigateSignIn() {
    this.router.navigate(['/signin']);
  }
}
