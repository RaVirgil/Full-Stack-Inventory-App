import { IOrder } from '../../../../../Interfaces/IOrder';
import { IProduct } from '../../../../../Interfaces/IProduct';

export class Order implements IOrder {
    id: string;
    fullname: string;
    products: IProduct;
    orderedAt: Date;
    status: string;

}
