import mongoose, { Schema } from "mongoose";
import commonSchema from "../../helper/commonSchema.js";

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 4,
    maxlength: 20,
    trim: true,
    required: [true, "Full name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    trim: true,
  },
  age: {
    type: Number,
    default: 18,
    required: [true, "Age is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
  },
  ...commonSchema,
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
