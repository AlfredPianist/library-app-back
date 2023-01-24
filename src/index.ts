import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { AppDataSource } from "./config/data-source";
import { environmentVariables as env } from "./config/env-vars";
import { User } from "./entity/User";
import { Routes } from "./routes";
import cors from "cors";

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // setup express app here
    // ...

    // start express server
    app.listen(env.PORT);

    console.log(`🚀 Express server started on port ${env.PORT} 🚀.`);
  })
  .catch((error) => console.log(`⛔ Error starting Express server: ${error}`));
