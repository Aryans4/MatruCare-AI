import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      try {
        // Fetch user profile
        const userResponse = await API.get("/user/me", config);

        setUser(
          userResponse.data.User || userResponse.data.user
        );

        // Fetch hackathon registration
        try {
          const registrationResponse = await API.get(
            "/hackathon/my-entry",
            config
          );

          if (registrationResponse.data.registered) {
            setRegistration(registrationResponse.data.registration);
          }
        } catch (registrationError) {
          if (registrationError.response?.status !== 404) {
            throw registrationError;
          }
        }

      } catch (err) {
        console.error("Dashboard error:", err);

        if (err.response?.status === 401) {
          sessionStorage.removeItem("token");
          navigate("/login");
        } else {
          setError("Unable to load dashboard. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return <h2 style={{ padding: "30px" }}>Loading Dashboard...</h2>;
  }

  if (error) {
    return <div style={{ padding: "30px" }}>{error}</div>;
  }

  return (
    <div className="signup-container">
      <div className="signup-form">

        <h2>Welcome, {user?.fullName || "User"}!</h2>

        <p>Email: {user?.email}</p>

        <p>
          Account Status: {user?.isVerified ? "Verified" : "Not Verified"}
        </p>

        <hr style={{ margin: "20px 0" }} />

        {registration ? (
          <>
            <h3>Hackathon Registration Details</h3>

            <p>Project Name: {registration.projectName}</p>
            <p>Domain: {registration.domain}</p>
            <p>Team Size: {registration.teamSize}</p>
            <p>College: {registration.college}</p>

            <p style={{ color: "green", marginTop: "15px" }}>
              Registration Successful!
            </p>
          </>
        ) : (
          <>
            <h3>Hackathon Registration</h3>

            <p>You haven't registered for the hackathon yet.</p>

            <button
              onClick={() => navigate("/hackathon-register")}
            >
              Register Now
            </button>
          </>
        )}

        <button
          onClick={handleLogout}
          style={{
            marginTop: "15px",
            background: "#dc2626"
          }}
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Dashboard;