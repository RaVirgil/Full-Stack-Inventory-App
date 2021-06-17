import { Product } from "../entities/product.entity";
import { EntityManager, wrap, QueryOrder, QueryOrderMap } from "mikro-orm";

export {
  getProducts,
  getProduct,
  updateProduct,
  addProduct,
  removeProduct,
  countProducts,
  getProductForCategory,
  getProductForSubcategory,
};

async function countProducts(em: EntityManager, activeOnly = false) {
  if (!(em instanceof EntityManager)) return Error("invalid request");

  try {
    const count = await em.count(Product, activeOnly ? { active: true } : {});
    return count;
  } catch (ex) {
    return ex;
  }
}

async function getProducts(
  em: EntityManager,
  page: number,
  limit: number,
  sort = "",
  activeOnly = false
): Promise<Error | Product[]> {
  if (!(em instanceof EntityManager)) return Error("invalid request");

  let sorting: QueryOrderMap = {};
  if (sort) {
    const sortParams = sort.split("_");
    const column = sortParams[0];
    const order = sortParams[1];
    if (column && order) {
      sorting[column] = order === "desc" ? QueryOrder.DESC : QueryOrder.ASC;
    } else {
      return Error("invalid params");
    }
  }

  try {
    const items = await em.find(Product, activeOnly ? { active: true } : {}, {
      orderBy: sorting,
      limit: limit,
      offset: (page - 1) * limit,
    });

    return items;
  } catch (ex) {
    return ex;
  }
}

async function getProduct(
  em: EntityManager,
  id: string
): Promise<Error | Product | null> {
  if (!(em instanceof EntityManager)) return Error("invalid request");

  if (!id || typeof id !== "string") return Error("invalid params");

  try {
    const item = await em.findOne(Product, { id: id });
    return item;
  } catch (ex) {
    return ex;
  }
}

async function removeProduct(
  em: EntityManager,
  id: string
): Promise<Error | void> {
  if (!(em instanceof EntityManager)) return Error("invalid request");

  if (!id || typeof id !== "string") return Error("invalid params");

  try {
    const item = await em.findOneOrFail(Product, { id });
    await em.removeAndFlush(item);
  } catch (ex) {
    return ex;
  }
}

async function updateProduct(
  em: EntityManager,
  product: Partial<Product>
): Promise<Error | Product> {
  if (!(em instanceof EntityManager)) return Error("invalid request");

  if (!product || typeof product !== "object" || !product.id)
    return Error("invalid params");

  try {
    const item = await em.findOneOrFail(Product, {
      id: product.id,
    });
    wrap(item).assign(product);
    await em.persistAndFlush(item);
    return item;
  } catch (ex) {
    return ex;
  }
}

async function addProduct(
  em: EntityManager,
  product: Partial<Product>
): Promise<Error | Product> {
  if (!(em instanceof EntityManager)) return Error("invalid request");

  if (!product || typeof product !== "object" || product.id)
    return Error("invalid params");

  try {
    const item = new Product(product);
    await em.persistAndFlush(item);
    return item;
  } catch (ex) {
    return ex;
  }
}

async function getProductForCategory(
  em: EntityManager,
  category: string
): Promise<Error | Product[] | null> {
  if (!(em instanceof EntityManager)) return Error("invalid request");
  if (!category || typeof category !== "string") return Error("invalid params");

  try {
    const items = await em.find(Product, { category: category });
    return items;
  } catch (ex) {
    return ex;
  }
}

async function getProductForSubcategory(
  em: EntityManager,
  category: string,
  subCategory: string
): Promise<Error | Product[] | null> {
  if (!(em instanceof EntityManager)) return Error("invalid request");
  if (!category || typeof category !== "string") return Error("invalid params");
  if (!subCategory || typeof subCategory !== "string")
    return Error("invalid params");

  try {
    const items = await em.find(Product, {
      category: category,
      subCategory: subCategory,
    });
    return items;
  } catch (ex) {
    return ex;
  }
}
