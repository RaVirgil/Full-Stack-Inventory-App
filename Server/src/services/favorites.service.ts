import { User } from "../entities/user.entity";
import { EntityManager } from "mikro-orm";
import { Product } from "../entities/product.entity";

export {
  getUserFavorites,
  removeFavorites,
  removeFromFavorites,
  addToFavorites,
  updateFavorites,
};

async function getUserFavorites(
    em: EntityManager,
    id: string
  ): Promise<Error | Product[]> {
    try {
      const foundUser = await em.findOne(User, { id: id });
      if (foundUser != null) {
        return foundUser.favorites;
      }
    } catch (ex) {
      return ex;
    }
    return [];
  }
  
  async function removeFromFavorites(
    em: EntityManager,
    id: string,
    productId: string
  ): Promise<Error | void> {
    if (!(em instanceof EntityManager)) return Error("invalid request");
  
    if (!id || typeof id !== "string") return Error("invalid params");
  
    try {
      const user = await em.findOneOrFail(User, { id });
      const index = user.favorites.findIndex((x) => x.id === productId);
      if (index > -1) {
        user.favorites.splice(index, 1);
        em.flush();
      }
    } catch (ex) {
      return ex;
    } 
  }
  
  async function removeFavorites(
    em: EntityManager,
    id: string
  ): Promise<Error | void> {
    if (!(em instanceof EntityManager)) return Error("invalid request");
  
    if (!id || typeof id !== "string") return Error("invalid params");
  
    try {
      const user = await em.findOneOrFail(User, { id });
      user.favorites = [];
      em.flush();
    } catch (ex) {
      return ex;
    } 
  }
  
  async function addToFavorites(
    em: EntityManager,
    id: string,
    product: Product
  ): Promise<Error | void> {
    if (!(em instanceof EntityManager)) return Error("invalid request");
  
    if (!id || typeof id !== "string") return Error("invalid params");
  
    try {
      const user = await em.findOneOrFail(User, { id });
      user.favorites.push(product);
      em.flush();
    } catch (ex) {
      return ex;
    } 
  }
  
  async function updateFavorites(
    em: EntityManager,
    id: string,
    favorites: Product[]
  ): Promise<Error | void> {
    if (!(em instanceof EntityManager)) return Error("invalid request");
  
    if (!id || typeof id !== "string") return Error("invalid params");
  
    try {
      const user = await em.findOneOrFail(User, { id });
      user.favorites = favorites;
      em.flush();
    } catch (ex) {
      return ex;
    } 
  }