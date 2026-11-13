import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

// College options: update this list with the official participating colleges.
const collegeOptions = [
  "KCC Institute of Technology and Management",
  "Other"
];

const courseOptions = [
  "B.Tech",
  "M.Tech",
  "BCA",
  "MCA",
  "BSc",
  "Other"
];

const branchOptions = [
  "CSE",
  "IT",
  "ECE",
  "ME",
  "CE",
  "Other"
];

const yearOptions = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year"
];

const domainOptions = [
  "AI/ML",
  "Web Dev",
  "IoT",
  "Cyber Security",
  "Blockchain",
  "Other"
];

function HackathonRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    college: "",
    course: "",
    branch: "",
    year: "",
    domain: "",
    projectName: "",
    pptLink: "",
    prototypeLink: "",
    demoVideo: "",
    teamSize: "1",
    teamMembers: []
  });

  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Fetch authenticated user's email.
  useEffect(() => {
    const fetchProfile = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await API.get("/user/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const user = response.data.User || response.data.user;

        if (!user) {
          throw new Error("User profile not found");
        }

        setFormData((prev) => ({
          ...prev,
          email: user.email || ""
        }));
      } catch (error) {
        console.error("Profile loading error:", error);

        if (error.response?.status === 401) {
          sessionStorage.removeItem("token");
          navigate("/login");
        } else {
          setMessage("Unable to load your profile. Please try again.");
          setMessageType("error");
        }
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Handle normal form inputs.
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle team size and dynamic member fields.
  const handleTeamSize = (e) => {
    const size = Number(e.target.value);

    setFormData((prev) => ({
      ...prev,
      teamSize: String(size),
      teamMembers:
        size === 1
          ? []
          : Array.from(
              { length: size },
              (_, index) =>
                prev.teamMembers[index] || {
                  name: "",
                  email: ""
                }
            )
    }));
  };

  // Handle individual team member inputs.
  const handleMemberChange = (index, e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedMembers = [...prev.teamMembers];

      updatedMembers[index] = {
        ...updatedMembers[index],
        [name]: value
      };

      return {
        ...prev,
        teamMembers: updatedMembers
      };
    });
  };

  // Validate and submit registration.
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    // Full Name: minimum 3 characters, letters and spaces only.
    const nameRegex = /^[A-Za-z\s]+$/;

    if (
      formData.fullName.trim().length < 3 ||
      !nameRegex.test(formData.fullName.trim())
    ) {
      setMessage("Full Name must contain at least 3 letters and spaces only.");
      setMessageType("error");
      return;
    }

    // Mobile: valid 10-digit Indian number.
    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      setMessage("Enter a valid 10-digit Indian mobile number.");
      setMessageType("error");
      return;
    }

    // Project Name: minimum 5 characters.
    if (formData.projectName.trim().length < 5) {
      setMessage("Project Name must contain at least 5 characters.");
      setMessageType("error");
      return;
    }

    // Team member validation.
    for (const member of formData.teamMembers) {
      if (!member.name.trim() || !member.email.trim()) {
        setMessage("Please complete all team member details.");
        setMessageType("error");
        return;
      }
    }

    try {
      setLoading(true);

      const payload = {
        ...formData,
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        teamSize: Number(formData.teamSize)
      };

      const response = await API.post(
        "/hackathon/register",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage(
        response.data.message || "Registration successful!"
      );
      setMessageType("success");

    } catch (error) {
      console.error(
        "Hackathon registration error:",
        error.response?.data || error.message
      );

      setMessage(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
      setMessageType("error");

    } finally {
      setLoading(false);
    }
  };

  if (profileLoading) {
    return <div className="registration-container">Loading profile...</div>;
  }

  return (
    <div className="registration-container">
      <form
        className="registration-form"
        onSubmit={handleSubmit}
      >
        <h1>Hackathon Registration</h1>
        <p>Complete the form to register for MatruCare AI Hackathon.</p>

        {/* Personal Details */}
        <h3>Personal Details</h3>

        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          name="fullName"
          placeholder="Enter Full Name"
          value={formData.fullName}
          onChange={handleChange}
          minLength={3}
          pattern="[A-Za-z ]+"
          title="Enter at least 3 letters. Only letters and spaces are allowed."
          required
        />

        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          readOnly
          required
        />

        <label htmlFor="mobile">Mobile Number</label>
        <input
          id="mobile"
          type="tel"
          name="mobile"
          placeholder="Enter 10-digit Mobile Number"
          value={formData.mobile}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "").slice(0, 10);

            setFormData((prev) => ({
              ...prev,
              mobile: value
            }));
          }}
          inputMode="numeric"
          pattern="[6-9][0-9]{9}"
          title="Enter a valid 10-digit Indian mobile number."
          required
        />

        {/* Academic Details */}
        <h3>Academic Details</h3>

        <label htmlFor="college">College Name</label>
        <select
          id="college"
          name="college"
          value={formData.college}
          onChange={handleChange}
          required
        >
          <option value="">Select College</option>
          {collegeOptions.map((college) => (
            <option key={college} value={college}>
              {college}
            </option>
          ))}
        </select>

        <label htmlFor="course">Course</label>
        <select
          id="course"
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
        >
          <option value="">Select Course</option>
          {courseOptions.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>

        <label htmlFor="branch">Branch</label>
        <select
          id="branch"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          required
        >
          <option value="">Select Branch</option>
          {branchOptions.map((branch) => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </select>

        <label htmlFor="year">Year of Study</label>
        <select
          id="year"
          name="year"
          value={formData.year}
          onChange={handleChange}
          required
        >
          <option value="">Select Year of Study</option>
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {/* Project Details */}
        <h3>Project Details</h3>

        <label htmlFor="domain">Domain / Track</label>
        <select
          id="domain"
          name="domain"
          value={formData.domain}
          onChange={handleChange}
          required
        >
          <option value="">Select Domain / Track</option>
          {domainOptions.map((domain) => (
            <option key={domain} value={domain}>
              {domain}
            </option>
          ))}
        </select>

        <label htmlFor="projectName">Project Name</label>
        <input
          id="projectName"
          type="text"
          name="projectName"
          placeholder="Enter Project Name"
          value={formData.projectName}
          onChange={handleChange}
          minLength={5}
          required
        />

        <label htmlFor="pptLink">PPT Link</label>
        <input
          id="pptLink"
          type="url"
          name="pptLink"
          placeholder="Google Drive / OneDrive Shareable Link"
          value={formData.pptLink}
          onChange={handleChange}
          required
        />

        <label htmlFor="prototypeLink">Prototype Link</label>
        <input
          id="prototypeLink"
          type="url"
          name="prototypeLink"
          placeholder="GitHub / Figma / Live Demo Link"
          value={formData.prototypeLink}
          onChange={handleChange}
          required
        />

        <label htmlFor="demoVideo">Demo Video Link (Optional)</label>
        <input
          id="demoVideo"
          type="url"
          name="demoVideo"
          placeholder="YouTube / Google Drive Link"
          value={formData.demoVideo}
          onChange={handleChange}
        />

        {/* Team Details */}
        <h3>Team Details</h3>

        <label htmlFor="teamSize">Team Size</label>
        <select
          id="teamSize"
          name="teamSize"
          value={formData.teamSize}
          onChange={handleTeamSize}
          required
        >
          {[1, 2, 3, 4, 5].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        {/* Dynamic Team Member Fields */}
        {formData.teamMembers.map((member, index) => (
          <div className="team-member" key={index}>
            <h4>Team Member {index + 1}</h4>

            <label htmlFor={`memberName-${index}`}>
              Member Name
            </label>
            <input
              id={`memberName-${index}`}
              type="text"
              name="name"
              placeholder="Enter Member Name"
              value={member.name}
              onChange={(e) => handleMemberChange(index, e)}
              required
            />

            <label htmlFor={`memberEmail-${index}`}>
              Member Email
            </label>
            <input
              id={`memberEmail-${index}`}
              type="email"
              name="email"
              placeholder="Enter Member Email"
              value={member.email}
              onChange={(e) => handleMemberChange(index, e)}
              required
            />
          </div>
        ))}

        {/* Submission */}
        <button type="submit" disabled={loading}>
          {loading ? "Submitting Registration..." : "Submit Registration"}
        </button>

        {message && (
          <p
            role="alert"
            style={{
              marginTop: "15px",
              color: messageType === "success" ? "green" : "red"
            }}
          >
            {message}
          </p>
        )}

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          style={{
            marginTop: "12px",
            background: "#64748b"
          }}
        >
          Back to Dashboard
        </button>
      </form>
    </div>
  );
}

export default HackathonRegister;