// API configuration and base setup
import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  params: {
    api_key: API_KEY,
  },
  timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log('Making API request:', config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
