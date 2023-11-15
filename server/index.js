import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import indexRouter from "./src/routes/index";

dotenv.config();
// constants
const port = process.env.PORT || 8000;

const dbString = process.env.MONGO_URI;

const app = express();
// middleware
app.use(express.json());

// route
app.use("/", indexRouter);

const start = async () => {
  try {
    console.log("I am here");
    await mongoose.connect(dbString);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("Error at starting the server", error);
  }
};

start();
