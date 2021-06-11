import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/@core/entities/product.entity';

@Component({
  selector: 'app-product-item-card',
  templateUrl: './product-item-card.component.html',
  styleUrls: ['./product-item-card.component.css'],
})
export class ProductItemCardComponent {
 
  @Input() product: Product;
  @Output() addToCart: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() addToFavorites: EventEmitter<Product>  = new EventEmitter<Product>();    

  public addToCartButton(): void {
    this.addToCart.emit(this.product);
  }

  public addToFavoritesButton(): void {
    this.addToFavorites.emit(this.product);
  } 
}
