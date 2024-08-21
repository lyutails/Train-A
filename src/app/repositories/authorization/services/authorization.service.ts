import { Injectable } from '@angular/core';
import { AuthorizationHttpService } from './authorization-http.service';
import { UserInfo } from '../../../features/authorization/models/user-info.model';
import { Observable } from 'rxjs/internal/Observable';
import { LocalStorageService } from '../../../core/storage/services/local-storage.service';
import { TokenModel } from '../models/token.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private storageKey = 'authToken';
  constructor(
    private readonly authorizationHttpService: AuthorizationHttpService,
    private readonly localStorageService: LocalStorageService,
  ) {}

  public signUp(userInfo: UserInfo): Observable<void> {
    return this.authorizationHttpService.signUp(userInfo);
  }

  public signIn(userInfo: UserInfo): Observable<TokenModel> {
    return this.authorizationHttpService.signIn(userInfo);
  }

  public saveTokenToLocalStorage(token: string): void {
    this.localStorageService.setItem(this.storageKey, token);
  }

  public getTokenFromLocalStorage(): string | null {
    return this.localStorageService.getItem<string>(this.storageKey);
  }
}
