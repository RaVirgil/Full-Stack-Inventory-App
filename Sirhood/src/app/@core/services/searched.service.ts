import { Injectable } from '@angular/core';
import { Product } from '../entities/product.entity';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class SearchedService {
  private products: Product[] = [];
  constructor(private readonly productService: ProductService) {
    this.productService.getAll().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  public search(input: string): Product[] {
    const result: Product[] = [];

    this.products?.forEach((product) => {
      if (
        product.brand.toLowerCase().includes(input) ||
        product.category.toLowerCase().includes(input) ||
        product.subCategory.toLowerCase().includes(input) || 
        product.name.toLowerCase().includes(input) ||
        product.description.toLowerCase().includes(input) ||
        product.tags.findIndex(tag => tag === input) > -1
      )
        result.push(product);
    });

    return result;
  }
}
