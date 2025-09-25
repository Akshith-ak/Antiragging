// frontend/src/apiConfig.js

// This line checks if the app is running in "production" mode (when deployed).
// If it is, it uses your live Render URL.
// If not (when you're running `npm start` locally), it uses your localhost URL.
const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://antiragging-backend.onrender.com'
  : 'http://localhost:5000';

export default API_URL;