import { Injectable } from '@angular/core';
import { Product } from '../entities/product.entity';

@Injectable({
  providedIn: 'root',
})
export class CartService  {
  private cartList: Product[] = [];

  public add(product: Product) {
    this.cartList.push(product);
  }

  public get(): Product[] {
    return this.cartList;
  }

  public remove(product: Product): void {
    this.cartList.forEach((cartItem, index) => {
      if (cartItem.id === product.id) {
        this.cartList.splice(index, 1);
        return;
      }
    });
  }
}
