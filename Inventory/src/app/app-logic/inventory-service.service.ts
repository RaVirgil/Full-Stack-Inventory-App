import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product as Product } from './product';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private http: HttpClient) {}  

  getAllData() {
    const headers = { 'Authorization': 'Bearer '+document.cookie};
    return this.http.get<Product[]>('/api/products',{headers}).pipe();
  }

  getData(
    pageNumber = 1,
    pageSize = 5,
    activeOnly = false,
    sorting = ''
  ): Observable<[Product[], number]> {
    let params = new HttpParams()
      .set('activeOnly', activeOnly ? 'true' : 'false')
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    if (sorting) params = params.set('sort', sorting);
    const headers = { 'Authorization': 'Bearer '+document.cookie};
    return this.http
      .get<Product[]>('/api/products', {
        params: params,
        headers,
        observe: 'response',
      })
      .pipe(
        tap((resp) => {
          console.log('Inventory items fetched', resp.body);
        }),
        map((resp) => {
          return [resp.body, parseInt(resp.headers.get('X-Count'))];
        })
      );
  }

  getDataByID(itemId: string) {
    const headers = { 'Authorization': 'Bearer '+document.cookie};
    return this.http.get<Product>('/api/products/' + itemId, {headers});
  }

  updateItem(item: Product) {
    const headers = { 'Authorization': 'Bearer '+document.cookie};
    return this.http.put<Product>('/api/products', item, {headers});
  }

  deleteItem(id: String) {
    const headers = { 'Authorization': 'Bearer '+document.cookie};
    return this.http.delete<Product>('/api/products/' + id, {headers});
  }

  addItem(item: Product) {
    const headers = { 'Authorization': 'Bearer '+document.cookie};
    return this.http.post<Product>('/api/products', item, {headers});
  }
}
