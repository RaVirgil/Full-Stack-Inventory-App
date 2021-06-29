import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class EmailService {
  constructor(private readonly http: HttpClient) {}

  public sendMessage(object: any): void {
    const headers = this.getHeaders();
    this.http.post('api/inventory/mail', object, { headers: headers }).subscribe();
  }

  getHeaders(): any {
    const token = this.getToken();
    const headers = { Authorization: 'Bearer ' + token };
    return headers;
  }

  private getToken(): string {
    const token = localStorage.getItem('token');
    if (token === null) return 'null';
    return token;
  }
}
