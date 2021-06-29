import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpService } from '../api/http.service';
import { Product } from '../entities/product.entity';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  public favorites$: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([]);
  private favorites: Product[] = [];

  constructor(
    private readonly httpService: HttpService,
    private readonly authenticationService: AuthenticationService
  ) {
    this.httpService
      .get(`favorites/${this.authenticationService.getUserId()}`)
      .subscribe((products: Product[]) => {
        this.favorites = products;
        this.favorites$.next(products);
      });
  }

  public add(product: Product) {
    this.favorites.push(product);
    this.favorites$.next(this.favorites);

    this.addToDb(product);
  }

  private addToDb(product: Product): void {
    this.httpService
      .post(`favorites/${this.authenticationService.getUserId()}`, product)
      .subscribe();
  }

  public removeAll(): void {
    this.favorites = [];
    this.favorites$.next([]);

    this.removeAllFromDb();
  }

  private removeAllFromDb(): void {
    this.httpService
      .delete(`favorites/${this.authenticationService.getUserId()}`)
      .subscribe();
  }

  public remove(product: Product): void {
    const index = this.favorites.findIndex(
      (favoritesProduct) => favoritesProduct.id === product.id
    );

    this.favorites.splice(index, 1);
    this.favorites$.next(this.favorites);
    this.removeFromDb(product);
  }

  private removeFromDb(product: Product): void {
    this.httpService
      .delete(
        `favorites/${this.authenticationService.getUserId()}/${product.id}`
      )
      .subscribe();
  }
}
