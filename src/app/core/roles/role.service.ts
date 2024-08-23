import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '../storage/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  public userRole$: Observable<string> = new BehaviorSubject<string>('');
  private readonly userRole$$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private lsPrefix = 'role';

  constructor(private localStorageService: LocalStorageService) {}

  public changeUserRole(role: string): void {
    this.userRole$$.next(role);
    this.saveUserRole(role);
  }

  private saveUserRole(role: string) {
    this.localStorageService.setItem(this.lsPrefix, role);
  }

  public get isAdminRole(): boolean {
    const role = this.localStorageService.getItem(this.lsPrefix);
    return role === 'manager';
  }

  public get userRole() {
    return this.localStorageService.getItem(this.lsPrefix);
  }
}
