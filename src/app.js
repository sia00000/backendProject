import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

let app = express();

// Set Origin allow to get data

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// json format mai data, url formet m data and static format mai data accept karna ka liye configure

app.use(
  express.json({
    limit: "20kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "20kb",
  })
);

app.use(express.static("Public"));

//set cookies

app.use(cookieParser());

// Routes Import

import userRouter from "./routes/user.route.js";

// Routes Declaration

app.use("/api/v1/users", userRouter);
export default express;
