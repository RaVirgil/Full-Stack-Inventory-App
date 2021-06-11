import { IUser } from '../../../../Interfaces/IUser';

export class User implements IUser {
  id: string;  
  username: string;
  role: string;
  password:string;
  active: boolean;

  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
