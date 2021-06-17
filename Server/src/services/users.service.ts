import { User } from "../entities/user.entity";
import { EntityManager } from "mikro-orm";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { env } from "../env";

export { loginUser, registerUser };

async function loginUser(
  em: EntityManager,
  user: User
): Promise<Error | any> {
  if (!(em instanceof EntityManager)) return Error("invalid request");

  if (!user.username || typeof user.username !== "string")
    return Error("invalid params");
  if (!user.password || typeof user.password !== "string")
    return Error("invalid params");
        

  try {
    const foundUser = await em.findOne(User, { username: user.username });
    if (foundUser != null) {
      if (await bcrypt.compare(user.password, foundUser.password)) {
        return {
          accessToken: generateAccessToken(foundUser.id),
          userId: foundUser.id,
          userRole: foundUser.role
        };
      }
      return "error";
    }    
  } catch (ex) {
    console.log(ex);
    return ex;
  }
  return "error";
}

async function registerUser(
  em: EntityManager,
  user: User
): Promise<Error | string> {
  if (!(em instanceof EntityManager)) return Error("invalid request");

  if (!user.username || typeof user.username !== "string")
    return Error("invalid params");
  if (!user.password || typeof user.password !== "string")
    return Error("invalid params");

  try {
    const foundUser = await em.findOne(User, { username: user.username });
    if (foundUser == null) {
      bcrypt.hash(user.password, 10, function (_err, hash) {
        user.password = hash;
        user.role = "user";
        const madeUser = new User(user);
        em.persistAndFlush(madeUser);
      });
    }
  } catch (ex) {
    return ex;
  }
  return "error";
}

function generateAccessToken(id: string) {
  const accessToken = jwt.sign({ id: id }, env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
  return accessToken;
}
