export interface IProduct {
  id: string;
  name: string;
  description: string;  
  price: number;
  tags: string[];
  inventoryNumber: number;
  createdAt: Date;
  modifiedAt: Date;  
  active: boolean;
}
