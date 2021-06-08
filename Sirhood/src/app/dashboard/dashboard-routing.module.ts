import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DealsComponent } from './deals/deals.component';
import { FemaleComponent } from './female/female.component';
import { MaleComponent } from './male/male.component';
import { NewComponent } from './new/new.component';
import { ProfileComponent } from './profile/profile.component';
import { UpcomingComponent } from './upcoming/upcoming.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'male', component: MaleComponent },
      { path: 'female', component: FemaleComponent },
      { path: 'new', component: NewComponent },
      { path: 'deals', component: DealsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'upcoming', component: UpcomingComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
