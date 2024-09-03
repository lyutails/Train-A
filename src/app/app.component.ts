import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/features/components/header/header.component';
import { UserProfileComponent } from './features/profile/features/components/user-profile/user-profile.component';
import { FooterComponent } from './core/features/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { LoadingService } from './common/services/loading/loading.service';

@Component({
  selector: 'TTP-root',
  standalone: true,
  imports: [
    RouterOutlet,
    UserProfileComponent,
    HeaderComponent,
    FooterComponent,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  loadingService = inject(LoadingService);
}
