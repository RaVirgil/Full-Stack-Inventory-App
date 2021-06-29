import { Router, Response, NextFunction } from "express";
import { EntityManager } from "mikro-orm";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as sessionService from "../services/session.service";

export { setSessionRoute };

function setSessionRoute(router: Router): Router {
  router.get("/:token", getSession);
  router.post("/:token", addSession);
  router.put("/:token", updateSession);
  router.delete("/:token", deleteSession);
  return router;
}

async function getSession(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  let response: Error | any;

  try {
    response = await sessionService.getSession(req.em, req.params.token);
  } catch (ex) {
      return next(ex);
  }

  return res.json(response);
}

async function addSession(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  try {
    await sessionService.addSession(req.em, req.params.token);
  } catch (ex) {
    return next(ex);
  }

  return res.status(201).end();
}

async function deleteSession(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  try {
    await sessionService.deleteSession(req.em, req.params.token);
  } catch (ex) {
    return next(ex);
  }

  return res.status(201).end();
}

async function updateSession(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));
  
  try {   
    console.log(req.body);
    await sessionService.updateSession(req.em, req.body);
  } catch (ex) {
    return next(ex);
  }

  return res.status(201).end();
}
