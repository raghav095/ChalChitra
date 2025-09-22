import axios from 'axios';

const api = axios.create({
  // This will use your Vercel variable in production and your proxy in development
  baseURL: import.meta.env.VITE_BACKEND_URL || '', 
  withCredentials: true,
});

export default api;