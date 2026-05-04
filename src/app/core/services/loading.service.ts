import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  readonly loading$ = this.loadingSubject.asObservable();

  private activeRequests = 0;

  show(): void {
    this.activeRequests++;
    this.loadingSubject.next(true);
  }

  hide(): void {
    if (this.activeRequests > 0) {
      this.activeRequests--;
    }

    if (this.activeRequests === 0) {
      this.loadingSubject.next(false);
    }
  }

  reset(): void {
    this.activeRequests = 0;
    this.loadingSubject.next(false);
  }
}