import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';
import { HttpService } from '../api/http.service';
import { Order } from '../entities/order.entity';


@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private readonly httpService: HttpService,
    private readonly cookieService: CookieService
  ) {}

  public get(): Observable<Order[]> {
    const id = this.cookieService.get('userId');
    return this.httpService.get(`sirhood/orders/${id}`);
  }

  public post(order: Order): void {
    this.httpService.post('sirhood/orders', order).subscribe();
  }
}
