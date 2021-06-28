import {
    Entity,
    MongoEntity,
    SerializedPrimaryKey,
    PrimaryKey,
    Property,
  } from "mikro-orm";
  import { ObjectId } from "mongodb";
  import { Product } from "./product.entity";
  
  @Entity()
  export class Session implements MongoEntity<Session> {
    @PrimaryKey()
    _id!: ObjectId;
  
    @SerializedPrimaryKey()
    id!: string;

    @Property()
    token: string;
  
    @Property()
    cart: Product[];

    @Property()
    visited: Product[];

    @Property()
    createdAt: Date;
      
    public constructor(init?: Partial<Session>) {
      Object.assign(this, init);
    }
  }
  