import { IProduct } from "./IProduct";

export interface IUser {   
    id: string;
    username: string;  
    password: string;
    cart: IProduct[]; 
    favorites: IProduct[];
    role: string;
    active: boolean;
  }
  