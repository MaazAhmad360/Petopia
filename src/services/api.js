import axios from '../AxioInstance'

// Fetch all forum threads
export const fetchForumThreads = async () => {
  try {
    const response = await axios.get("/api/forumsThreads");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching threads: " + error.message);
  }
};

// Create a new forum thread
export const createForumThread = async (threadData) => {
  try {
    const response = await axios.post("/api/forumsThreads/create", threadData);
    return response.data;
  } catch (error) {
    throw new Error("Error creating thread: " + error.message);
  }
};

// Reply to a specific forum thread
export const replyToForumThread = async (threadId, replyData) => {
  try {
    const response = await axios.post(`/api/forumsThreads/${threadId}/reply`, replyData);
    return response.data;
  } catch (error) {
    throw new Error("Error replying to thread: " + error.message);
  }
};

// Add tags to a specific forum thread
export const addTagsToThread = async (threadId, tags) => {
  try {
    const response = await axios.patch(`/api/forumsThreads/${threadId}/tags`, { tags });
    return response.data;
  } catch (error) {
    throw new Error("Error adding tags to thread: " + error.message);
  }
};

// Search forum threads by query
export const searchForumThreads = async (query) => {
  try {
    const response = await axios.get("/api/forumsThreads/search", {
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
    const response = await axios.get(`/api/forumsThreads/${threadId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching thread details: " + error.message);
  }
};

export const fetchUserDetails = async () => {
  const response = await axios.get("/api/user/details");
  return response.data;
};

export const updateUserDetails = async (details) => {
  const response = await axios.put("/api/user/details", details);
  return response.data;
};

export default axios;
