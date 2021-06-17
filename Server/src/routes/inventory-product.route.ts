import { Router, Response, NextFunction } from "express";
import { EntityManager } from "mikro-orm";
import { Product } from "../entities/product.entity";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as productService from "../services/products.service";
import * as jwt from "jsonwebtoken";
import { env } from "../env";

export { setInventoryProductRoute };

function setInventoryProductRoute(router: Router): Router {
  router.get("/", authToken, getProducts);
  router.get("/:id", authToken, getProduct);
  router.post("/", authToken, postProduct);
  router.put("/", authToken, putProduct);
  router.delete("/:id", authToken, removeProduct);

  return router;
}

function authToken(req: IExpressRequest, res: Response, next: NextFunction) {
  try {
    console.log("called");
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

async function getProducts(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  let proudcts: Error | Product[] | null;
  let count = 0;

  let page = req.query.pageNumber
    ? parseInt(req.query.pageNumber.toString())
    : 1;

  let limit = req.query.pageSize ? parseInt(req.query.pageSize.toString()) : 5;

  try {
    [proudcts, count] = await Promise.all([
      productService.getProducts(
        req.em,
        page,
        limit,
        req.query.sort ? req.query.sort.toString() : "",
        req.query.activeOnly === "true"
      ),
      productService.countProducts(
        req.em,
        req.query.activeOnly === "true"
      ),
    ]);
  } catch (ex) {
    return next(ex);
  }

  if (proudcts instanceof Error) return next(proudcts);

  return res.header("X-Count", count.toString()).json(proudcts);
}

async function getProduct(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  let product: Error | Product | null;
  try {
    product = await productService.getProduct(
      req.em,
      req.params.id
    );
  } catch (ex) {
    return next(ex);
  }

  if (product instanceof Error) return next(product);

  if (product === null) return res.status(404).end();

  return res.json(product);
}

async function removeProduct(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  try {
    await productService.removeProduct(req.em, req.params.id);
  } catch (ex) {
    return next(ex);
  }

  return res.status(200).end();
}

async function postProduct(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

    
  let product: Error | Product;
  try {
    product = await productService.addProduct(
      req.em,
      req.body
    );
  } catch (ex) {
    return next(ex);
  }

  if (product instanceof Error) return next(product);

  return res.status(201).json(product);
}

async function putProduct(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  let product: Error | Product;
  try {
    product = await productService.updateProduct(
      req.em,
      req.body
    );
  } catch (ex) {
    return next(ex);
  }

  if (product instanceof Error) return next(product);

  return res.status(200).json(product);
}
