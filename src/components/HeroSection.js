import React from 'react';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h2>Safe Campus Initiative</h2>
        <p>Creating a safe, inclusive environment for all students. Report incidents anonymously and help us maintain a respectful campus community.</p>
        <div className="hero-actions">
          <button className="btn btn-primary">Report Incident</button>
          <a href="#anti-ragging-policy" className="learn-more">Learn more →</a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;