import { Product } from "../entities/product.entity";
import { EntityManager, wrap, QueryOrder, QueryOrderMap } from "mikro-orm";

export {
  getProducts,
  getProduct,
  updateProduct,
  addProduct,
  removeProduct,
  countProducts,
};

async function countProducts(em: EntityManager, activeOnly = false) {
  if (!(em instanceof EntityManager)) return Error("invalid request");

  try {
    const count = await em.count(
      Product,
      activeOnly ? { active: true } : {}
    );
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
    const items = await em.find(
      Product,
      activeOnly ? { active: true } : {},
      {
        orderBy: sorting,
        limit: limit,
        offset: (page - 1) * limit,
      }
    );
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("GET product 201");
    return items;
  } catch (ex) {
    console.log("GET product 500");
    console.log(ex);
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
    console.log(`GET product/${id} 201`);
    return item;
  } catch (ex) {
    console.log(`GET product/${id} 500`);
    console.log(ex);
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
    console.log(id);
    const item = await em.findOneOrFail(Product, { id });
    console.log(`DELETE product/${id} 201`);
    await em.removeAndFlush(item);
  } catch (ex) {
    console.log(`DELETE product/${id} 500`);
    console.log(ex);
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
    console.log(`PUT product/ 201`);
    return item;
  } catch (ex) {
    console.log(`PUT product/ 500`);
    console.log(ex);
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
    console.log(`POST product/ 201`);
    return item;
  } catch (ex) {
    console.log(`POST product/ 500`);
    console.log(ex);
    return ex;
  }
}
