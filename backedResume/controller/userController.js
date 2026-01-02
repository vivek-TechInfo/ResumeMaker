import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import Resume from "../models/Resume.js";

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
};

// POST:/api/users/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if ((!name, !email, !password)) {
      return res.status(400).json({
        message: "Please fill the required fields",
        success: false,
      });
    }

    // check the exit user

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exits",
        success: false,
      });
    }

    // excrypt the password

    const salt = 10;

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("newUser", newUser);

    // token

    const token = generateToken(newUser._id);

    newUser.password = undefined;

    return res.status(201).json({
      message: "User created successfully",
      token,
      user: newUser,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
    });
  }
};

// user login
// api/users/login

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if ((!email, !password)) {
      return res.status(400).json({
        message: "Please fill the required fields",
        success: false,
      });
    }

    // check the exit user

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false,
      });
    }


    const token = generateToken(user._id);
    user.password = undefined;

    return res.status(200).json({
      message: "User login successfully",
      token,
      user,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
    });
  }
};

// controller for getting user by id
//GET:/api/users/data

export const getUserById = async (req, res) => {
  try {
    const userId = req.userId;

    // check user exist or not

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // user.password
    user.password = undefined;

    return res.status(200).json({
      success: true,
      message: "User Data",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || error,
    });
  }
};

// controller for getting user resume/
//GET: /api/users/resumes

export const getUserResumes = async (req, res) => {
  try {

    const userId = req.userId

    // return user resumes

    const resumes = await Resume.find({userId})

    return res.status(200).json({
      message:"get all resume",
      success:true,
      resumes
    })

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || error,
    });
  }
};
