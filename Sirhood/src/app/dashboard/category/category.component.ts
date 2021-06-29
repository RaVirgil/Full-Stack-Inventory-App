import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/@core/entities/product.entity';
import { AuthenticationService } from 'src/app/@core/services/authentication.service';
import { CartService } from 'src/app/@core/services/cart.service';
import { FavoritesService } from 'src/app/@core/services/favorites.service';
import { ProductService } from 'src/app/@core/services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  public category: string;
  public products: Product[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productSerivce: ProductService,
    private readonly cartService: CartService,
    private readonly favoritesService: FavoritesService,
    private readonly snackBar: MatSnackBar,
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
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
    this.openSnackbar(product, 'cart');
  }

  public addToFavorites(product: Product) {
    if(!this.authenticationService.isAuthenticated()){
      this.router.navigate(["auth"]);
      return;
    }
    
    this.favoritesService.add(product);
    this.openSnackbar(product, 'favorites');
  }

  private openSnackbar(product: Product, collection: string): void {
    const ref = this.snackBar.open(
      `${product.name} has been added to ${collection}`,
      'Undo',
      { duration: 2000 }
    );

   this.subscriptions.push( ref.onAction().subscribe(() => {
    switch (collection) {
      case 'cart': {
        this.cartService.remove(product);
        break;
      }
      case 'favorites': {
        this.favoritesService.remove(product);
        break;
      }        
    }
  }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( subscription => subscription.unsubscribe());
  }
}
