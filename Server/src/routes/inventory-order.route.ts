import { Router, Response, NextFunction } from "express";
import { EntityManager } from "mikro-orm";
import { Order } from "../entities/order.entity";
import * as ordersService from "../services/orders.service";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as jwt from "jsonwebtoken";
import { env } from "../env";

export { setInventoryOrderRoute };

function setInventoryOrderRoute(router: Router): Router {
  router.get("/:id", authToken, getOrdersForUser);
  router.post("/", authToken, postOrderForUser);
  router.put("/:id", authToken, putOrderForUser);
  router.delete("/", authToken, deleteOrderForUser);
  return router;
}

function authToken(req: IExpressRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
      return res.status(401).send("Something wrong with getting token");

    jwt.verify(token, env.ACCESS_TOKEN_SECRET, (err) => {
      if (err) return res.status(403).send("Invalid token");
      next();
      return;
    });
  } catch (ex) {
    return next(ex);
  }
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
    orders = await ordersService.getOrders(req.em, req.params.id);
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

async function deleteOrderForUser(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  try {
    await ordersService.removeOrder(req.em, req.params.id);
  } catch (ex) {
    return next(ex);
  }

  return res.status(200).end();
}

async function putOrderForUser(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  let order: Error | Order;
  try {
    order = await ordersService.updateOrder(req.em, req.body);
  } catch (ex) {
    return next(ex);
  }

  if (order instanceof Error) return next(order);

  return res.status(200).json(order);
}
