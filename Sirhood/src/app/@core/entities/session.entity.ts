import { ISession } from '../../../../../Interfaces/ISession';
import { Product } from './product.entity';

export class Session implements ISession {
  id: string;
  token: string;
  cart: Product[];
  visited: Product[];
  createdAt: Date;

  public constructor(init?: Partial<Session>) {
    Object.assign(this, init);
  }
}
