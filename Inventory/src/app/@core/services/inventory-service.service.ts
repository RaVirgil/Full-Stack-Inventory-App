import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../entities/product';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private http: HttpClient) {}

  getAllData() {
    const headers = this.getHeaders();

    return this.http
      .get<Product[]>('api/inventory/products/', { headers })
      .pipe();
  }

  getData(
    pageNumber = 1,
    pageSize = 5,
    activeOnly = false,
    sorting = ''
  ): Observable<[Product[] | null, number]> {
    let params = new HttpParams()
      .set('activeOnly', activeOnly ? 'true' : 'false')
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    if (sorting) params = params.set('sort', sorting);

    const headers = this.getHeaders();

    return this.http
      .get<Product[]>('api/inventory/products', {
        params: params,
        headers,
        observe: 'response',
      })
      .pipe(        
        map((resp) => {
          return [resp.body, Number(resp.headers.get('X-Count'))];
        })
      );
  }

  getDataByID(itemId: string) {
    const headers = this.getHeaders();

    return this.http.get<Product>('api/inventory/products/' + itemId, {
      headers,
    });
  }

  updateItem(item: Product) {
    const headers = this.getHeaders();
    return this.http.put<Product>('api/inventory/products/', item, { headers });
  }

  deleteItem(id: String) {
    const headers = this.getHeaders();
    return this.http.delete<Product>('api/inventory/products/' + id, {
      headers,
    });
  }

  addItem(item: Product) {
    const headers = this.getHeaders();  
    return this.http.post<Product>('api/inventory/products/', item, {
      headers,
    });
  }

  private getToken(): string {
    const token = localStorage.getItem('token');
    if (token === null) return 'null';
    return token;
  }

  getHeaders(): any {
    const token = this.getToken();    
    const headers = { Authorization: 'Bearer ' + token };
    return headers;
  }
}
