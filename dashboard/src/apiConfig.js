// Central API Base URL Configuration
// In development, communicates with localhost:3002
// In production / Vercel, communicates with relative '/api' serverless routes

const isLocalhost =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '[::1]');

export const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (isLocalhost && window.location.port !== '3002'
    ? 'http://localhost:3002/api'
    : '/api');

export default API_BASE_URL;
