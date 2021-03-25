import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  private redirectSource = new BehaviorSubject<string>('');
  whichRedirect = this.redirectSource.asObservable();

  constructor() { }

  public setRedirectSource(redirect: string) {
    this.redirectSource.next(redirect);
  }
}
