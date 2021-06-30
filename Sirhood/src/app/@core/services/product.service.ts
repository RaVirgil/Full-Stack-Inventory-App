import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { HttpService } from '../api/http.service';
import { Product } from '../entities/product.entity';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public mostPopular$: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([]);

  constructor(private readonly httpService: HttpService) {
    this.getPopular();
  }

  public getAll(): Observable<Product[]> {
    return this.httpService.get('sirhood/products/all');
  }

  private getPopular() {
    interval(30000)
      .pipe(switchMap(() => this.httpService.get('sirhood/products/popular')))
      .subscribe((products) => {
        this.mostPopular$.next(products);       
      });
  }

  public getById(id: string | null): Observable<Product> {
    return this.httpService.get(`sirhood/products/${id}`);
  }

  public getForCategory(category: string): Observable<Product[]> {
    return this.httpService.get(`sirhood/products/category/${category}`);
  }

  public getForSubCategory(
    category: string,
    subCategory: string
  ): Observable<Product[]> {
    return this.httpService.get(
      `sirhood/products/category/${category}/subCategory/${subCategory}`
    );
  }
}
