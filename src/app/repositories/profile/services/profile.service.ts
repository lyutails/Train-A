import { Injectable } from '@angular/core';
import { ProfileHttpService } from './profile-http.service';
import { Observable } from 'rxjs';
import { ProfileInformation } from './models/profile-information.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private profileHttpService: ProfileHttpService) {}

  public getUserProfile(): Observable<ProfileInformation> {
    return this.profileHttpService.getUserProfile();
  }
}
