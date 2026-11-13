import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent("Contact - MatruCare AI");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    window.location.href =
      `mailto:matrucareai@gmail.com?subject=${subject}&body=${body}`;

    setSuccess("Your email application is opening.");
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Contact Us</h2>
        <p>Get in touch with MatruCare AI.</p>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
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

        <textarea
  name="message"
  placeholder="Your Message"
  value={formData.message}
  onChange={handleChange}
  rows="5"
  required
  style={{
    width: "100%",
    display: "block",
    boxSizing: "border-box",
    padding: "13px",
    border: "1px solid #cbd5e1",
    borderRadius: "7px",
    fontSize: "15px",
    fontFamily: "Arial, sans-serif",
    resize: "vertical"
  }}
/>
        <button type="submit">Send Message</button>

        <p style={{ marginTop: "12px" }}>
        Email: matrucareai@gmail.com
        </p>

      </form>
    </div>
  );
}

export default Contact;