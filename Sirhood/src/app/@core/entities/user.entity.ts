import { IProduct } from '../../../../../Interfaces/IProduct';
import { IUser } from '../../../../../Interfaces/IUser';

export class User implements IUser {
  id: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  country: string;
  county: string;
  address: string;
  fullname: string;
  orders: IProduct[];
  role: string;
  active: boolean;
  cart: IProduct[];
  favorites: IProduct[];
}
