import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileInformation } from './models/profile-information.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ProfileHttpService {
  constructor(private readonly httpClient: HttpClient) {}

  public getUserProfile(): Observable<ProfileInformation> {
    return this.httpClient.get<ProfileInformation>('profile');
  }
}
