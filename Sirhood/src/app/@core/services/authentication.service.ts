import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpService } from '../api/http.service';
import { User } from '../entities/user.entity';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userId: string = "notAuthenticated";

  constructor(
    private readonly httpService: HttpService,
    private readonly jwtHelper: JwtHelperService
  ) {}

  public login(username: string, password: string) {
    this.httpService
      .post('users/login', {
        username: username,
        password: password,
      })
      .subscribe((data) => {
        if (data == 'error') {
          alert(data);
          return;
        }
        localStorage.setItem('token', data.accessToken);        
        this.userId = data.userId;       
      });
  }

  public register(user: User) {
    this.httpService.post('users/register', user).subscribe((data) => {
      if (data == 'incorrect credentials') {
        alert(data);
        return;
      }      
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

  public getUserId(): string{   
    return this.userId;
  }
}
