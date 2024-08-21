import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../../../features/authorization/models/user-info.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationHttpService {
  constructor(private readonly httpClient: HttpClient) {}

  public signUp(userInfo: UserInfo): Observable<void> {
    return this.httpClient.post<void>('signup', userInfo);
  }

  public signIn(userInfo: UserInfo): Observable<string> {
    return this.httpClient.post<string>('signin', userInfo);
  }
}
