import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/@core/services/authentication.service';
import { FavoritesService } from 'src/app/@core/services/favorites.service';
import { Product } from '../../@core/entities/product.entity';
import { CartService } from '../../@core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public products: Product[] = [];
  public productPrice = 0;
  public transportPrice = 5;
  constructor(
    private readonly cartService: CartService,
    private readonly favoritesService: FavoritesService,
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart: Product[]) => {
      this.products = cart;
      this.productPrice = this.getProductsPrice(cart);
    });
  }

  public addToFavorites(product: Product): void {
    if (!this.authenticationService.isAuthenticated()) {
      this.openSnackbar();
    }

    this.favoritesService.add(product);
  }

  public delete(product: Product): void {
    this.cartService.remove(product);
  }

  private openSnackbar(): void {
    const ref = this.snackBar.open(
      `You need to have an account for that`,
      'Login',
      { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' }
    );

    ref.onAction().subscribe(() => {
      this.router.navigate(['auth/login']);
    });
  }

  public getProductsPrice(cart: Product[]): number {
    let cost = 0;
    cart.forEach((product: Product) => {
      if (product.priceDeal > 0) cost += product.priceDeal;
      else cost += product.price;
    });
    return cost;
  }
}
