import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../@core/services/authentication.service';
import { CartService } from '../@core/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public cartSize = 0;
  public authenticated: boolean;
  constructor(private readonly authenticationService: AuthenticationService, private readonly cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartSize.subscribe(size => this.cartSize = size);    
  }
  public isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }
}
