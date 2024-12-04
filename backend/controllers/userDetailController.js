// controllers/userDetailController.js
import User from "../models/user.js";
import UserDetail from "../models/userDetail.js";
import { getUserId } from "../utils/auth.js";
import jwt from "jsonwebtoken";

export const getUserDetails = async (req, res) => {
  const userId = getUserId(req); // Extracted via middleware or utility
  try {
    const userDetails = await UserDetail.findOne({ user: userId });
    if (!userDetails) {
      return res.status(404).json({ message: "User details not found" });
    }
    res.json(userDetails);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Failed to fetch user details" });
  }
};

export const updateUserDetails = async (req, res) => {
    const userId = getUserId(req); // Extracted via middleware or utility
    const { firstname, lastname, gender, imageUrl, favoritePet, preferredBreeds, servicesLookingFor } = req.body;
  
    try {
      const userDetails = await UserDetail.findOneAndUpdate(
        { user: userId },
        { firstname, lastname, gender, imageUrl, favoritePet, preferredBreeds, servicesLookingFor },
        { new: true, upsert: true }
      );
      res.json(userDetails);
    } catch (error) {
      console.error("Error updating user details:", error);
      res.status(500).json({ error: "Failed to update user details" });
    }
  };
  