import { Injectable } from '@angular/core';
import { ProfileHttpService } from './profile-http.service';
import { Observable } from 'rxjs';
import { ProfileInformation } from './models/profile-information.model';
import { UserProfileApi } from './models/user-profile-api';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private profileHttpService: ProfileHttpService) {}

  public getUserProfile(): Observable<ProfileInformation> {
    return this.profileHttpService.getUserProfile();
  }

  public updateUserProfile(userProfile: UserProfileApi): Observable<ProfileInformation> {
    return this.profileHttpService.updateUserProfile(userProfile);
  }

  public updatePassword(newPassword: string): Observable<void> {
    return this.profileHttpService.updatePassword(newPassword);
  }

  public logout(): Observable<void> {
    return this.profileHttpService.logout();
  }
}
