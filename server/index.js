import express from "express";
import dotenv from "dotenv";
import mongoose, { connect } from "mongoose";
import indexRouter from "./routes/index.js";

dotenv.config();

const app = express();

// constants
const port = process.env.PORT;
const dbString = process.env.MONGO_URI;

// middleware
app.use(express.json());

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
