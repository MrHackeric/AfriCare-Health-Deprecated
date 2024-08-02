import { auth } from "../firebase-admin.js"; // Import Firebase auth

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify Firebase token
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken; // Attach user info to request
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default verifyToken;
