const user = require("../models/user");
const bcrypt = require("bcrypt");
const generateOTP = require("../utils/generateOTP");
const { sendOtp } = require("../config/mailer");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Required",
      });
    }
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User Already Exists",
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const newUser = await user.create({
      fullName,
      email,
      password: hash,
      otp,
      otpExpiresAt,
    });
    await sendOtp(email, otp);
    return res.status(201).json({
      success: true,
      message: "User Created Successfully",
      userID: newUser._id,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "User not Registered",
      });
    }
    const userFound = await user.findOne({ email });
    if (!userFound) {
      return res.status(404).json({
        success: false,
        message: "User Already Exists",
      });
    }
    if (userFound.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Account is Already Verified",
      });
    }
    if (!userFound.otp || !userFound.otpExpiresAt) {
      return res.status(400).json({
        success: false,
        message: "Please Provide An Otp",
      });
    }
    if (userFound.otpExpiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Otp Expired.Request a new otp",
      });
    }
    if (userFound.otp !== String(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid otp",
      });
    }
    userFound.isVerified = true;
    userFound.otp = null;
    userFound.otpExpiresAt = null;
    await userFound.save();
    return res.status(200).json({
      success: true,
      message: "User Verified",
      user: userFound,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email not found",
      });
    }
    const userFound = await user.findOne({ email });
    if (!userFound) {
      return res.status(404).json({
        success: false,
        message: "User Not Registered",
      });
    }
    if (userFound.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User Already Verified",
      });
    }
    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    userFound.otp = otp;
    userFound.otpExpiresAt = otpExpiresAt;
    await userFound.save();
    await sendOtp(email, otp);
    return res.status(200).json({
      success: true,
      message: "New Otp Sent Successfully",
    });
  } catch (err) {
    console.log("otp resend error", err.message);
    return res.status(500).json({
      success: false,
      message: "internal Server Error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Enter Credentials",
      });
    }
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User Not Exists",
      });
    }
    if (!existingUser.isVerified) {
      return res.status(403).json({
        success: false,
        message: "User Already Verified",
      });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { signup, verifyOtp, resendOtp, login };
