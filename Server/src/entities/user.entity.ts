import {
  Entity,
  MongoEntity,
  SerializedPrimaryKey,
  PrimaryKey,
  Property,
} from "mikro-orm";
import { ObjectId } from "mongodb";
import { IUser } from "../../../Interfaces/IUser";

@Entity()
export class User implements MongoEntity<User>, IUser {
  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  username: string;

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
