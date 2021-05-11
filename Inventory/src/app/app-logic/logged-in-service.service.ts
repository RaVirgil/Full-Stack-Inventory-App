import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoggedInService {
  private loggedIn = new BehaviorSubject(false);
  sharedLoggedIn= this.loggedIn.asObservable();
  
  changeLoggedIn(state: boolean) {
    this.loggedIn.next(state)    
  }
  constructor() { }
}
