import {
  Entity,
  MongoEntity,
  SerializedPrimaryKey,
  PrimaryKey,
  Property,
} from "mikro-orm";
import { ObjectId } from "mongodb";
import { IProduct } from "../../../Interfaces/IProduct";

@Entity()
export class Product implements MongoEntity<Product>, IProduct {
  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  name: string;

  @Property()
  description: string;

  @Property()
  price: number;

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
  active: boolean;

  public constructor(init?: Partial<Product>) {
    Object.assign(this, init);
    this.createdAt = new Date();
  }
}
