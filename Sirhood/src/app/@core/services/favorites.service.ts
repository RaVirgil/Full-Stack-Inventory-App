import { Injectable } from '@angular/core';
import { Product } from '../entities/product.entity';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoritesList: Product[] = [];  

  public add(product: Product) {
    this.favoritesList.push(product);
  }

  public get(): Product[] {
    return this.favoritesList;
  }

  public remove(product: Product): void {
    this.favoritesList.forEach((favoriteItem, index) => {
      if (favoriteItem.id === product.id) {
        this.favoritesList.splice(index, 1);
        return;
      }
    });
  }
}
