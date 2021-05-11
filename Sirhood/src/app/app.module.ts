import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AccountComponent } from './account/account.component';
import { CartComponent } from './cart/cart.component';
import { NewComponent } from './dashboard-items/new/new.component';
import { DealsComponent } from './dashboard-items/deals/deals.component';
import { UpcomingComponent } from './dashboard-items/upcoming/upcoming.component';
import { MaleComponent } from './dashboard-items/male/male.component';
import { FemaleComponent } from './dashboard-items/female/female.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    AccountComponent,
    CartComponent,
    NewComponent,
    DealsComponent,
    UpcomingComponent,
    MaleComponent,
    FemaleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
