import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'TTP-sign-up',
  standalone: true,
  imports: [CommonModule, MatButton],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  signUpButtonName = 'Sign Up';
}
