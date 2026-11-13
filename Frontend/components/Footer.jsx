import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-company">
          <h2>MatruCare AI</h2>
          <p>Full Stack Developer Internship Programme</p>
          <p>
            Email:{" "}
            <a href="mailto:matrucareai@gmail.com">
              matrucareai@gmail.com
            </a>
          </p>
        </div>

        <div className="footer-navigation">
          <h3>Quick Navigation</h3>
          <Link to="/">Home</Link>
          <Link to="/#about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>

        <div className="footer-social">
          <h3>Social Links</h3>
          {/* Add official company social URLs when provided */}
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} MatruCare AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;