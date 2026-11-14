const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbConnect = require("./config/db");
const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoutes");
const hackathonRoute = require("./routes/hackathonRoute");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/hackathon", hackathonRoute);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

dbConnect();
