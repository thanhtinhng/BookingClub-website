export const validatePassword = (password) => {
  if (password.length < 8) return false;

  let count = 0;
  if (/[a-z]/.test(password)) count++;
  if (/[A-Z]/.test(password)) count++;
  if (/[0-9]/.test(password)) count++;
  if (/[^A-Za-z0-9]/.test(password)) count++;

  return count >= 3;
};
