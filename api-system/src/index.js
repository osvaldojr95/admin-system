import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import "./config/config.js";
import routes from "./routes/routes.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";

const app = express();
app.use(json());
app.use(cors());
app.use(routes);
app.use(errorHandlerMiddleware);

app.listen(process.env.PORT, () => {
  console.log("Servidor online na porta " + process.env.PORT);
});
