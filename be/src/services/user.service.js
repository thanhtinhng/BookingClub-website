import User from "../models/user.model.js";

export const getMeService = async (userId) => {
  const user = await User.findById(userId).select(
    "_id name phone email status"
  );

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
