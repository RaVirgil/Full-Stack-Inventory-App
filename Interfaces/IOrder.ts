import { IProduct } from "./IProduct";
import { IUserInfo } from "./IUserInfo";

export interface IOrder {
    id: string;
    userId: string;
    sessionId: string;
    userInfo: IUserInfo;
    products: IProduct[];
    orderedAt: Date;
    status: string;
  }