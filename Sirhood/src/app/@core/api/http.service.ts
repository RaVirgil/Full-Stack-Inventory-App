import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private readonly http: HttpClient) {}

  public get(endpoint: string): Observable<any> {
    const token = this.getToken();
    console.log(token);
    const headers = { 'Authorization': 'Bearer ' + token };
    return this.http.get(`/api/${endpoint}`, { headers });
  }

  public post(endpoint: string, payload: any): Observable<any> {
    return this.http.post(`/api/${endpoint}`, payload);
  }

  private getToken(): string {
    const token = localStorage.getItem('token');
    if (token === null) return 'null';
    return token;
  }
}
