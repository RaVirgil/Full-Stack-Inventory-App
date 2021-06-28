export interface IProduct {
  id: string;
  name: string;
  description: string;  
  price: number;
  priceDeal: number;
  quantity: number;
  brand: string;
  category: string;
  subCategory: string;
  tags: string[];
  imageLink: string;
  inventoryNumber: number;
  createdAt: Date;
  modifiedAt: Date;  
  active: boolean;
}
