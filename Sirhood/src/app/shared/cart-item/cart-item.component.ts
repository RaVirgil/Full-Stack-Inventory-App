import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/@core/entities/product.entity';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent {
  @Input() product: Product;
  @Output() addToFavorites: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();

  public addToFavoritesButton(): void {
    this.addToFavorites.emit(this.product);
  }

  public deleteButton(): void {   
    this.delete.emit(this.product);
  }
}
