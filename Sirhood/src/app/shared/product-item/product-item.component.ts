import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/@core/entities/product.entity';
import { AuthenticationService } from 'src/app/@core/services/authentication.service';
import { CartService } from 'src/app/@core/services/cart.service';
import { FavoritesService } from 'src/app/@core/services/favorites.service';
import { ProductService } from 'src/app/@core/services/product.service';
import { VisitedService } from 'src/app/@core/services/visited.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  public product: Product;

  constructor(
    private readonly cartService: CartService,
    private readonly favoritesService: FavoritesService,
    private readonly productService: ProductService,
    private readonly route: ActivatedRoute,
    private readonly visitedService: VisitedService,
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.initProduct();
  }

  private initProduct(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.productService.getById(id).subscribe((product) => {
      this.product = product;
      this.visitedService.add(this.product);
    });
  }

  public addToCartButton() {
    this.cartService.add(this.product);
  }

  public addToFavoritesButton() {
    if(!this.authenticationService.isAuthenticated()){
      this.router.navigate(['auth/login']);
      return;
    }
    this.favoritesService.add(this.product);
  }
}
