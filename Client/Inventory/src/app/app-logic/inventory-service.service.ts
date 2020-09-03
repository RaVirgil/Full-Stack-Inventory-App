import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { InventoryItem } from './inventory-item';
import { Observable } from 'rxjs';
import { tap, map, delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
  })
export class InventoryService {
    constructor(private http: HttpClient) {}

    getAllData() {
        return this.http.get<InventoryItem[]>('/api/inventory-items')
        .pipe(
            
        );
    }

    getData(pageNumber = 1, pageSize = 5, activeOnly = false, sorting = ''): Observable<[InventoryItem[], number]> {
        let params = new HttpParams()
          .set('activeOnly', activeOnly ? 'true' : 'false')
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString())
        if (sorting) params = params.set('sort', sorting);
    
        return this.http
          .get<InventoryItem[]>('/api/inventory-items', {
            params: params,
            observe: 'response'
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
    

    updateItem(item:InventoryItem){
        return this.http.put<InventoryItem[]>('/api/inventory-items',item)
    }

    deleteItem(id:String){
        return this.http.delete<InventoryItem[]>('/api/inventory-items/'+id);
    }

    addItem(item:InventoryItem){        
        return this.http.post<InventoryItem[]>('/api/inventory-items',item);
    }

}