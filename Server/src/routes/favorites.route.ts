import { Router, Response, NextFunction } from "express";
import { EntityManager } from "mikro-orm";
import { Product } from "../entities/product.entity";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as favoritesService from "../services/favorites.service";

export { setFavoritesRoute };

function setFavoritesRoute(router: Router): Router {
  router.get("/:id", getFavorites);
  router.post("/:id", postFavorites);
  router.put("/:id", putFavorites);
  router.delete("/:id", removeFavorites);
  router.delete("/:id/:productId", removeFromFavorites);

  return router;
}

async function getFavorites(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  let cart: Product[] | Error = [];
  try {
    cart = await favoritesService.getUserFavorites(req.em, req.params.id);
  } catch (ex) {
    return next(ex);
  }

  return res.json(cart);
}

async function removeFavorites(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  try {
    await favoritesService.removeFavorites(req.em, req.params.id);
  } catch (ex) {
    return next(ex);
  }

  return res.status(200).end();
}

async function removeFromFavorites(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));
        
  try {
    await favoritesService.removeFromFavorites(
      req.em,
      req.params.id,
      req.params.productId
    );
  } catch (ex) {
    return next(ex);
  }

  return res.status(200).end();
}

async function postFavorites(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  try {
    favoritesService.addToFavorites(req.em, req.params.id, req.body);
  } catch (ex) {
    return next(ex);
  }

  return res.status(200).end();
}

async function putFavorites(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  try {
    favoritesService.updateFavorites(req.em, req.params.id, req.body);
  } catch (ex) {
    return next(ex);
  }

  return res.status(200).end();
}
