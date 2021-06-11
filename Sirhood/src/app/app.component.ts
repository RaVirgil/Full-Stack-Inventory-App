import { Component } from '@angular/core';
import { AuthenticationService } from './@core/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public authenticated: boolean;
  constructor(private readonly authenticationService: AuthenticationService) {  
    
  }
  public isAuthenticated(): boolean{
    return this.authenticationService.isAuthenticated();
  }
}
