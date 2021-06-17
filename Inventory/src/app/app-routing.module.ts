import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { MenuComponent } from './menu/menu.component';
import { SessionGuard } from './@core/guards/session.guard';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: AuthenticationComponent },
  { path: 'auth', component: AuthenticationComponent },
  { path: 'menu', component: MenuComponent, canActivate: [SessionGuard], loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule) },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
