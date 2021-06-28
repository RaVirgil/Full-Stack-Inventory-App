import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../entities/product.entity';
import { Session } from '../entities/session.entity';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class VisitedService {
  public visitedSize: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public visited$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private visited: Product[] = [];

  constructor(
    private readonly sessionService: SessionService
  ) {
    this.sessionService.session.subscribe((session: Session) => {
      this.visited = session?.visited;
      this.visited$.next(session?.visited);
      this.visitedSize.next(session?.visited.length);
    });
  }

  public add(product: Product) {    
    const index = this.visited.findIndex(visitedProduct => visitedProduct.id === product.id)
    if(index < 0){
      this.visited.push(product);
      this.visited$.next(this.visited);
      this.sessionService.setVisited(this.visited);
    };   
  } 

  public removeAll(): void {
    this.visited = [];
    this.visited$.next(this.visited);
    this.sessionService.setVisited(this.visited);
  } 
}
