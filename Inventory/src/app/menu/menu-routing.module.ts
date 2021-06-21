import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionGuard } from '../@core/guards/session.guard';
import { ShowItemComponent } from '../shared/show-item/show-item.component';
import { AddComponent } from './add/add.component';
import { CategoriesComponent } from './categories/categories.component';
import { ContactComponent } from './contact/contact.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ScanComponent } from './scan/scan.component';

const routes: Routes = [
  {
    path: '',
    component: InventoryComponent,
    data: { animation: 'isLeft' },
    canActivate: [SessionGuard],
 
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    data: { animation: 'isLeft' },
    canActivate: [SessionGuard],
 
  },  
  {
    path: 'scan',
    component: ScanComponent,
    data: { animation: 'isLeft' },
    canActivate: [SessionGuard],
   
  },
  {
    path: 'add',
    component: AddComponent,
    data: { animation: 'isLeft' },
    canActivate: [SessionGuard],
  
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { animation: 'isLeft' },
    canActivate: [SessionGuard],
   
  },
  {
    path: 'item/:id',
    component: ShowItemComponent,
    data: { animation: 'isLeft' },
    canActivate: [SessionGuard],
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}
