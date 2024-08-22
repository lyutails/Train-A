import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileInformation } from './models/profile-information.model';
import { Observable } from 'rxjs/internal/Observable';
import { UserProfileApi } from './models/user-profile-api';

@Injectable({
  providedIn: 'root',
})
export class ProfileHttpService {
  constructor(private readonly httpClient: HttpClient) {}

  public getUserProfile(): Observable<ProfileInformation> {
    return this.httpClient.get<ProfileInformation>('profile');
  }

  public updateUserProfile(userProfile: UserProfileApi): Observable<ProfileInformation> {
    return this.httpClient.put<ProfileInformation>('profile', userProfile);
  }

  public updatePassword(newPassword: string): Observable<void> {
    return this.httpClient.put<void>('profile/password', { password: newPassword });
  }

  public logout(): Observable<void> {
    return this.httpClient.delete<void>('logout');
  }
}
