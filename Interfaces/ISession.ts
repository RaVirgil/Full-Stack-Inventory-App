import { IProduct } from "./IProduct";

export interface ISession {
  id: string;
  token: string;
  cart: IProduct[];
  visited: IProduct[];
  createdAt: Date;
}
