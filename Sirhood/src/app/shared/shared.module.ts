import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteItemComponent } from './favorite-item/favorite-item.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { ProductItemCardComponent } from './product-item-card/product-item-card.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { CategoriesMenuComponent } from './categories-menu/categories-menu.component';
import { CookieModule } from 'ngx-cookie';
import { AvailableStockComponent } from './available-stock/available-stock.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardPaymentComponent } from './card-payment/card-payment.component';
import { VisitedComponent } from './visited/visited.component';
import { MostPopularComponent } from './most-popular/most-popular.component';

@NgModule({
  declarations: [
    FavoriteItemComponent,
    ProductItemComponent,
    CartItemComponent,
    ProductItemCardComponent,
    CategoriesMenuComponent,  
    AvailableStockComponent,
    CardPaymentComponent,
    VisitedComponent,
    MostPopularComponent
  ],
  imports: [CommonModule, RouterModule, MaterialModule,CookieModule.forRoot(),  FormsModule,
    ReactiveFormsModule],
  exports: [
    FavoriteItemComponent,
    ProductItemComponent,
    CartItemComponent,
    ProductItemCardComponent,
    MaterialModule,
    CategoriesMenuComponent,
    AvailableStockComponent,
    FormsModule,
    ReactiveFormsModule,
    CardPaymentComponent,
    VisitedComponent,
    MostPopularComponent
  ],
})
export class SharedModule {}
