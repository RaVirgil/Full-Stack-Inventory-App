import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class SessionGuard implements CanActivate {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {}
  canActivate(): boolean {
    if (!this.authenticationService.isAuthenticated()) {
      this.router.navigate(['auth/login']);
      return false;
    }

    return true;
  }
}
