import { User } from "../entities/user.entity";
import { EntityManager } from "mikro-orm";
import { Product } from "../entities/product.entity";

export { getUserCart, removeCart, removeFromCart, addToCart, updateCart };

async function getUserCart(
  em: EntityManager,
  id: string
): Promise<Error | Product[]> {
  try {
    const foundUser = await em.findOne(User, { id: id });
    if (foundUser != null) {
      return foundUser.cart;
    }
  } catch (ex) {
    return ex;
  }
  return [];
}

async function removeFromCart(
  em: EntityManager,
  id: string,
  productId: string
): Promise<Error | void> {
  if (!(em instanceof EntityManager)) return Error("invalid request");

  if (!id || typeof id !== "string") return Error("invalid params");

  try {
    const user = await em.findOneOrFail(User, { id });
    const index = user.cart.findIndex((x) => x.id === productId);
    if (index > -1) {
      user.cart.splice(index, 1);
      em.flush();
    }
  } catch (ex) {
    return ex;
  }

  return Promise.resolve();
}

async function removeCart(
  em: EntityManager,
  id: string
): Promise<Error | void> {
  if (!(em instanceof EntityManager)) return Error("invalid request");

  if (!id || typeof id !== "string") return Error("invalid params");

  try {
    const user = await em.findOneOrFail(User, { id });
    user.cart = [];
    em.flush();
  } catch (ex) {
    return ex;
  }

  return Promise.resolve();
}

async function addToCart(
  em: EntityManager,
  id: string,
  product: Product
): Promise<Error | void> {
  if (!(em instanceof EntityManager)) return Error("invalid request");

  if (!id || typeof id !== "string") return Error("invalid params");

  try {
    const user = await em.findOneOrFail(User, { id });
    user.cart.push(product);
    em.flush();
  } catch (ex) {
    return ex;
  }

  return Promise.resolve();
}

async function updateCart(
  em: EntityManager,
  id: string,
  cart: Product[]
): Promise<Error | void> {
  if (!(em instanceof EntityManager)) return Error("invalid request");

  if (!id || typeof id !== "string") return Error("invalid params");

  try {
    const user = await em.findOneOrFail(User, { id });
    user.cart = cart;
    em.flush();
  } catch (ex) {
    return ex;
  }

  return Promise.resolve();
}
