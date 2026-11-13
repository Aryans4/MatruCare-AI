
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { registerHackathon,getMyEntry } = require("../controllers/hackathonController");

router.post("/register", authMiddleware, registerHackathon);
router.get("/my-entry",authMiddleware,getMyEntry);

module.exports = router;
