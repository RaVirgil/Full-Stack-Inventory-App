import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/@core/services/cart.service';
import { Product } from '../../@core/entities/product.entity';
import { FavoritesService } from '../../@core/services/favorites.service';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  public products: Product[] = [];

  constructor(private readonly favoritesService: FavoritesService, private readonly cartService: CartService) {}

  ngOnInit(): void {
    this.favoritesService
      .favorites$
      .subscribe((products: Product[]) => (this.products = products));
  }

  public addToCart(product: Product): void{
    this.cartService.add(product);
  }

  public delete(product: Product): void{
    this.favoritesService.remove(product);
  }

  public removeAll(): void{
    this.favoritesService.removeAll();
  }
}
