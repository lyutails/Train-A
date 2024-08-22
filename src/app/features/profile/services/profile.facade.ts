import { Injectable } from '@angular/core';
import { AuthorizationService } from '../../../repositories/authorization/services/authorization.service';
import { ProfileService } from '../../../repositories/profile/services/profile.service';
import { ProfileInformation } from '../../../repositories/profile/services/models/profile-information.model';
import { Observable, tap } from 'rxjs';
import { UserProfileApi } from '../../../repositories/profile/services/models/user-profile-api';

@Injectable({
  providedIn: 'root',
})
export class ProfileFacade {
  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly profileService: ProfileService,
  ) {}

  public getUserProfile(): Observable<ProfileInformation> {
    return this.profileService.getUserProfile();
  }

  public updateUserProfile(userProfile: UserProfileApi): Observable<ProfileInformation> {
    return this.profileService.updateUserProfile(userProfile);
  }

  public updatePassword(newPassword: string): Observable<void> {
    return this.profileService.updatePassword(newPassword);
  }

  public logout(): Observable<void> {
    return this.profileService.logout().pipe(
      tap(() => {
        this.authorizationService.deleteTokenFromLocalStorage();
      }),
    );
  }
}
