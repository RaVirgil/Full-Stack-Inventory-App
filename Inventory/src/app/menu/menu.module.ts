import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { SharedModule } from '../shared/shared.module';
import { AddItemComponent } from './add-item/add-item.component';
import { ContactComponent } from './contact/contact.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ScanComponent } from './scan/scan.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { AddComponent } from './add/add.component';
import { AddCategoryComponent } from './add-category/add-category.component';

@NgModule({
  declarations: [
    MenuComponent,
    AddItemComponent,
    ContactComponent,
    InventoryComponent,
    ScanComponent,
    CategoriesComponent,
    ProductsComponent,
    AddComponent,
    AddCategoryComponent,   
  ],
  imports: [CommonModule, MenuRoutingModule, SharedModule],
  providers: [    
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  exports: [InventoryComponent]
})
export class MenuModule {}
