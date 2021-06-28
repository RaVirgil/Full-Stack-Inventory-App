import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from '../api/http.service';
import { Product } from '../entities/product.entity';
import { Session } from '../entities/session.entity';
import { AuthenticationService } from './authentication.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartSize: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public cart$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private cart: Product[] = [];

  constructor(
    private readonly httpService: HttpService,
    private readonly authenticationService: AuthenticationService,
    private readonly sessionService: SessionService
  ) {
    this.sessionService.session.subscribe((session: Session) => {
      this.cart = session?.cart;
      this.cart$.next(session?.cart);
      this.cartSize.next(session?.cart.length);
    });
  }

  public add(product: Product) {
    const authenticated = this.authenticationService.isAuthenticated();

    if (authenticated) {
      this.addToDb(product);
    }

    this.cart.push(product);
    this.cart$.next(this.cart);
    this.sessionService.setCart(this.cart);
  }

  private addToDb(product: Product): void {
    this.httpService
      .post(`cart/${this.authenticationService.getUserId()}`, product)
      .subscribe();
  }

  public removeAll(): void {
    this.cart = [];
    this.cart$.next(this.cart);
    this.sessionService.setCart(this.cart);
  }

  public remove(product: Product): void {
    const index = this.cart.findIndex(
      (cartProduct) => cartProduct.id === product.id
    );

    this.cart.splice(index, 1);
    this.cart$.next(this.cart);
    this.sessionService.setCart(this.cart);
  }
}
