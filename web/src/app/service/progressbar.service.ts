import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  private progressBarSubject = new BehaviorSubject<boolean>(false);
  readonly progressBar$ = this.progressBarSubject.asObservable();

  show() {
    this.progressBarSubject.next(true);
  }

  hide() {
    this.progressBarSubject.next(false);
  }

  showing() {
    return this.progressBarSubject.getValue();
  }
}