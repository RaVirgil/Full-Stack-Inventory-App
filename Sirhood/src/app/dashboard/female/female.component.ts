import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/@core/entities/product.entity';
import { CartService } from 'src/app/@core/services/cart.service';
import { FavoritesService } from 'src/app/@core/services/favorites.service';
import { ProductService } from 'src/app/@core/services/product.service';

@Component({
  selector: 'app-female',
  templateUrl: './female.component.html',
  styleUrls: ['./female.component.css']
})
export class FemaleComponent implements OnInit {
  public products: Product[] = [];

  constructor(
    private readonly productSerivce: ProductService,
    private readonly cartService: CartService,
    private readonly favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.productSerivce.getAll().subscribe((result: Product[]) => {      
      result.forEach((product) => {        
        if (product.tags?.includes("female")) this.products.push(product);
      });
      console.log(result);
      console.log(this.products);
    });
  }

  public addToCart(product: Product) {
    this.cartService.add(product);
  }

  public addToFavorites(product: Product) {
    this.favoritesService.add(product);
  }

}
