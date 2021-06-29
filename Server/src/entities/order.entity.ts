import {
  Entity,
  MongoEntity,
  SerializedPrimaryKey,
  PrimaryKey,
  Property,
} from "mikro-orm";
import { ObjectId } from "mongodb";
import { IOrder } from "../../../Interfaces/IOrder";
import { IProduct } from "../../../Interfaces/IProduct";
import { IUserInfo } from "../../../Interfaces/IUserInfo";

@Entity()
export class Order implements MongoEntity<Order>, IOrder {
  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  fullname: string;

  @Property()
  userId: string;

  @Property()
  sessionId: string;

  @Property()
  userInfo: IUserInfo;

  @Property()
  products: IProduct[];

  @Property()
  orderedAt: Date;

  @Property()
  status: string;

  public constructor(init?: Partial<Order>) {
    Object.assign(this, init);
  }
  
}
