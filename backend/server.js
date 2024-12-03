import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Import route files
import userRoutes from "./routes/userRoutes.js";
import petRoutes from "./routes/petRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import vetRoutes from "./routes/vetRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import forumThreadsRoutes from "./routes/forumThreadsRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// API routes
app.use("/api/user", userRoutes);
app.use("/api/pet", petRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/vet", vetRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/forumThreads", forumThreadsRoutes);
app.use("/api/review", reviewRoutes);
