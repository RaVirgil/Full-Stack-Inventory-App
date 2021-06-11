import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/@core/entities/product.entity';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() product: Product;
  constructor() { }

  ngOnInit(): void {
  }

}
 