import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteItemComponent } from './favorite-item/favorite-item.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { ProductItemCardComponent } from './product-item-card/product-item-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [   
    FavoriteItemComponent,
    ProductItemComponent,
    CartItemComponent,
    ProductItemCardComponent
  ],
  imports: [
    CommonModule,   
    RouterModule,
  ],
  exports:[
    FavoriteItemComponent,
    ProductItemComponent,
    CartItemComponent,
    ProductItemCardComponent,    
  ]
})
export class SharedModule { }
