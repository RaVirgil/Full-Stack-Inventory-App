import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/@core/entities/product.entity';

@Component({
  selector: 'app-favorite-item',
  templateUrl: './favorite-item.component.html',
  styleUrls: ['./favorite-item.component.css'],
})
export class FavoriteItemComponent {
  @Input() product: Product;
  @Output() addToCart: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();

  public addToCartButton(): void {
    this.addToCart.emit(this.product);
  }

  public deleteButton(): void {
    this.delete.emit(this.product);
  }
}
