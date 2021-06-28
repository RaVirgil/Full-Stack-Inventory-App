import { IProduct } from "./IProduct";

export interface IUser {   
    id: string;
    username: string;  
    email: string;
    phone: string;
    country: string;
    county: string;
    address: string;
    fullname: string;
    password: string;
    cart: IProduct[]; 
    favorites: IProduct[];
    orders: IProduct[];
    role: string;
    active: boolean;
  }
  