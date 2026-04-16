import nodemailer from "nodemailer";
import { logger } from "../utils/logger.js";

const hasSmtpConfig = () => {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
};

const createTransporter = () => {
  if (!hasSmtpConfig()) {
    return null;
  }

  const port = Number(process.env.SMTP_PORT || 587);

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

export const sendMail = async ({ to, subject, text, html }) => {
  const transporter = createTransporter();

  if (!transporter) {
    logger.warn("SMTP is not configured. Skipping actual send.");
    return { skipped: true };
  }

  try {
    return await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      text,
      html
    });
  } catch (error) {
    const message = String(error?.message || error);

    if (message.includes("535") || message.toLowerCase().includes("username and password not accepted")) {
      throw new Error(
        "SMTP authentication failed. For Gmail, SMTP_PASS must be a 16-character App Password with 2FA enabled, not your normal Gmail password."
      );
    }

    throw new Error(`SMTP send failed: ${message}`);
  }
};

export const isSmtpConfigured = () => hasSmtpConfig();