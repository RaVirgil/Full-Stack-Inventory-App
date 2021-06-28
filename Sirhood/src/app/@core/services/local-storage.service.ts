import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public get(key: string): string | null{
    return localStorage.getItem(key);
  }

  public put(key: string, value: string): void{
    localStorage.setItem(key, value);
  }

  public delete(key: string): void{
    localStorage.removeItem(key);    
  }
}
