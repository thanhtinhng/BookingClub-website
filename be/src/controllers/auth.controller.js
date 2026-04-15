import {
  registerService,
  loginService,
  verifyEmailService,
  resendVerificationEmailService,
  forgotPasswordService,
  resetPasswordService
} from "../services/auth.service.js";
import { validatePassword } from "../validators/validate.js";

const isProduction = process.env.NODE_ENV === "production";

const getTokenFromRequest = (req) => req.query.token || req.body.token;

export const register = async (req, res) => {
  try {
    const { phone, password, email } = req.body;

    if (!phone || !password || !email) {
      return res.status(400).json({ message: "Missing fields" });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        message: "Password not strong enough"
      });
    }

    const result = await registerService({ phone, password, email });

    return res.status(201).json({
      message: "Register successful. Please verify your email.",
      user: result.user,
      ...(isProduction
        ? {}
        : {
            verificationToken: result.verificationToken,
            verificationLink: result.verificationLink
          })
    });

  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const rs = await loginService({ phone, password });

    return res.json({
      access_token: rs.access_token,
      phone: rs.user.phone,
      email: rs.user.email
    });

  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const token = getTokenFromRequest(req);

    const user = await verifyEmailService({ token });

    return res.json({
      message: "Email verified successfully",
      user
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Missing email" });
    }

    const result = await resendVerificationEmailService({ email });

    return res.json(result);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Missing email" });
    }

    const result = await forgotPasswordService({ email });

    return res.json(result);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const token = getTokenFromRequest(req);
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Missing password" });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        message: "Password not strong enough"
      });
    }

    const user = await resetPasswordService({ token, password });

    return res.json({
      message: "Password reset successful",
      user
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
