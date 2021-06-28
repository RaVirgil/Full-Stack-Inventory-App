import {
  Entity,
  MongoEntity,
  SerializedPrimaryKey,
  PrimaryKey,
  Property,
} from "mikro-orm";
import { ObjectId } from "mongodb";
import { IProduct } from "../../../Interfaces/IProduct";
import { IUser } from "../../../Interfaces/IUser";
import { Product } from "./product.entity";

@Entity()
export class User implements MongoEntity<User>, IUser {
  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  username: string;  

  @Property()
  email: string;

  @Property()
  phone: string;

  @Property()
  country: string;

  @Property()
  county: string;

  @Property()
  address: string;

  @Property()
  fullname: string;

  @Property()
  orders: IProduct[];

  @Property()
  cart: Product[];

  @Property()
  favorites: Product[];

  @Property()
  password: string;

  @Property()
  role: string;

  @Property()
  active: boolean;


  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  } 
}
