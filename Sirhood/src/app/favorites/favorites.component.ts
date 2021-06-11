import { Component, OnInit } from '@angular/core';
import { Product } from '../@core/entities/product.entity';
import { FavoritesService } from '../@core/services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  public products: Product[] = [];

  constructor(private readonly favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.products = this.favoritesService.get();
  }
}
