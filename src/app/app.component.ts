import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileFacade } from './features/profile/services/profile.facade';

@Component({
  selector: 'TTP-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  test = 'test';

  constructor(private profile: ProfileFacade) {
    this.logout();
  }

  public logout() {
    this.profile.logout().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: ({ error }: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
}
