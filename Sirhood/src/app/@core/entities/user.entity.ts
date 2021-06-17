import { IProduct } from '../../../../../Interfaces/IProduct';
import { IUser } from '../../../../../Interfaces/IUser';

export class User implements IUser {
  id: string;
  username: string;
  password: string;
  role: string;
  active: boolean;
  cart: IProduct[];
  favorites: IProduct[];

  public constructor(username: string, password: string, active: boolean) {
    this.username = username;
    this.password = password;
    this.active = active;
  }
}
