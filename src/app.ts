import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import limiter from "./middlewares/rateLimiter.js";
import corsOption from "./middlewares/cors.js";
import authRouter from "./routes/auth.js";
import errormiddleWare from "./middlewares/error.js";

const app: Express = express();
const development: boolean = process.env["NODE_ENV"]! === "development";
const cookieSecret: string = process.env["COOKIE_KEY"]!;

if (development) {
  app.use(morgan("dev"));
}

app.use(cors(corsOption));
app.use(limiter);
app.use(cookieParser(cookieSecret));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth",authRouter)


app.use(errormiddleWare)

export default app;
