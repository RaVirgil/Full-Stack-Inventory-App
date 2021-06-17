import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionGuard } from '../@core/guards/session.guard';
import { ProductItemComponent } from '../shared/product-item/product-item.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard.component';
import { DealsComponent } from './deals/deals.component';
import { FemaleComponent } from './female/female.component';
import { MaleComponent } from './male/male.component';
import { NewComponent } from './new/new.component';
import { ProfileComponent } from './profile/profile.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { UpcomingComponent } from './upcoming/upcoming.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {path: 'category/:category', component: CategoryComponent},
      {path: 'category/:category/subCategory/:subCategory', component: SubcategoryComponent},
      { path: 'male', component: MaleComponent },
      { path: 'female', component: FemaleComponent },
      { path: 'new', component: NewComponent },
      { path: 'deals', component: DealsComponent },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [SessionGuard],
      },
      { path: 'upcoming', component: UpcomingComponent },
      { path: 'product/:id', component: ProductItemComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
