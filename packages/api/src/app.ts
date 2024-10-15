import express from "express";
import cors from "cors";
import { serve, setup } from "swagger-ui-express";
import yaml from "yamljs";
//env files
import "dotenv/config";
import path from "node:path";
import { errorHandler, tokenParserMiddleware } from "./middleware";
import {
  ArticlesController,
  AuthController,
  UsersController,
  SmesController,
  TransactionsController
} from "./controllers";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "static")));

// setup the swagger docs
const swaggerDocument = yaml.load(path.join(__dirname, "swagger.yaml"));
app.use("/docs", serve, setup(swaggerDocument));

app.post("/login", AuthController.login);
app.get("/users", tokenParserMiddleware, UsersController.getUsers);
app.get("/current-user", tokenParserMiddleware, UsersController.getCurrentUser);
app.get("/sme-data", tokenParserMiddleware, SmesController.getSme);
app.get(
  "/transactions",
  tokenParserMiddleware,
  TransactionsController.getTransactions,
);
app.get("/articles", tokenParserMiddleware, ArticlesController.getArticles);
app.get("/articles/:id", tokenParserMiddleware, ArticlesController.getArticle);

app.use(errorHandler);
console.log("\n 🚀\x1b[33m rdzcn\x1b[90m mock API online\x1b[93m :) \x1b[0m");
console.log(
  `\n\t\x1b[33m ➜\x1b[37m Running on\x1b[33m \t\thttp://localhost:${process.env.PORT}\x1b[0m`,
);
console.log(
  `\t\x1b[33m ➜\x1b[90m Documentation at\x1b[33m \thttp://localhost:${process.env.PORT}/docs\x1b[0m\n`,
);
app.listen(process.env.PORT);
