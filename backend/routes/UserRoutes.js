import express from "express";
import authenticateUser from "../middleware/authenticateUser.js";
import {
  updateUserProfile,
  getUserProfile,
  loginUser,
  registerUser,
  getAllUsers,
  logoutUser,
  googleSignIn,
} from "../controllers/UserController.js";
const router = express.Router();
// Register User
router.post("/users/register", registerUser);

// Login User
router.post("/login/email", loginUser);
//google sign in
router.post("/b vusers/google-sign", googleSignIn)

// Fetch User Profile
router.get("/profile/:id", getUserProfile);

// Update User Profile
router.put("/update/:id", authenticateUser, updateUserProfile);

// Get All Users (Admin only)
router.get("/users/", getAllUsers);

// Logout route
router.post("/logout", logoutUser);

const app = express();
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export default router;
