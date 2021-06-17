import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteItemComponent } from './favorite-item/favorite-item.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { ProductItemCardComponent } from './product-item-card/product-item-card.component';
import { RouterModule } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';

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
    MatMenuModule,
  ],
  exports:[
    FavoriteItemComponent,
    ProductItemComponent,
    CartItemComponent,
    ProductItemCardComponent,    
    MatMenuModule
  ]
})
export class SharedModule { }
