import axios from 'axios';

// Create a centralized axios instance
const api = axios.create({
  // Use relative URL to force request through Next.js Rewrites (Proxy)
  // This makes the browser treat cookies as first-party
  baseURL: "/api/v1",
  withCredentials: true, // IMPORTANT: Allows sending/receiving cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
