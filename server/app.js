require("dotenv").config();

// db
const connectDB = require("./db/connect");

console.log("Hello i am here");
const port = process.env.PORT;

const start = async () => {
  return {
    await connectDB(process.env.MONGO_URI);

  };
};
