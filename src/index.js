// frontend/src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// Import the Router here. We use HashRouter for GitHub Pages compatibility.
import { HashRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* This is the single, top-level Router for your entire application */}
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);