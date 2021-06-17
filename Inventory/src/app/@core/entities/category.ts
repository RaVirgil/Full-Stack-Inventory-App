import { ICategory } from '../../../../../Interfaces/ICategory';

export class Category implements ICategory {
  id: string;
  name: string;
  subCategories: string[];
  active: boolean;
  type: string;
  createdAt: Date;
  modifiedAt: Date;
  user: string;

  public constructor(init?: Partial<Category>) {
    Object.assign(this, init);
  }
 
}
