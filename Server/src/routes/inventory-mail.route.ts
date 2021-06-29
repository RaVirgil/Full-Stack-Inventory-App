import { Router, Response, NextFunction } from "express";
import { EntityManager } from "mikro-orm";
import * as mailService from "../services/mail.service";
import * as jwt from "jsonwebtoken";
import { env } from "../env";
import { IExpressRequest } from "../interfaces/IExpressRequest";

export { setInventoryMailRoute };

function setInventoryMailRoute(router: Router): Router {  
  router.post("/", authToken, postMessage);

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

async function postMessage(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));
  
  try {
     await mailService.sendMail('INVENTORY', req.body);
  } catch (ex) {
    return next(ex);
  }
  
  return res.status(201).end();
}