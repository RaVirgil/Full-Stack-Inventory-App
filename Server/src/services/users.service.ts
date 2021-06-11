import { User } from "../entities/user.entity";
import { EntityManager } from "mikro-orm";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { env } from "../env";
export { loginUser };

async function loginUser(
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
    console.log(foundUser);
    if (foundUser != null) {
      if (await bcrypt.compare(user.password, foundUser.password)) {
        return generateAccessToken(foundUser.id);
      }
    }
  } catch (ex) {
    return ex;
  }
  return "incorrect credentials";
}

function generateAccessToken(id: string) {  
  console.log(id)
  const accessToken = jwt.sign({id: id}, env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5m",
  });
  console.log("POST users/login 201");
  return accessToken;
}
