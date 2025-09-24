import React from 'react';

const ImmediateHelp = () => {
  return (
    <section className="help-section">
      <h3>Need Immediate Help?</h3>
      <p>If you're in immediate danger, please contact campus security or local emergency services.</p>
      <div className="help-contacts">
        <div className="contact-item">
          <span className="contact-label emergency">Emergency</span>
          <span className="contact-number">911</span>
        </div>
        <div className="contact-item">
          <span className="contact-label security">Campus Security</span>
          <span className="contact-number">(555) 123-4567</span>
        </div>
        <div className="contact-item">
          <span className="contact-label support">Student Support</span>
          <span className="contact-number">(555) 123-4568</span>
        </div>
      </div>
    </section>
  );
};

export default ImmediateHelp;