import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private readonly http: HttpClient) {}

  public get(endpoint: string): Observable<any> {
    return this.http.get(`api/${endpoint}`);
  }

  public post(endpoint: string, payload: any): Observable<any> {
    return this.http.post(`api/${endpoint}`, payload);
  }

  public delete(endpoint: string): Observable<any> {
    return this.http.delete(`api/${endpoint}`);
  }

  public put(endpoint: string, payload: any): Observable<any> {
    return this.http.post(`api/${endpoint}`, payload);
  }
}
