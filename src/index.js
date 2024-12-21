import connectDB from "./DB/index.js";
import "dotenv/config";
import app from "./app.js";

connectDB()
  .then(() => {
    app.on("error", () => {
      console.log("ERRR", error);
      throw error;
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log("Server is Runing at Port :", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("MONGO CONNECTION FAILD !!!", error);
  });

/*import mongoose from "mongoose";
import express from "express";
import { DB_NAME } from "./constant.js";
import "dotenv/config";

const app = express();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", () => {
      console.log("ERRR", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error(`Error:`, error);
    throw error;
  }
})();
*/
