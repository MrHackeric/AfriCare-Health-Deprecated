import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.user.id);

    if (user.length === 0) {
      throw new Error();
    }

    req.token = token;
    req.user = user[0];
    next();
  } catch (error) {
    res
      .status(401)
      .send({ error: "Authentication failed. Please authenticate." });
  }
};

export default authenticateUser;
