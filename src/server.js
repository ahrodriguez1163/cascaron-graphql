import express from "express";
import { graphqlHTTP } from "express-graphql";
import { graphqlUploadExpress } from "graphql-upload";
// import MyGraphQLSchema from './graphql/schema'
import { getSchema } from "./graphql/schema";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import config from "./config";
import { db } from "./config/sequelize";

const app = express();

(async () => {
  //middleswares
  app.use(morgan("dev"));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //middleware graphql
  //const middlewares=[]
  //const shemaWithMiddleware = applyMiddleware( MyGraphQLSchema , ...middlewares)

  const root = {
    hostname(args, request) {
      return request.hostname;
    },
  };

  //routers
  app.use(
    "/graphql/v1",
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
    graphqlHTTP({
      schema: await getSchema(), //shemaWithMiddleware,
      graphiql: true,
      rootValue: root,
      customFormatErrorFn: (err) => {
        // console.log(err);
        return err;
        //     const error = getErrorCode(err.message)
        //     if(error){
        //         return ({ message: error.message, statusCode: error.statusCode })
        //     }
      },
    })
  );

  app.use(express.static(path.join(__dirname, "../public")));

  //Server is listenend
  app.set("port", config.port);
  app.listen(app.get("port"), async () => {
    console.log(`EXPRESS running by PORT ${app.get("port")}...`);
    try {
      await db.sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.log("Unable to connect to the database");
      // console.error("Unable to connect to the database:", error);
    }
  });
})();

export { app };
