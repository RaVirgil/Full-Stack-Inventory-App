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
import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { CartComponent } from './cart/cart.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { InfoComponent } from './info/info.component';
import { QuestionsComponent } from './questions/questions.component';
import { ContactComponent } from '../contact/contact.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MaleComponent,
    FemaleComponent,
    NewComponent,
    DealsComponent,
    UpcomingComponent,
    ProfileComponent, 
    CategoryComponent,
    SubcategoryComponent,
    CartComponent,
    FavoritesComponent,
    InfoComponent,
    QuestionsComponent,
    ContactComponent,
    PaymentComponent
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
