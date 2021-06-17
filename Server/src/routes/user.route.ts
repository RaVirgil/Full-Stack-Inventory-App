import { Router, Response, NextFunction } from "express";
import { EntityManager } from "mikro-orm";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as userService from "../services/users.service";

export { setUserRoute };

function setUserRoute(router: Router): Router {
  router.post("/login", loginUser);
  router.post("/register", registerUser);

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
  console.log(req.body);
  try {
    console.log(req.body);
    response = await userService.loginUser(req.em, req.body);
  } catch (ex) {
    console.log(ex);
    return next(ex);
  }

  console.log(response);  

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
