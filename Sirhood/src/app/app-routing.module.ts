import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { CartComponent } from './cart/cart.component';
import { DealsComponent } from './dashboard-items/deals/deals.component';
import { FemaleComponent } from './dashboard-items/female/female.component';
import { MaleComponent } from './dashboard-items/male/male.component';
import { NewComponent } from './dashboard-items/new/new.component';
import { UpcomingComponent } from './dashboard-items/upcoming/upcoming.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'account', component: AccountComponent },
  { path: 'cart', component: CartComponent },
  { path: 'deals', component: DealsComponent },
  { path: 'female', component: FemaleComponent },
  { path: 'male', component: MaleComponent },
  { path: 'new', component: NewComponent },
  { path: 'upcoming', component: UpcomingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
