import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/@core/entities/product.entity';

@Component({
  selector: 'app-favorite-item',
  templateUrl: './favorite-item.component.html',
  styleUrls: ['./favorite-item.component.css'],
})
export class FavoriteItemComponent implements OnInit {
  @Input() product: Product;
  constructor() {}

  ngOnInit(): void {}
}
