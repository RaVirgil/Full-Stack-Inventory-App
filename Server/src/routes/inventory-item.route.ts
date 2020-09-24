import { Router, Response, NextFunction } from "express";
import { EntityManager } from "mikro-orm";
import { InventoryItem } from "../entities/inventory-item.entity";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as inventoryItemService from "../services/inventory-item.service";
import * as jwt from "jsonwebtoken";
import { env } from "../env";

export { setInventoryItemRoute };

function setInventoryItemRoute(router: Router): Router {
  router.get("/", authToken, getInventoryItems);
  router.get("/:id", authToken, getInventoryItem);
  router.post("/", authToken, postInventoryItem);
  router.put("/", authToken, putInventoryItem);
  router.delete("/:id", authToken, removeInventoryItem);

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

async function getInventoryItems(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  let inventoryItems: Error | InventoryItem[] | null;
  let count = 0;

  let page = req.query.pageNumber
    ? parseInt(req.query.pageNumber.toString())
    : 1;

  let limit = req.query.pageSize ? parseInt(req.query.pageSize.toString()) : 5;

  try {
    [inventoryItems, count] = await Promise.all([
      inventoryItemService.getInventoryItems(
        req.em,
        page,
        limit,
        req.query.sort ? req.query.sort.toString() : "",
        req.query.activeOnly === "true"
      ),
      inventoryItemService.countInventoryItems(
        req.em,
        req.query.activeOnly === "true"
      ),
    ]);
  } catch (ex) {
    return next(ex);
  }

  if (inventoryItems instanceof Error) return next(inventoryItems);

  return res.header("X-Count", count.toString()).json(inventoryItems);
}

async function getInventoryItem(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  let inventoryItem: Error | InventoryItem | null;
  try {
    inventoryItem = await inventoryItemService.getInventoryItem(
      req.em,
      req.params.id
    );
  } catch (ex) {
    return next(ex);
  }

  if (inventoryItem instanceof Error) return next(inventoryItem);

  if (inventoryItem === null) return res.status(404).end();

  return res.json(inventoryItem);
}

async function removeInventoryItem(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  try {
    await inventoryItemService.removeInventoryItem(req.em, req.params.id);
  } catch (ex) {
    return next(ex);
  }

  return res.status(200).end();
}

async function postInventoryItem(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  let inventoryItem: Error | InventoryItem;
  try {
    inventoryItem = await inventoryItemService.addInventoryItem(
      req.em,
      req.body
    );
  } catch (ex) {
    return next(ex);
  }

  if (inventoryItem instanceof Error) return next(inventoryItem);

  return res.status(201).json(inventoryItem);
}

async function putInventoryItem(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  let inventoryItem: Error | InventoryItem;
  try {
    inventoryItem = await inventoryItemService.updateInventoryItem(
      req.em,
      req.body
    );
  } catch (ex) {
    return next(ex);
  }

  if (inventoryItem instanceof Error) return next(inventoryItem);

  return res.status(200).json(inventoryItem);
}
