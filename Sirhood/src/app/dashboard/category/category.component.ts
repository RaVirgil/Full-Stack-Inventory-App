import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/@core/entities/product.entity';
import { CartService } from 'src/app/@core/services/cart.service';
import { FavoritesService } from 'src/app/@core/services/favorites.service';
import { ProductService } from 'src/app/@core/services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  public category: string;
  public products: Product[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productSerivce: ProductService,
    private readonly cartService: CartService,
    private readonly favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.category = params['category'];
      this.productSerivce
        .getForCategory(this.category)
        .subscribe((products) => (this.products = products));
    });
  }

  public addToCart(product: Product) {
    this.cartService.add(product);
  }

  public addToFavorites(product: Product) {
    this.favoritesService.add(product);
  }
}
