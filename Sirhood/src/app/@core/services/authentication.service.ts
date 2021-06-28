import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie';
import { HttpService } from '../api/http.service';
import { User } from '../entities/user.entity';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private readonly httpService: HttpService,
    private readonly jwtHelper: JwtHelperService,
    private readonly cookieService: CookieService,
    private readonly localStorageService: LocalStorageService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {}

  public login(username: string, password: string) {
    this.httpService
      .post('users/login', {
        username: username,
        password: password,
      })
      .subscribe((data) => {
        if (data == 'error') {
          this.openSnackbar();
          return;
        }

        this.localStorageService.put('token', data.accessToken);
        this.cookieService.put('userId', data.userId);
        this.router.navigate(['']);
      });
  }

  public register(user: User) {
    this.httpService.post('users/register', user).subscribe((data) => {
      if (data == 'incorrect credentials') {
        return;
      }
    });
  }

  public isAuthenticated(): boolean {
    const token = this.localStorageService.get('token');

    if (token === null || token === '') {
      this.cookieService.remove('userId');
      return false;
    }

    return !this.jwtHelper.isTokenExpired(token);
  }

  public logout(): void {
    const token = this.localStorageService.get('token');
    if (token === null) return;
    this.cookieService.remove('userId');
    this.localStorageService.put('token', '');
  }

  public getUserId(): string {
    const userId = this.cookieService.get('userId');
    if (userId) return userId;
    return 'notAuthenticated';
  }

  private openSnackbar(): void {
    this.snackBar.open(`Incorrect credentials`, 'Ok', { duration: 5000, horizontalPosition: 'center',
      verticalPosition: 'top', });
  }
}
