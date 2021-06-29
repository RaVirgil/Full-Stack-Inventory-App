import { Router, Response, NextFunction } from "express";
import { EntityManager } from "mikro-orm";
import { Product } from "../entities/product.entity";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as cartService from "../services/cart.service";

export { setCartRoute };

function setCartRoute(router: Router): Router {
  router.get("/:id", getCart);
  router.post("/:id", postCart);
  router.put("/:id", putCart);
  router.delete("/:id", removeCart);
  router.delete("/:id/:productId", removeFromCart);

  return router;
}

async function getCart(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  let cart: Product[] | Error = [];
  try {
    cart = await cartService.getUserCart(req.em, req.params.id);
  } catch (ex) {
    return next(ex);
  }

  return res.json(cart);
}

async function removeCart(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  try {
    await cartService.removeCart(req.em, req.params.id);
  } catch (ex) {
    return next(ex);
  }

  return res.status(200).end();
}

async function removeFromCart(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  try {
    await cartService.removeFromCart(
      req.em,
      req.params.id,
      req.params.productId
    );
  } catch (ex) {
    return next(ex);
  }


  return res.status(200).end();
}

async function postCart(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));
  try {
    await cartService.addToCart(req.em, req.params.id, req.body);
  } catch (ex) {
    return next(ex);
  }


  return res.status(200).end();
}

async function putCart(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  try {
    await cartService.updateCart(req.em, req.params.id, req.body);
  } catch (ex) {
    return next(ex);
  }


  return res.status(200).end();
}
