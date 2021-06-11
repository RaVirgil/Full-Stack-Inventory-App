import * as express from "express";
import { env } from "./env";
import { setUserRoute } from "./routes/user.route";
import { IExpressError } from "./interfaces/IExpressError";
import { MikroORM, ReflectMetadataProvider } from "mikro-orm";
import entities from "./entities";
import { IExpressRequest } from "./interfaces/IExpressRequest";
import * as bodyParser from "body-parser";
import { setProductRoute } from "./routes/product.route";

let app: express.Application;

async function makeApp(): Promise<express.Application> {
  if (app) return app;

  app = express();

  const orm = await MikroORM.init({
    metadataProvider: ReflectMetadataProvider,
    cache: { enabled: false },
    entities: entities,
    dbName: env.DB_NAME,
    clientUrl: env.MONGO_URL,
    type: "mongo",
    autoFlush: false,
  });

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
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // routes
  app.use(env.PRODUCT_ROUTE, setProductRoute(express.Router()));
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

export { makeApp };
