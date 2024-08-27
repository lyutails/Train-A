import { Injectable } from '@angular/core';
import { AuthorizationService } from '../../../repositories/authorization/services/authorization.service';
import { LocalStorageService } from '../../storage/services/local-storage.service';
import { RoleService } from '../../roles/role.service';
import { UserInfo } from '../../../features/authorization/models/user-info.model';
import { TokenModel } from '../../../repositories/authorization/models/token.model';
import { map, Observable, tap } from 'rxjs';
import { ProfileFacade } from '../../../features/profile/services/profile.facade';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  private storageKey = 'authToken';

  constructor(
    private authrozationService: AuthorizationService,
    private localStorageService: LocalStorageService,
    private roleService: RoleService,
    private profileService: ProfileFacade,
  ) {}

  private saveTokenToLocalStorage(token: string): void {
    this.localStorageService.setItem(this.storageKey, token);
  }

  public getTokenFromLocalStorage(): string | null {
    return this.localStorageService.getItem<string>(this.storageKey);
  }

  public deleteTokenFromLocalStorage(): void {
    this.localStorageService.removeItem(this.storageKey);
  }

  public get isAuthenticated(): boolean {
    return !!this.localStorageService.getItem<string>(this.storageKey);
  }

  public signUp(userInfo: UserInfo): Observable<void> {
    return this.authrozationService.signUp(userInfo);
  }

  public signIn(userInfo: UserInfo): Observable<TokenModel> {
    return this.authrozationService.signIn(userInfo);
  }

  public saveUserInfo(token: string) {
    this.saveTokenToLocalStorage(token);
    this.getUserRole();
  }

  public getUserRole(): void {
    this.profileService
      .getUserProfile()
      .pipe(
        map((user) => user.role),
        tap((role) => {
          this.roleService.changeUserRole(role);
        }),
      )
      .subscribe({
        error: (error) => {
          console.error('Error fetching user profile:', error);
        },
      });
  }
  public logout(): Observable<void> {
    return this.authrozationService.logout().pipe(
      tap(() => {
        this.deleteTokenFromLocalStorage();
        this.roleService.changeUserRole('anonymous');
      }),
    );
  }
}
