import mongoose from "mongoose";

const userDetailSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"], // Optional: Restrict to specific values
    required: true,
  },
  imageUrl: { type: String, default: "/default-avatar.png" },
  favoritePet: {
    type: String,
    trim: true,
  },
  preferredBreeds: [
    {
      type: String,
    },
  ],
  servicesLookingFor: [
    {
      type: String,
    },
  ],
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const UserDetail = mongoose.model("UserDetail", userDetailSchema);

export default UserDetail;
