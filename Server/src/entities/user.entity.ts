import {
    Entity,
    MongoEntity,
    SerializedPrimaryKey,
    PrimaryKey,
    Property,
  } from "mikro-orm";
  import { ObjectId } from "mongodb";
  import { IUsers } from "inventory-interfaces/IUsers";
  
  @Entity()
  export class User
    implements MongoEntity<User>, IUsers {
    @PrimaryKey()
    _id!: ObjectId;
  
    @SerializedPrimaryKey()
    id!: string;
  
    @Property()
    user: string;
  
    @Property()
    password: string;   

    @Property()
    active: boolean;
  
    public constructor(init?: Partial<User>) {      
      Object.assign(this, init);
    }
  }
  