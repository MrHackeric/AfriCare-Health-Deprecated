import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findByEmail(email);
    if (userExists.length > 0) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({ user: newUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findByEmail(email);
    if (user.length === 0) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Create and return JWT token
    const payload = {
      user: {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
      },
    };

    jwt.sign(
      payload,
      'africare-jwt',
    //   process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user[0].id,
            username: user[0].name,
            email: user[0].email,
          },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/users/logout
// @access  Public
export const logoutUser = async (req, res) => {
  try {
    req.user.token = req.user.token.filter(
      (tokenObj) => tokenObj.token !== req.token
    );
    await req.user.save();
    res.send({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).send({ error: "Failed to logout" });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile/:id
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    // Exclude password from the user object
    const { password, ...userWithoutPassword } = user[0];
    res.json(userWithoutPassword);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Update user profile
// @route   PUT /api/users/update/:id
// @access  Private
export const updateUserProfile = async (req, res) => {
  const { username, email } = req.body;

  try {
    let user = await User.findById(req.params.id);

    if (user.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    user = await User.update(req.params.id, { username, email });

    res.json({ msg: "Profile updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export default {
  updateUserProfile,
  getUserProfile,
  loginUser,
  registerUser,
  getAllUsers,
  logoutUser,
};
