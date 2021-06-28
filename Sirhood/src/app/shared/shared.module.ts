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

@NgModule({
  declarations: [
    FavoriteItemComponent,
    ProductItemComponent,
    CartItemComponent,
    ProductItemCardComponent,
    CategoriesMenuComponent,  
    AvailableStockComponent
  ],
  imports: [CommonModule, RouterModule, MaterialModule,CookieModule.forRoot()],
  exports: [
    FavoriteItemComponent,
    ProductItemComponent,
    CartItemComponent,
    ProductItemCardComponent,
    MaterialModule,
    CategoriesMenuComponent,
    AvailableStockComponent
  ],
})
export class SharedModule {}
