import { IUser } from '../../../../../Interfaces/IUser';

export class User implements IUser {
  id: string;  
  username: string;
  password:string;
  role: string;
  active: boolean;

  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
