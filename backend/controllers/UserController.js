import User from "../models/UserModel.js";
import { auth as adminAuth } from "../firebase-admin.js";
import admin from 'firebase-admin'


// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => {
  const { firebaseUid, email, name } = req.body;
  console.log("Received registration request:", req.body);
 
  try {
    //verify firebasetoken
    const userRecord = await adminAuth.getUser(firebaseUid)
    if(!userRecord){
      return res.status(400).json({ message: "Invalid Firebase UID" })
    }
   
    // Store the user's Firebase UID and other details in your MySQL database
    const newUser = await User.create({
      firebaseUid,
      name,
      email,
      createdAt: new Date()
    });
    res.json({ user: newUser, msg: "User Registered succesfully" });
  } catch (err) {
    console.error("Error registering user:", err.message || err);
    res.status(500).send("Server Error");
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    const uid = decodedToken.uid;

    // Verify Firebase UID
    const userRecord = await adminAuth.getUser(uid);
    if (!userRecord) {
      return res.status(400).json({ message: "Invalid Firebase UID" });
    }

    // Fetch user from database
    const user = await User.findByFirebaseUID(uid);
    if (user.length === 0) {
      // User not found in database
      res.status(404).json({ msg: "User not found" });
      return;
    }

    const username = user[0].name;

    res.json({
      user: {
        uid,
        email: decodedToken.email,
        name: username,
      },
    });
  } catch (error) {
    console.error("Token verification Error:", error);
    res.status(401).json({ msg: "Unauthorized" });
  }
};

// @desc Sign In/Up with google
//route POST /api/users/google
// @access Public
export const googleSignIn = async (req, res) => {
  const { token } = req.body;
  try{
    //verify token
    const decodedToken = await adminAuth.verifyIdToken(token);
    const {uid, email, name, picture} = decodedToken;

    //check if user exists in database
    let user = await User.findByFirebaseUID(uid);
    if(!user){
      //create new user
      const newUser = await User.create({name,
         email,
          profilePicture: picture, 
          firebaseUID: uid,
        createdAt: new Date()
      });
    } else{
      //if exists update user info
      const updatedInfo= {email, name, profilePicture:picture};
      await User.updateByFirebaseUID(uid, updatedInfo);
    }
    res.json({msg: "Authenticated succesfully", newUser})
  } catch (err){
    console.error(err);
    res.status(500).json({msg: "Failoed to authenticate with google"});
  }
}

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Public
export const logoutUser = async (req, res) => {
  try {
    // Firebase token is provided by the client
    const { token } = req.body;

    const decodedToken = await adminAuth.verifyIdToken(token)
    const uid = decodedToken.uid;

    // Verify token and revoke it 
    await adminAuth.revokeRefreshTokens(uid); // Pass the uid instead of the token

    res.json({ msg: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ msg: "Failed to logout" });
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

export default { registerUser, loginUser, googleSignIn };
