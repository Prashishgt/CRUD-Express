import jwt from "jsonwebtoken";

const createToken = (payload, isRefreshToken) => {
  const createdToken = jwt.sign(
    {
      data: payload,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: !isRefreshToken
        ? process.env.JWT_REFRESH_EXPIRY
        : process.env.JWT_ACCESS_EXPIRY,
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
