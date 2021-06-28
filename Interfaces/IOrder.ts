import { IProduct } from "./IProduct";
import { IUserInfo } from "./IUserInfo";

export interface IOrder {
    id: string;
    userId: string;
    userInfo: IUserInfo;
    products: IProduct[];
    orderedAt: Date;
    status: string;
  }