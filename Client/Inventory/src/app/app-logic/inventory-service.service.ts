import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { InventoryItem } from './inventory-item';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private http: HttpClient) {}  

  getAllData() {
    const headers = { 'Authorization': 'Bearer '+document.cookie};
    return this.http.get<InventoryItem[]>('/api/inventory-items',{headers}).pipe();
  }

  getData(
    pageNumber = 1,
    pageSize = 5,
    activeOnly = false,
    sorting = ''
  ): Observable<[InventoryItem[], number]> {
    let params = new HttpParams()
      .set('activeOnly', activeOnly ? 'true' : 'false')
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    if (sorting) params = params.set('sort', sorting);
    const headers = { 'Authorization': 'Bearer '+document.cookie};
    return this.http
      .get<InventoryItem[]>('/api/inventory-items', {
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
    return this.http.get<InventoryItem>('/api/inventory-items/' + itemId, {headers});
  }

  updateItem(item: InventoryItem) {
    const headers = { 'Authorization': 'Bearer '+document.cookie};
    return this.http.put<InventoryItem>('/api/inventory-items', item, {headers});
  }

  deleteItem(id: String) {
    const headers = { 'Authorization': 'Bearer '+document.cookie};
    return this.http.delete<InventoryItem>('/api/inventory-items/' + id, {headers});
  }

  addItem(item: InventoryItem) {
    const headers = { 'Authorization': 'Bearer '+document.cookie};
    return this.http.post<InventoryItem>('/api/inventory-items', item, {headers});
  }
}
