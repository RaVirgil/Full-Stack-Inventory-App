import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddItemComponent} from "./menu-items/add-item/add-item.component";
import {ContactComponent} from "./menu-items/contact/contact.component";
import {InventoryComponent} from "./menu-items/inventory/inventory.component";
import {ScanComponent} from "./menu-items/scan/scan.component";
import {HomePageComponent} from "./home-page/home-page.component";
import { ShowItemComponent } from './menu-items/show-item/show-item.component';

const routes: Routes = [
  {path:'',component: HomePageComponent },
  {path:'inventory',component: InventoryComponent, data: { animation: 'isLeft' }  },
  {path:'scan',component: ScanComponent,data: { animation: 'isLeft' } },
  {path:'add-item',component:AddItemComponent,data: { animation: 'isLeft' }  },
  {path:'contact',component:ContactComponent,data: { animation: 'isLeft' } },
  {path:'item/:id', component: ShowItemComponent,data: { animation: 'isLeft' }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponent = [
  HomePageComponent,
  ScanComponent,
  InventoryComponent,
  ContactComponent,
  AddItemComponent,
  ShowItemComponent
]