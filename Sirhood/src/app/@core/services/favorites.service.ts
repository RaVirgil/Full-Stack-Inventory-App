import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpService } from '../api/http.service';
import { Product } from '../entities/product.entity';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favorites: Product[] = [];

  constructor(
    private readonly httpService: HttpService,
    private readonly authenticationService: AuthenticationService
  ) {}

  public add(product: Product) {
    const userId = this.authenticationService.getUserId();

    switch (userId) {
      case 'notAuthenticated': {
        this.favorites.push(product);
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
      `favorites/${this.authenticationService.getUserId()}`,
      product
    ).subscribe();
  }

  public get(): Observable<Product[]> {
    const userId = this.authenticationService.getUserId();

    switch (userId) {
      case 'notAuthenticated': {
        return of(this.favorites);
      }
      default: {
        return this.getFromDb();
      }
    }
  }

  private getFromDb(): Observable<Product[]> {
    return this.httpService.get(
      `favorites/${this.authenticationService.getUserId()}`
    );
  }

  public removeAll(): void {
    const userId = this.authenticationService.getUserId();

    switch (userId) {
      case 'notAuthenticated': {
        this.favorites = [];
        break;
      }
      default: {
        this.removeAllFromDb();
        break;
      }
    }
  }

  private removeAllFromDb(): void {
    this.httpService.delete(
      `favorites/${this.authenticationService.getUserId()}`
    ).subscribe();
  }

  public remove(product: Product): void {
    const userId = this.authenticationService.getUserId();

    switch (userId) {
      case 'notAuthenticated': {
        const index = this.favorites.findIndex(
          (favoriteProduct) => favoriteProduct.id === product.id,
          0
        );
        this.favorites.splice(index, 1);
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
      `favorites/${this.authenticationService.getUserId()}/:${product.id}`
    ).subscribe();
  }
}
