import { Router, Response, NextFunction } from "express";
import { EntityManager } from "mikro-orm";
import { Category } from "../entities/category.entity";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as categoryService from "../services/category.service";

export { setSirhoodCategoryRoute };

function setSirhoodCategoryRoute(router: Router): Router {
  router.get("/", getCategories);
  router.get("/:id", getCategory);

  return router;
}

async function getCategories(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  let categories: Error | Category[];   

  try {
    categories = await categoryService.getAllCategories(req.em);
    
  } catch (ex) {
    return next(ex);
  }

  if (categories instanceof Error) return next(categories);

  return res.json(categories);
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
