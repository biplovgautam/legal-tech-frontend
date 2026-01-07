import axios from 'axios';

// Create a centralized axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`,
  withCredentials: true, // IMPORTANT: Allows sending/receiving cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
