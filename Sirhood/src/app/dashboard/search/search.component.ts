import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/@core/entities/product.entity';
import { AuthenticationService } from 'src/app/@core/services/authentication.service';
import { CartService } from 'src/app/@core/services/cart.service';
import { FavoritesService } from 'src/app/@core/services/favorites.service';
import { SearchedService } from 'src/app/@core/services/searched.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  public searchedProducts: Product[] = [];
  constructor(
    private readonly route: ActivatedRoute,
    private readonly searchService: SearchedService,
    private readonly cartService: CartService,
    private readonly favoritesService: FavoritesService,
    private readonly authenticationService: AuthenticationService,
    private readonly router:Router
  ) {}

  ngOnInit(): void {
    let input = '';
    this.route.params.subscribe((params) => {
      input = params.input;

      setTimeout(() => {
        this.searchedProducts = this.searchService.search(input);
      }, 3000);
    });
  }

  public addToCart(product: Product) {
    this.cartService.add(product);    
  }

  public addToFavorites(product: Product) {
    if (!this.authenticationService.isAuthenticated()) {
      this.router.navigate(['auth']);
      return;
    }

    this.favoritesService.add(product); 
  }
}
