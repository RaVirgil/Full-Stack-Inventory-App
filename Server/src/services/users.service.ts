import { User } from "../entities/user.entity";
import { EntityManager, wrap } from "mikro-orm";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { env } from "../env";
export {  
  loginUser  
};

async function loginUser(
  em: EntityManager,
  user: User
): Promise<Error | string> {
  if (!(em instanceof EntityManager)) return Error("invalid request");

  if (!user.user || typeof user.user !== "string") return Error("invalid params");
  if (!user.password || typeof user.password !== "string") return Error("invalid params");

  try {
    const foundUser = await em.findOne(User, { user: user.user });
    console.log(foundUser);
    if(foundUser != null ){
    if(await bcrypt.compare(user.password, foundUser.password)){     
      return generateAccessToken(user);
    } else {
      return "incorrect password";
    }   
   }else {
     return "user non-existent";
   }
  } catch (ex) {
    return ex;
  }
}

function generateAccessToken(user: User){
  const accessToken= jwt.sign(user, env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'});
      return accessToken;
}





