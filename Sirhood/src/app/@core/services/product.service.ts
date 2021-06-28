import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../api/http.service';
import { Product } from '../entities/product.entity';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly httpService: HttpService) {}

  public getAll(): Observable<Product[]> {
    return this.httpService.get('sirhood/products');
  }
  
  public getById(id: string | null): Observable<Product>{    
    return this.httpService.get(`sirhood/products/${id}`);
  }

  public getForCategory(category: string): Observable<Product[]> {
    return this.httpService.get(`sirhood/products/category/${category}`);
  }

  public getForSubCategory(
    category: string,
    subCategory: string
  ): Observable<Product[]> {    
    return this.httpService.get(`sirhood/products/category/${category}/subCategory/${subCategory}`);
  }
}
