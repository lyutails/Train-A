import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private spinnerCounter = new BehaviorSubject<boolean>(false);
  spinnerCounter$ = this.spinnerCounter.asObservable();

  show() {
    this.spinnerCounter.next(true);
  }

  hide() {
    this.spinnerCounter.next(false);
  }
}
