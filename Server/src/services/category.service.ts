import { EntityManager, QueryOrder, QueryOrderMap, wrap } from "mikro-orm";

import { Category } from "../entities/category.entity";

export {
  getAllCategories,
  getSomeCategories,
  countCategories,
  getCategory,
  removeCategory,
  addCategory,
  updateCategory,
};

async function getAllCategories(
  em: EntityManager
): Promise<Error | Category[]> {
  if (!(em instanceof EntityManager)) return Error("invalid request");

  try {
    const items = await em.find(Category, {});
    return items;
  } catch (ex) {
    return ex;
  }
}

async function getSomeCategories(
  em: EntityManager,
  page: number,
  limit: number,
  sort = "",
  activeOnly = false
): Promise<Error | Category[]> {
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
    const items = await em.find(Category, activeOnly ? { active: true } : {}, {
      orderBy: sorting,
      limit: limit,
      offset: (page - 1) * limit,
    });

    return items;
  } catch (ex) {
    return ex;
  }
}

async function countCategories(em: EntityManager, activeOnly = false) {
  if (!(em instanceof EntityManager)) return Error("invalid request");

  try {
    const count = await em.count(Category, activeOnly ? { active: true } : {});
    return count;
  } catch (ex) {
    return ex;
  }
}

async function getCategory(
  em: EntityManager,
  id: string
): Promise<Error | Category> {
  try {
    const categories = await em.findOneOrFail(Category, { id: id });
    return categories;
  } catch (ex) {
    return ex;
  }
}

async function removeCategory(
  em: EntityManager,
  id: string
): Promise<Error | void> {
  if (!(em instanceof EntityManager)) return Error("invalid request");

  if (!id || typeof id !== "string") return Error("invalid params");

  try {
    const category = await em.findOneOrFail(Category, { id: id });
    em.removeAndFlush(category);
  } catch (ex) {
    return ex;
  }

  return Promise.resolve();
}

async function addCategory(
  em: EntityManager,
  category: Category
): Promise<Error | Category> {
  if (!(em instanceof EntityManager)) return Error("invalid request");

  try {
    const item = new Category(category);
    await em.persistAndFlush(item);
    return item;
  } catch (ex) {
    return ex;
  }
}

async function updateCategory(
  em: EntityManager,
  category: Category
): Promise<Error | Category> {
  if (!(em instanceof EntityManager)) return Error("invalid request");

  try {
    const item = await em.findOneOrFail(Category, {
      id: category.id,
    });
    wrap(item).assign(category);
    await em.persistAndFlush(item);
    return item;
  } catch (ex) {
    return ex;
  }
}
