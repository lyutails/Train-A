import { Injectable } from '@angular/core';
import { ProfileService } from '../../../repositories/profile/services/profile.service';
import { ProfileInformation } from '../../../repositories/profile/models/profile-information.model';
import { Observable } from 'rxjs';
import { UserProfileApi } from '../../../repositories/profile/models/user-profile-api';

@Injectable({
  providedIn: 'root',
})
export class ProfileFacade {
  constructor(private readonly profileService: ProfileService) {}

  public getUserProfile(): Observable<ProfileInformation> {
    return this.profileService.getUserProfile();
  }

  public updateUserProfile(userProfile: UserProfileApi): Observable<ProfileInformation> {
    return this.profileService.updateUserProfile(userProfile);
  }

  public updatePassword(newPassword: string): Observable<void> {
    return this.profileService.updatePassword(newPassword);
  }
}
