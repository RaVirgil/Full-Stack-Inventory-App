import { Component, OnInit } from '@angular/core';
import { Product } from '../@core/entities/product.entity';
import { CartService } from '../@core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public products: Product[] = [];
  constructor(private readonly cartService: CartService) {}

  ngOnInit(): void {
    this.cartService
      .get()
      .subscribe((products: Product[]) => (this.products = products));
  }
}
