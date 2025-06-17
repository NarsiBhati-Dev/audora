export const generateTokenExpiresAt = (hours = 1) => {
  const expiresInMs = hours * 60 * 60 * 1000; // 1 hour
  const tokenExpiresAt = new Date(Date.now() + expiresInMs);

  return { tokenExpiresAt };
};
