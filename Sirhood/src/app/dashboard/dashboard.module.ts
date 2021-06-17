import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MaleComponent } from './male/male.component';
import { FemaleComponent } from './female/female.component';
import { NewComponent } from './new/new.component';
import { DealsComponent } from './deals/deals.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MaleComponent,
    FemaleComponent,
    NewComponent,
    DealsComponent,
    UpcomingComponent,
    ProfileComponent,
    CategoriesComponent,
    CategoryComponent,
    SubcategoryComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
