import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionGuard } from './@core/guards/session.guard';
import { CartComponent } from './cart/cart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'cart', component: CartComponent},
  {path: 'favorites', component: FavoritesComponent, canActivate: [SessionGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
