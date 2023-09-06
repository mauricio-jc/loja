import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  // private messageSubject = new BehaviorSubject<string>('');

  loading$: Observable<boolean> = this.loadingSubject.asObservable();
  // message$: Observable<string> = this.messageSubject.asObservable();

  constructor() { }

  hide(): void {
    this.loadingSubject.next(false);
  }

  show(): void {
    this.loadingSubject.next(true);
  }

  // setMessage(message: string): void {
  //   this.messageSubject.next(message);
  // }
}
