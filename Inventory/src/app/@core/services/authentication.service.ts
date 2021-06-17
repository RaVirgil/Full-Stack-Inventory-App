import { Injectable } from '@angular/core';
import { HttpService } from '../api/http.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private username: string = '';

  constructor(
    private readonly router: Router,
    private readonly httpService: HttpService,
    private readonly jwtHelper: JwtHelperService
  ) {}

  public login(username: string, password: string) {
    this.username = username;
   
    this.httpService
      .post('users/login', {
        username: username,
        password: password,
      })
      .subscribe((data) => {
        if (data.userRole == 'admin') {
          localStorage.setItem('token', data.accessToken);
          this.router.navigate(['/menu']);          
          return;
        }
        alert('Name or password are incorrect, please try again');
      });     
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token === null || token === '') return false;
    return !this.jwtHelper.isTokenExpired(token);
  }

  public logout(): void {
    const token = localStorage.getItem('token');
    if (token === null) return;
    localStorage.setItem('token', '');
  }

  public getUserName(): string {   
    console.log(this.username);    
    return this.username;
  }
}
