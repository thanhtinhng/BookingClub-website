import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const registerService = async ({ phone, password, email }) => {
  const existingPhone = await User.findOne({ phone });
  if (existingPhone) {
    throw new Error("Phone already exists");
  }

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    phone,
    password: hashedPassword,
    email
  });

  return user;
};

export const loginService = async ({ phone, password }) => {
  const user = await User.findOne({ phone });

  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Wrong password");
  }

  return user;
};
