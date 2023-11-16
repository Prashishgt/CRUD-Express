import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import indexRouter from "./routes/index.js";
import errorHandlerMiddleware from "./middleware/errorHandler.js";

const app = express();

// constants
const port = process.env.PORT;
const dbString = process.env.MONGO_URI;

// middleware
app.use(express.json());

// routes
app.use("/", indexRouter);

// error handler
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
