// utils/auth.js
import jwt from "jsonwebtoken";

export const getUserId = (req) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return null;
  }
  try {
    const decodedToken = jwt.verify(token, "your-secret-key");
    return decodedToken.userId;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};