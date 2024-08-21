import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'TTP-loading-button',
  standalone: true,
  imports: [ButtonComponent, MatProgressSpinnerModule],
  templateUrl: './loading-button.component.html',
  styleUrl: './loading-button.component.scss',
})
export class LoadingButtonComponent {}
