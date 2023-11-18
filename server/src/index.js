/* eslint-disable no-undef */
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import "express-async-errors";
import errorHandlerMiddleware from "./middleware/errorHandler.js";

import indexRouter from "./routes/index.js";

const app = express();

// const values
const port = process.env.PORT || 8000;
const dbString = process.env.MONGO_URI;

app.use(express.json());

// routes
app.use("/", indexRouter);

app.use(errorHandlerMiddleware);

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
