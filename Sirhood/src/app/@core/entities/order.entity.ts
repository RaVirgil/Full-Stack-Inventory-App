import { IOrder } from '../../../../../Interfaces/IOrder';

import { Product } from './product.entity';
import { UserInfo } from './user-info.entity';

export class Order implements IOrder {
  id: string;
  userId: string;
  sessionId: string;
  userInfo: UserInfo;
  products: Product[];
  orderedAt: Date;
  status: string;

  public constructor(init?: Partial<Order>) {
    Object.assign(this, init);
  }
}
