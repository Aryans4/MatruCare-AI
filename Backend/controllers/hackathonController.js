const Hackathon = require("../models/hackathon");
const User = require("../models/user");
const { sendMail } = require("../config/mailer");

const registerHackathon = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {
      fullName,
      email,
      mobile,
      college,
      course,
      branch,
      year,
      domain,
      projectName,
      pptLink,
      prototypeLink,
      demoVideo,
      teamSize,
      teamMembers,
    } = req.body;

    if (
      !fullName || !email || !mobile || !college ||
      !course || !branch || !year || !domain ||
      !projectName || !pptLink || !prototypeLink ||
      !teamSize
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const user = await User.findById(userId);
    if (!user || !user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Verified user account required",
      });
    }

    const existingRegistration = await Hackathon.findOne({ user: userId });
    if (existingRegistration) {
      return res.status(409).json({
        success: false,
        message: "You have already registered",
      });
    }

    const size = Number(teamSize);
    if (!Number.isInteger(size) || size < 1 || size > 5) {
      return res.status(400).json({
        success: false,
        message: "Team size must be between 1 and 5",
      });
    }

    const expectedMembers = size === 1 ? 0 : size;
    if (!Array.isArray(teamMembers) || teamMembers.length !== expectedMembers) {
      return res.status(400).json({
        success: false,
        message: "Invalid number of team member entries",
      });
    }

    const registration = await Hackathon.create({
      user: userId,
      fullName,
      email,
      mobile,
      college,
      course,
      branch,
      year,
      domain,
      projectName,
      pptLink,
      prototypeLink,
      demoVideo: demoVideo || "",
      teamSize: size,
      teamMembers,
    });

    let emailSent = true;
    try {
      await sendMail({
        to: registration.email,
        subject: "MatruCare AI - Hackathon Registration Confirmation",
        html: `
          <h2>MatruCare AI</h2>
          <p>Thank you for registering for the hackathon, ${registration.fullName}!</p>
          <p>Your project: ${registration.projectName}</p>
          <p>We look forward to seeing your submission.</p>
        `,
      });
    } catch (emailError) {
      emailSent = false;
      console.error("Confirmation email failed:", emailError.message);
    }

    return res.status(201).json({
      success: true,
      message: "Hackathon registration successful",
      registration,
    });
  } catch (error) {
    console.error("Hackathon registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getMyEntry = async (req, res) => {
  try {
    const userId = req.user.userId;
    const registration = await Hackathon.findOne({
      user: userId,
    }).select("-__v");

    if (!registration) {
      return res.status(404).json({
        success: false,
        registered: false,
        message: "No hackathon registration found",
      });
    }

    return res.status(200).json({
      success: true,
      registered: true,
      message: "Registration details fetched successfully",
      registration,
    });
  } catch (error) {
    console.error("Get registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { registerHackathon, getMyEntry };
