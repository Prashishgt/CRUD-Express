import jwt from "jsonwebtoken";

const createToken = (payload) => {
  const createdToken = jwt.sign(
    {
      data: payload,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  );

  return createdToken;
};

const verifyJWT = (token) => {
  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return verifiedToken;
  } catch (error) {
    throw new Error("Token is invalid");
  }
};

export { createToken, verifyJWT };
