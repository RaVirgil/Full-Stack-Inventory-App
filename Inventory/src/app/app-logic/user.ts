import { IUsers } from '../../../../Interfaces/IUsers';

export class User implements IUsers {
  id: string;  
  user: string;
  password:string;
  active: boolean;

  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
