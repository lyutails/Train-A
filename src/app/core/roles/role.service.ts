import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '../storage/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  public userRole$: Observable<string> = new BehaviorSubject<string>('');
  private readonly userRole$$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private localStorageService: LocalStorageService) {}

  public changeUserRole(role: string): void {
    this.userRole$$.next(role);
    this.saveUserRole(role);
  }

  private saveUserRole(role: string) {
    this.localStorageService.setItem('role', role);
  }

  public get isAdminRole(): boolean {
    const role = this.localStorageService.getItem('role');
    return role === 'manager';
  }
}
