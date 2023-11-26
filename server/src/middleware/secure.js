import { verifyToken } from "./verifyToken.js";
import UserModel from "../modules/user/user.model.js";
import { UnauthenticatedError } from "../error/customError";

const secureAPI = () => {
    return async (req, res, next) => {
        const token = req?.header?.authorization;
        if (!token) throw new UnauthenticatedError("Access Token Required");

        const accessToken = token.split();
        const { data } = 
    }
}