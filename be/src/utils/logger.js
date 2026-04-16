const isDev = process.env.NODE_ENV !== "production" || !process.env.NODE_ENV;

export const logger = {
  info: (...args) => {
    if (isDev) console.log("[info]", ...args);
  },
  warn: (...args) => {
    if (isDev) console.warn("[warn]", ...args);
  },
  error: (...args) => {
    if (isDev) console.error("[error]", ...args);
  }
};