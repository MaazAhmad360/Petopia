import axios from 'axios';

// Set up the base URL using environment variables
axios.defaults.baseURL = `http://localhost:${import.meta.env.REACT_APP_PORT || 5000}`;


// Function to set up Axios interceptor
const setupAxiosInterceptors = () => {
    // Add a request interceptor
    axios.interceptors.request.use(
        (config) => {
            // Get token from localStorage
            const token = localStorage.getItem('token');
            // If token exists, set Authorization header with token
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};

// Call the function to set up Axios interceptor
setupAxiosInterceptors();

export default axios;
