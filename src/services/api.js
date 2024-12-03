import axios from "axios";

// Set the base URL for your backend
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Your backend base URL
});

// // Helper function to get JWT token from localStorage
// const getAuthToken = () => {
//   return localStorage.getItem("token"); // Assuming the token is stored in localStorage after login
// };

// // Intercept requests to include Authorization header (for token-based authentication)
// API.interceptors.request.use(
//   (config) => {
//     const token = getAuthToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Fetch all forum threads
export const fetchForumThreads = async () => {
  try {
    const response = await API.get("/forumsThreads");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching threads: " + error.message);
  }
};

// Create a new forum thread
export const createForumThread = async (threadData) => {
  try {
    const response = await API.post("/forumsThreads/create", threadData);
    return response.data;
  } catch (error) {
    throw new Error("Error creating thread: " + error.message);
  }
};

// Reply to a specific forum thread
export const replyToForumThread = async (threadId, replyData) => {
  try {
    const response = await API.post(`/forumsThreads/${threadId}/reply`, replyData);
    return response.data;
  } catch (error) {
    throw new Error("Error replying to thread: " + error.message);
  }
};

// Add tags to a specific forum thread
export const addTagsToThread = async (threadId, tags) => {
  try {
    const response = await API.patch(`/forumsThreads/${threadId}/tags`, { tags });
    return response.data;
  } catch (error) {
    throw new Error("Error adding tags to thread: " + error.message);
  }
};

// Search forum threads by query
export const searchForumThreads = async (query) => {
  try {
    const response = await API.get("/forumsThreads/search", {
      params: { query },
    });
    return response.data; // Return the search results
  } catch (error) {
    throw new Error("Error searching threads: " + error.message);
  }
};

// Fetch specific thread details
export const fetchThreadDetails = async (threadId) => {
  try {
    const response = await API.get(`/forumsThreads/${threadId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching thread details: " + error.message);
  }
};

export default API;
