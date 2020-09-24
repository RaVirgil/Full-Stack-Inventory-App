import { IInventoryItem } from 'inventory-interfaces/IInventoryItems';

export class InventoryItem implements IInventoryItem {
  id: string;
  name: string;
  user: string;
  description: string;
  location: string;
  inventoryNumber: number;
  createdAt: Date;
  modifiedAt: Date;
  longitude: number;
  latitude: number;
  active: boolean;

  public constructor(init?: Partial<InventoryItem>) {
    Object.assign(this, init);
  }
}
