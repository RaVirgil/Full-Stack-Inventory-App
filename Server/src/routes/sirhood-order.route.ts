import { Router, Response, NextFunction } from "express";
import { EntityManager } from "mikro-orm";
import { Order } from "../entities/order.entity";
import * as ordersService from "../services/orders.service";
import { IExpressRequest } from "../interfaces/IExpressRequest";

export { setSirhoodOrderRoute };

function setSirhoodOrderRoute(router: Router): Router {
  router.get("/:id", getOrdersForUser);
  router.post("/", postOrderForUser);
  return router;
}

async function getOrdersForUser(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  let orders: Error | Order[] | null;
  try {
    orders = await ordersService.getOrdersForUser(req.em, req.params.id);
  } catch (ex) {
    return next(ex);
  }

  if (orders instanceof Error) return next(orders);

  if (orders === null) return res.status(404).end();

  return res.json(orders);
}

async function postOrderForUser(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  let order: Error | Order;
  try {
    order = await ordersService.postOrder(req.em, req.body);
  } catch (ex) {
    return next(ex);
  }

  if (order instanceof Error) return next(order);

  return res.status(201).json(order);
}
