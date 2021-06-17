import {
  Entity,
  MongoEntity,
  SerializedPrimaryKey,
  PrimaryKey,
  Property,
} from "mikro-orm";
import { ObjectId } from "mongodb";
import { ICategory } from "../../../Interfaces/ICategory";

@Entity()
export class Category implements MongoEntity<Category>, ICategory {
  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  user: string;

  @Property()
  name: string;

  @Property()
  type: string;

  @Property()
  subCategories: string[];

  @Property()
  createdAt: Date;

  @Property()
  modifiedAt: Date;

  @Property()
  active: boolean;

  public constructor(init?: Partial<Category>) {
    Object.assign(this, init);
  }
  
}
