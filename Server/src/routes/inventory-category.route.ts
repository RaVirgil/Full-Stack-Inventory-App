import { Router, Response, NextFunction } from "express";
import { EntityManager } from "mikro-orm";
import { Category } from "../entities/category.entity";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as categoryService from "../services/category.service";
import * as jwt from "jsonwebtoken";
import { env } from "../env";

export { setInventoryCategoryRoute };

function setInventoryCategoryRoute(router: Router): Router {
  router.get("/", authToken, getAllCategories);
  router.get("/some", authToken, getSomeCategories);
  router.get("/:id", authToken, getCategory);
  router.post("/", authToken, postCategory);
  router.put("/", authToken, putCategory);
  router.delete("/:id", authToken, removeCategory);

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

async function getAllCategories(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  let categories: Category[] | Error;

  try {
    categories = await categoryService.getAllCategories(req.em);
  } catch (ex) {
    return next(ex);
  }

  if (categories instanceof Error) return next(categories);

  return res.json(categories);
}

async function getSomeCategories(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  let categories: Error | Category[] | null;
  let count = 0;

  let page = req.query.pageNumber
    ? parseInt(req.query.pageNumber.toString())
    : 1;

  let limit = req.query.pageSize ? parseInt(req.query.pageSize.toString()) : 5;

  try {
    [categories, count] = await Promise.all([
      categoryService.getSomeCategories(
        req.em,
        page,
        limit,
        req.query.sort ? req.query.sort.toString() : "",
        req.query.activeOnly === "true"
      ),
      categoryService.countCategories(req.em, req.query.activeOnly === "true"),
    ]);
  } catch (ex) {
    return next(ex);
  }

  if (categories instanceof Error) return next(categories);

  return res.header("X-Count", count.toString()).json(categories);
}

async function getCategory(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  let category: Error | Category | null;
  try {
    category = await categoryService.getCategory(req.em, req.params.id);
  } catch (ex) {
    return next(ex);
  }

  if (category instanceof Error) return next(category);

  if (category === null) return res.status(404).end();

  return res.json(category);
}

async function removeCategory(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  try {
    await categoryService.removeCategory(req.em, req.params.id);
  } catch (ex) {
    return next(ex);
  }

  return res.status(200).end();
}

async function postCategory(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  let category: Error | Category;
  try {
    category = await categoryService.addCategory(req.em, req.body);
  } catch (ex) {
    return next(ex);
  }

  if (category instanceof Error) return next(category);

  return res.status(201).json(category);
}

async function putCategory(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));
  let category: Error | Category;

  try {
    category = await categoryService.updateCategory(req.em, req.body);
  } catch (ex) {
    return next(ex);
  }

  if (category instanceof Error) return next(category);

  return res.status(200).json(category);
}
