import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";
import * as express from "express";
import * as session from 'express-session';
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import { TypeormStore,  SessionEntity } from 'typeorm-store';
import { Session } from './entity/Session';
import routes from "./routes";

//Connects to the Database -> then starts the express
createConnection()
  .then(async connection => {
    // Create a new express application instance
    const app = express();

    // Call midlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      //cookie: { secure: true }
      cookie: {maxAge: 180*60*1000}
    }))    

    //Set all routes from routes folder
    app.use("/", routes);

    app.listen(3000, () => {
      console.log("Server started on port 3000!");
    });
  })
.catch(error => console.log(error));
