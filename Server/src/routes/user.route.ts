import { Router, Response, NextFunction } from "express";
import { EntityManager } from "mikro-orm";
import { User } from "../entities/user.entity";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as userService from "../services/users.service";

export { setUserRoute };

function setUserRoute(router: Router): Router {
  router.post("/login", loginUser);
  router.post("/register", registerUser);
  router.put("/update", updateUser);

  return router;
}

async function loginUser(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  let response: Error | any;
  try {    
    response = await userService.loginUser(req.em, req.body);
  } catch (ex) {
    return next(ex);
  }

  return res.json(response);
}

async function registerUser(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  try {
    userService.registerUser(req.em, req.body);
  } catch (ex) {
    return next(ex);
  }

  return res.status(201);
}

async function updateUser(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  let user: User | Error;
  
  try {
    user = await userService.updateUser(req.em, req.body);
  } catch (ex) {
    return next(ex);
  }

  if (user instanceof Error) return next(user);

  
  return res.status(201).end();
}
