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


@NgModule({
  declarations: [
    DashboardComponent,
    MaleComponent,
    FemaleComponent,
    NewComponent,
    DealsComponent,
    UpcomingComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
