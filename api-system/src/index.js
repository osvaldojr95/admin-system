import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import http from 'http';
import "./config/config.js";
import routes from "./routes/routes.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";
import { importCustomerConsumer } from "./consumers/importCustomerConsumer.js";
import webSocket from "./webSocket/index.js";

const app = express();
app.use(json());
app.use(cors());
app.use(routes);
app.use(errorHandlerMiddleware);

const server = http.createServer(app);
export const wss = webSocket(server);

server.listen(process.env.PORT, () => {
  console.log("Servidor online na porta " + process.env.PORT);
});

importCustomerConsumer();