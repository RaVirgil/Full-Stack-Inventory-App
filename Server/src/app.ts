import * as express from "express";
import { env } from "./env";
import { setUserRoute } from "./routes/user.route";
import { MikroORM, ReflectMetadataProvider } from "mikro-orm";
import entities from "./entities/entitiesExport";
import { setInventoryProductRoute } from "./routes/inventory-product.route";
import { setSirhoodProductRoute } from "./routes/sirhood-product.route";
import { setCartRoute } from "./routes/cart.route";
import { setFavoritesRoute } from "./routes/favorites.route";
import { setInventoryCategoryRoute } from "./routes/inventory-category.route";
import { setSirhoodCategoryRoute } from "./routes/sirhood-category.route";
import { IExpressRequest } from "./interfaces/IExpressRequest";
import { IExpressError } from "./interfaces/IExpressError";

export { makeApp };
let app: express.Application;

async function makeApp(): Promise<express.Application | Error> {
  if (app) return app;

  app = express();

  let orm: any;
  try {
    orm = await MikroORM.init({
      metadataProvider: ReflectMetadataProvider,
      cache: { enabled: false },
      entities: entities,
      dbName: env.DB_NAME,
      clientUrl: env.MONGO_URL,
      type: "mongo",
      autoFlush: false,
    });
  } catch (er) {
    return er;
  }

  app.use(
    (
      req: IExpressRequest,
      _res: express.Response,
      next: express.NextFunction
    ) => {
      req.em = orm.em.fork();
      next();
    }
  );

  // middleware
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // routes
  app.use(
    env.INVENTORY_PRODUCT_ROUTE,
    setInventoryProductRoute(express.Router())
  );
  app.use(env.SIRHOOD_PRODUCT_ROUTE, setSirhoodProductRoute(express.Router()));
  app.use(env.CART_ROUTE, setCartRoute(express.Router()));
  app.use(env.FAVORITES_ROUTE, setFavoritesRoute(express.Router()));
  app.use(
    env.INVENTORY_CATEGORY_ROUTE,
    setInventoryCategoryRoute(express.Router())
  );
  app.use(
    env.SIRHOOD_CATEGORY_ROUTE,
    setSirhoodCategoryRoute(express.Router())
  );
  app.use(env.USER_ROUTE, setUserRoute(express.Router()));

  // 404
  app.use((_req, _res, next) => {
    const err = new Error("Not Found") as IExpressError;
    err.status = 404;
    next(err);
  });

  // 500
  app.use(
    (
      err: IExpressError,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction
    ) => {
      res.status(err.status || 500).send(err.message);
    }
  );

  return app;
}
