import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from '../api/http.service';
import { Product } from '../entities/product.entity';
import { Session } from '../entities/session.entity';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  public session: BehaviorSubject<Session> = new BehaviorSubject<Session>(
    new Session({
      cart: [],
      visited: [],
    })
  );
  private sessionId: string | null;

  constructor(
    private readonly httpService: HttpService,
    private readonly localStorageSerivce: LocalStorageService
  ) {
    this.sessionId = this.localStorageSerivce.get('sessionId');

    if (!this.sessionId || this.sessionId === '') {
      const token = this.getRandomString(20);
      this.localStorageSerivce.put('sessionId', token);
      this.post(token);

      this.httpService.get(`session/${token}`).subscribe((session: Session) => {
        this.session.next(session);
      });
    } else {
      this.httpService
        .get(`session/${this.sessionId}`)
        .subscribe((session: Session) => {
          this.session.next(session);
        });
    }
  }

  public getSessionId(): string | null {
    return this.sessionId;
  }

  public setCart(cart: Product[]): void {
    const newSession = {
      ...this.session.getValue(),
    };

    newSession.cart = cart;
    this.session.next(newSession);
    this.put();
  }

  public setVisited(visited: Product[]): void {
    const newSession = {
      ...this.session.getValue(),
    };

    newSession.visited = visited;
    this.session.next(newSession);
    this.put();
  }

  private post(token: string): void {
    this.httpService.post(`session/${token}`, {}).subscribe();
  }

  private put(): void {
    this.httpService
      .put(`session/${this.session.getValue().token}`, this.session.getValue())
      .subscribe();
  }

  private getRandomString(length: number): string {
    var randomChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  }
}
