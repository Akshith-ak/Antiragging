import React from 'react';
import image from './graduates.jpeg';
// Import icons from react-icons
import { FaUserSecret, FaTachometerAlt, FaBalanceScale } from 'react-icons/fa';

const AntiRaggingPolicy = () => {
  return (
    <section id="anti-ragging-policy" className="policy-section">
      <div className="policy-content">
        <h2>Anti-Ragging Policy</h2>
        <p>Our institution maintains a zero-tolerance policy towards ragging. We are committed to providing a safe, respectful environment for all students.</p>
        <ul className="policy-list">
          <li>
            <div className="policy-icon-wrapper anonymity">
              <FaUserSecret />
            </div>
            <div>
              <h4>Complete Anonymity</h4>
              <p>Your identity is never recorded or shared with anyone.</p>
            </div>
          </li>
          <li>
            <div className="policy-icon-wrapper response">
              <FaTachometerAlt />
            </div>
            <div>
              <h4>Quick Response</h4>
              <p>All reports are reviewed within 24 hours of submission.</p>
            </div>
          </li>
          <li>
            <div className="policy-icon-wrapper investigation">
              <FaBalanceScale />
            </div>
            <div>
              <h4>Fair Investigation</h4>
              <p>Each report is thoroughly investigated by trained professionals.</p>
            </div>
          </li>
        </ul>
      </div>
      <div className="policy-image">
        {/* Replace with your image path in the public folder */}
        <img src={image} alt="Graduates celebrating" />
      </div>
    </section>
  );
};

export default AntiRaggingPolicy;