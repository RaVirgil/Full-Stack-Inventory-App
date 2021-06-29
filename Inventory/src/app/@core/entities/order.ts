import { IOrder } from '../../../../../Interfaces/IOrder';
import { IProduct } from '../../../../../Interfaces/IProduct';
import { IUserInfo } from '../../../../../Interfaces/IUserInfo';

export class Order implements IOrder {
  id: string;
  userId: string;
  sessionId: string;
  userInfo: IUserInfo;
  products: IProduct[];
  orderedAt: Date;
  status: string;

  public constructor(init?: Partial<Order>) {
    Object.assign(this, init);
  }
}
