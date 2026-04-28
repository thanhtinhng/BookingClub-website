import jwt from "jsonwebtoken"

// ACCESS TOKEN
export const createAccessToken = (user) => {
  const payload = {
    id: user._id,
    phone: user.phone,
    email: user.email,
    type: "access",
  };

  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || "45m",
    }
  );
};

// REFRESH TOKEN
export const createRefreshToken = (user) => {
  const payload = {
    id: user._id,
    phone: user.phone,
    email: user.email,
    type: "refresh",
  };

  return jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE || "7d",
    }
  );
};