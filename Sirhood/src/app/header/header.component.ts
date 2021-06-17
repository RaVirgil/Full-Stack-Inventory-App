import { Component } from '@angular/core';
import { AuthenticationService } from '../@core/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public authenticated: boolean;
  constructor(private readonly authenticationService: AuthenticationService) {}
  public isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }
}
