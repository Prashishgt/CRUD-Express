import mongoose, { Schema } from "mongoose";
import { commonSchema } from "../../utils/commonSchema";

const authSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  token: {
    type: Number,
    required: [true, "Token is required.."],
  },
  ...commonSchema,
});

const AuthModel = mongoose.model("Auth", authSchema);
export default AuthModel;
