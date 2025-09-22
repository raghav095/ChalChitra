// src/api/axios.js

import axios from 'axios';

// Get the backend URL from the environment variables
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true // This is the magic line!
});