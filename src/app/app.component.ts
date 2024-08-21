import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileService } from './repositories/profile/services/profile.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'TTP-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  test = 'test';

  constructor(private profile: ProfileService) {
    this.checkName();
  }

  public checkName() {
    this.profile.getUserProfile().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: ({ error }: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
}
