import { EntityManager, wrap } from "mikro-orm";
import { Session } from "../entities/session.entity";
export { addSession, deleteSession, getSession, updateSession };

async function addSession(
  em: EntityManager,
  token: string
): Promise<Error | any> {
  if (!(em instanceof EntityManager)) return Error("invalid request");

  try {
    const foundSession = await em.findOne(Session, { token: token });
    if (!foundSession) {
      const session = generateSession(token);
      em.persistAndFlush(session);
      return "ok";
    }
  } catch (ex) {
    console.log(ex);
    return ex;
  }
  return "error";
}

function generateSession(token: string): Session {
  const session: Session = new Session();
  session.token = token;
  session.createdAt = new Date();
  session.cart = [];
  session.visited = [];

  return session;
}

async function updateSession(
  em: EntityManager,
  session: Partial<Session>
): Promise<Error | any> {
  if (!(em instanceof EntityManager)) return Error("invalid request");

  try {   
    let foundSession = await em.findOne(Session, { token: session.token });   
    if (foundSession) {
      wrap(foundSession).assign(session);
      console.log(foundSession);
      await em.persistAndFlush(foundSession);
      return "ok";
    }
  } catch (ex) {
    console.log(ex);
    return ex;
  }
  return "error";
}

async function getSession(
  em: EntityManager,
  token: string
): Promise<Error | any> {
  if (!(em instanceof EntityManager)) return Error("invalid request");

  try {
    console.log(token);
    let foundSession = await em.findOne(Session, { token: token });
    if (foundSession) {
      return foundSession;
    }
  } catch (ex) {
    console.log(ex);
    return ex;
  }
  return "error";
}

async function deleteSession(
  em: EntityManager,
  token: string
): Promise<Error | any> {
  if (!(em instanceof EntityManager)) return Error("invalid request");

  try {
    let foundSession = await em.findOne(Session, { token: token });
    if (foundSession) {
      em.removeAndFlush(foundSession);
    }
  } catch (ex) {
    console.log(ex);
    return ex;
  }
  return "error";
}
