import { Router, Response, NextFunction } from "express";
import { EntityManager } from "mikro-orm";
import { Product } from "../entities/product.entity";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as productService from "../services/products.service";

export { setSirhoodProductRoute };

function setSirhoodProductRoute(router: Router): Router {
  router.get("/", getProducts);
  router.get('/popular', getPopularProducts);
  router.get("/:id", getProduct);
  router.get("/category/:category", getProductsForCategory);
  router.get(
    "/category/:category/subCategory/:subCategory",
    getProductsForSubcategory
  );
  return router;
}

async function getPopularProducts( req: IExpressRequest,
  res: Response,
  next: NextFunction){
    if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

    let result: Product[] | Error;

    try {
      result = await productService.getPopularProducts(req.em);     
    } catch (ex) {
      return next(ex);
    }

    if(result instanceof Error) next(result);
    return res.json(result);
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
      productService.countProducts(req.em, req.query.activeOnly === "true"),
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
    product = await productService.getProduct(req.em, req.params.id);
  } catch (ex) {
    return next(ex);
  }

  if (product instanceof Error) return next(product);

  if (product === null) return res.status(404).end();

  return res.json(product);
}

async function getProductsForCategory(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  console.log("called");
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  let products: Error | Product[] | null;
  try {
    products = await productService.getProductForCategory(
      req.em,
      req.params.category
    );
  } catch (ex) {
    return next(ex);
  }

  if (products instanceof Error) return next(products);

  if (products === null) return res.status(404).end();

  return res.json(products);
}

async function getProductsForSubcategory(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  let products: Error | Product[] | null;
  try {
    products = await productService.getProductForSubcategory(
      req.em,
      req.params.category,
      req.params.subCategory
    );
  } catch (ex) {
    return next(ex);
  }

  if (products instanceof Error) return next(products);

  if (products === null) return res.status(404).end();

  return res.json(products);
}
