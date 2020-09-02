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

    getData() {
        return this.http.get<InventoryItem[]>('/api/inventory-items')
        .pipe(
            delay(1000)
        );
    }

    updateItem(item:InventoryItem){
        return this.http.put<InventoryItem[]>('/api/inventory-items',item)
    }

    deleteItem(id:String){
        return this.http.delete<InventoryItem[]>('/api/inventory-items/'+id);
    }
}