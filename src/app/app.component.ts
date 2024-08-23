import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/features/components/header/header.component';
import { UserProfileComponent } from './features/profile/features/components/user-profile/user-profile.component';

@Component({
  selector: 'TTP-root',
  standalone: true,
  imports: [RouterOutlet, UserProfileComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
