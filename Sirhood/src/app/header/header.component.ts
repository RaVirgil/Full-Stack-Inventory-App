import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public input = '';  
  constructor(private readonly authenticationService: AuthenticationService, private readonly cartService: CartService, private readonly router: Router) {}

  ngOnInit(): void {
    
    this.cartService.cartSize.subscribe(size => this.cartSize = size);    
  }
  public isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }

  public inputChanged(newInput: string){
      this.input = newInput;     
      this.router.navigate([`search/${this.input}`]);
  }
}
