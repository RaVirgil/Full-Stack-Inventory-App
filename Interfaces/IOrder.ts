import { IProduct } from "./IProduct";

export interface IOrder {
    id: string;
    fullname: string
    products: IProduct,
    orderedAt: Date
    status: string
  }