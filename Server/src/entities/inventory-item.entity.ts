import {
  Entity,
  MongoEntity,
  SerializedPrimaryKey,
  PrimaryKey,
  Property,
} from "mikro-orm";
import { ObjectId } from "mongodb";
import { IInventoryItem } from "inventory-interfaces/IInventoryItems";

@Entity()
export class InventoryItem
  implements MongoEntity<InventoryItem>, IInventoryItem {
  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  name: string;

  @Property()
  description: string;

  @Property()
  user: string;

  @Property()
  location: string;

  @Property()
  inventoryNumber: number;

  @Property()
  createdAt: Date;

  @Property()
  modifiedAt: Date;

  @Property()
  longitude: number;
  
  @Property()
  latitude: number;

  @Property()
  active: boolean;



  public constructor(init?: Partial<InventoryItem>) {    
    Object.assign(this, init);
    this.createdAt = new Date();
  }
}
