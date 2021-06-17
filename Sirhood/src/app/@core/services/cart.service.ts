import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpService } from '../api/http.service';
import { Product } from '../entities/product.entity';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Product[] = [];

  constructor(
    private readonly httpService: HttpService,
    private readonly authenticationService: AuthenticationService
  ) {}

  public add(product: Product) {
    const userId = this.authenticationService.getUserId();

    switch (userId) {
      case 'notAuthenticated': {
        this.cart.push(product);
        break;
      }
      default: {
        this.addToDb(product);
        break;
      }
    }
  }

  private addToDb(product: Product): void {
    this.httpService.post(
      `cart/${this.authenticationService.getUserId()}`,
      product
    );
  }

  public get(): Observable<Product[]> {
    const userId = this.authenticationService.getUserId();
    
    switch (userId) {
      case 'notAuthenticated': {
        return of(this.cart);
      }
      default: {
        return this.getFromDb();
      }
    }       
  }

  private getFromDb(): Observable<Product[]> {    
    return this.httpService.get(
      `cart/${this.authenticationService.getUserId()}`
    );
  }

  public removeAll(): void {
    const userId = this.authenticationService.getUserId();

    switch (userId) {
      case 'notAuthenticated': {
        this.cart = [];
        break;
      }
      default: {
        this.removeAllFromDb();
        break;
      }
    }
  }

  private removeAllFromDb(): void {
    this.httpService.delete(`cart/${this.authenticationService.getUserId()}`);
  }

  public remove(product: Product): void {
    const userId = this.authenticationService.getUserId();

    switch (userId) {
      case 'notAuthenticated': {
        const index = this.cart.findIndex(
          (cartProduct) => cartProduct.id === product.id,
          0
        );
        this.cart.splice(index, 1);
        break;
      }
      default: {
        this.removeFromDb(product);
        break;
      }
    }
  }

  private removeFromDb(product: Product): void {
    this.httpService.delete(
      `cart/${this.authenticationService.getUserId()}/:${product.id}`
    );
  }
}
