const user = require("../models/user");

const getMe = async (req, res) => {
  try {
    const foundUser = await user.findById(req.user.userId).select("-password -otp -otpExpiresAt");
    if (!foundUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User fetched Successfully",
      User: foundUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { getMe };
