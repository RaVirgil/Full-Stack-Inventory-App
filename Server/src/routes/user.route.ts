import { Router, Response, NextFunction } from "express";
import { EntityManager } from "mikro-orm";
import { User } from "../entities/user.entity";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as userService from "../services/users.service";

export { setUserRoute };

function setUserRoute(router: Router): Router {  
  router.get("/", getUsers);
  router.get("/:id", getUser);
  router.post("/", postUser);
  router.post("/login", loginUser);
  router.put("/", putUser);
  router.delete("/:id", removeUser);

  return router;
}

async function getUsers(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {  
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  let users: Error | User[] | null;
  let count = 0;

  try {
        users = await Promise.all([
      userService.getUsers(
        req.em       
      ),
      userService.countUsers(
        req.em,
        req.query.activeOnly === "true"
      ),
    ]);    
  } catch (ex) {
    return next(ex);
  }

  if (users instanceof Error) return next(users);

  return res.header("X-Count", count.toString()).json(users);
}

async function getUser(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  let user: Error | User | null;
  try {
    user = await userService.getUser(
      req.em,
      req.params.id
    );
  } catch (ex) {
    return next(ex);
  }

  if (user instanceof Error) return next(user);

  if (user === null) return res.status(404).end();

  return res.json(user);
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
    
    accessToken = await userService.loginUser(
      req.em,
      req.body
    );
  } catch (ex) {
    return next(ex);
  }

  if (accessToken instanceof Error) return next(accessToken);

  return res.status(201).json(accessToken);
}

async function removeUser(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  try {
    await userService.removeUser(req.em, req.params.id);
  } catch (ex) {
    return next(ex);
  }

  return res.status(200).end();
}

async function postUser(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  let user: Error | User;
  try {   
    
    user = await userService.addUser(
      req.em,
      req.body
    );
  } catch (ex) {
    return next(ex);
  }

  if (user instanceof Error) return next(user);

  return res.status(201).json(user);
}

async function putUser(
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.em || !(req.em instanceof EntityManager))
    return next(Error("EntityManager not available"));

  let user: Error | User;
  try {
    user = await userService.updateUser(
      req.em,
      req.body
    );
  } catch (ex) {
    return next(ex);
  }

  if (user instanceof Error) return next(user);

  return res.status(200).json(user);
}
