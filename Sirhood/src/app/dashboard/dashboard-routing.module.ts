import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionGuard } from '../@core/guards/session.guard';
import { ContactComponent } from '../contact/contact.component';
import { ProductItemComponent } from '../shared/product-item/product-item.component';
import { CartComponent } from './cart/cart.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard.component';
import { DealsComponent } from './deals/deals.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { FemaleComponent } from './female/female.component';
import { InfoComponent } from './info/info.component';
import { MaleComponent } from './male/male.component';
import { NewComponent } from './new/new.component';
import { ProfileComponent } from './profile/profile.component';
import { QuestionsComponent } from './questions/questions.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { UpcomingComponent } from './upcoming/upcoming.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  { path: 'category/:category', component: CategoryComponent },
  {
    path: 'category/:category/subCategory/:subCategory',
    component: SubcategoryComponent,
  },
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
  {path: "cart", component: CartComponent},
  {path: "favorites", component: FavoritesComponent, canActivate: [SessionGuard]},
  {path: "info", component: InfoComponent},
  {path: "questions", component: QuestionsComponent},
  {path: "contact", component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
