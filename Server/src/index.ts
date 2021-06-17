import { env } from "./env";
import { makeApp } from "./app";
import { log } from "./log";

makeApp()
  .then((app) => {
    if (app instanceof Error) {
      console.log(app);
    } else
      app.listen(env.PORT, () => {
        log(`${env.NODE_ENV} server listening on port ${env.PORT}`);
      });
  })
  .catch((err) => {
    log(err);
  });
  