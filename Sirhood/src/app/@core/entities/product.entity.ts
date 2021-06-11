import { IProduct } from '../../../../../Interfaces/IProduct';

export class Product implements IProduct {
  id: string;
  name: string; 
  description: string;
  price: number;
  location: string;
  tags: string[];
  inventoryNumber: number;
  createdAt: Date;
  modifiedAt: Date; 
  active: boolean;

  public constructor(init?: Partial<Product>) {
    Object.assign(this, init);
  }
}
