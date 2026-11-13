import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function VerifyOTP() {
  const navigate = useNavigate();

  const [email] = useState(
    sessionStorage.getItem("verificationEmail") || ""
  );

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      setLoading(true);

      const response = await API.post("/auth/verify-otp", {
        email,
        otp
      });

      setMessage(response.data.message || "Email verified successfully!");
      sessionStorage.removeItem("verificationEmail");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      setMessage(
        error.response?.data?.message || "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setMessage("");

      const response = await API.post("/auth/resend-otp", {
        email
      });

      setMessage(response.data.message || "New OTP sent successfully!");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Unable to resend OTP"
      );
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleVerify}>
        <h2>Verify Your Email</h2>

        <p>Enter the 6-digit OTP sent to {email}</p>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
          }
          maxLength="6"
          required
        />

        <button type="submit" disabled={loading || otp.length !== 6}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <button
          type="button"
          onClick={handleResendOTP}
          style={{ marginTop: "12px" }}
        >
          Resend OTP
        </button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default VerifyOTP;