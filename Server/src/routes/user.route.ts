import { Router, Response, NextFunction } from "express";
import { EntityManager } from "mikro-orm";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as userService from "../services/users.service";

export { setUserRoute };

function setUserRoute(router: Router): Router {
  router.post("/login", loginUser);

  return router;
}

async function loginUser(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  let accessToken: Error | string;
  try {
    accessToken = await userService.loginUser(req.em, req.body);
  } catch (ex) {
    return next(ex);
  }

  if (accessToken instanceof Error) return next(accessToken);

  return res.status(201).json(accessToken);
}
