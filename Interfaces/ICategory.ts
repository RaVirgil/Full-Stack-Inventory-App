export interface ICategory {
    id: string;
    name: string;
    subCategories: string[];
    active: boolean;
    type: string;
    createdAt: Date;
    modifiedAt: Date;
    user: string;
  }