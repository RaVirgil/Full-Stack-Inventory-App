import { Router, Response, NextFunction } from "express";
import { EntityManager } from "mikro-orm";
import * as mailService from "../services/mail.service";
import { IExpressRequest } from "../interfaces/IExpressRequest";

export { setSirhoodMailRoute };

function setSirhoodMailRoute(router: Router): Router {  
  router.post("/", postMessage);

  return router;
}

async function postMessage(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));
  
  try {
     await mailService.sendMail('SIRHOOD', req.body);
  } catch (ex) {
    return next(ex);
  }
  
  return res.status(201).end();
}