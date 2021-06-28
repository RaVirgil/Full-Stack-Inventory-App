import { IProduct } from '../../../../../Interfaces/IProduct';

export class Product implements IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  priceDeal:number;
  quantity: number;
  brand: string;
  category: string;
  subCategory: string;
  location: string;
  tags: string[];
  imageLink: string;
  inventoryNumber: number;
  createdAt: Date;
  modifiedAt: Date;
  active: boolean;

  public constructor(init?: Partial<Product>) {
    Object.assign(this, init);
  }
  
}
