import { Injectable } from '@angular/core';
import { AuthorizationHttpService } from './authorization-http.service';
import { UserInfo } from '../../../features/authorization/models/user-info.model';
import { Observable } from 'rxjs/internal/Observable';
import { TokenModel } from '../models/token.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private readonly authorizationHttpService: AuthorizationHttpService) {}

  public signUp(userInfo: UserInfo): Observable<void> {
    return this.authorizationHttpService.signUp(userInfo);
  }

  public signIn(userInfo: UserInfo): Observable<TokenModel> {
    return this.authorizationHttpService.signIn(userInfo);
  }

  public logout(): Observable<void> {
    return this.authorizationHttpService.logout();
  }
}
