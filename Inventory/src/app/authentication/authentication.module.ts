import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './log-in/log-in.component';


@NgModule({
  declarations: [   
    AuthenticationComponent,
    LoginComponent
  ],
  imports: [
    CommonModule, SharedModule
  ],
  providers:[    
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ]
})
export class AuthenticationModule { }
