import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-page">
      <section className="hero-section">
        <h1>MatruCare AI Hackathon</h1>
        <p>
          Welcome to the MatruCare AI Hackathon.
          Explore the event and register to participate.
        </p>

        <div className="hero-buttons">
          <Link to="/signup">Register Now</Link>
          <Link to="/login">Login</Link>
        </div>
      </section>

<section id="about" className="about-section">
  <div className="about-container">
    <div className="about-content">
      <span className="section-tag">ABOUT US</span>
      <h2>About MatruCare AI</h2>
      <p>
        MatruCare AI brings participants together through its
        Hackathon and Internship Programme.
      </p>
      <p>
        This platform allows participants to create accounts,
        verify their email addresses, log in, and register for
        the hackathon.
      </p>
    </div>

    <div className="about-card">
      <h3>MatruCare AI</h3>
      <p>Hackathon & Internship Programme</p>
    </div>
  </div>
</section>

      {/* Event Highlights */}
      <section className="event-highlights">
        <h2>Event Highlights</h2>
        <p>Event highlights will be announced soon.</p>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <h2>About</h2>
        <p>
          Learn more about the MatruCare AI Hackathon.
          Additional event information will be announced soon.
        </p>
      </section>

      {/* Hackathon Timeline */}
      <section className="timeline-section">
        <h2>Hackathon Timeline</h2>
        <p>Event dates and schedule will be announced soon.</p>
      </section>

      {/* Prizes */}
      <section className="prizes-section">
        <h2>Prizes</h2>
        <p>Prize details will be announced soon.</p>
      </section>

    </main>
  );
}

export default Home;