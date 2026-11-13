import { useState } from "react";
import API from "../services/api";
import {useNavigate} from "react-router-dom";

function Signup() {
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const { confirmPassword, ...signupData } = formData;

      const response = await API.post("/auth/signup", signupData);

      sessionStorage.setItem("verificationEmail", formData.email);
      navigate("/verify-otp");

    }catch (error) {
  console.error("Signup Error:", error);

  console.log("Backend response:", error.response?.data);
  console.log("Status:", error.response?.status);

  setMessage(
    error.response?.data?.message ||
    error.message ||
    "Signup failed. Please try again."
  );
}
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <p>Join MatruCare AI Hackathon</p>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default Signup;