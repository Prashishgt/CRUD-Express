import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import indexRouter from "./src/routes/index.js";
import errorHandler from "./src/error/errorHandler.js";

const app = express();

// constants
const port = process.env.PORT;
const dbString = process.env.MONGO_URI;

// middleware
app.use(express.json());
// error handler
app.use(errorHandler);

// routes
app.use("/", indexRouter);

const start = async () => {
  try {
    await mongoose.connect(dbString);
    app.listen(port, () => {
      console.log(`Server is listening at port ${port}`);
    });
  } catch (error) {
    console.log("Error at starting the server", error);
  }
};

start();
