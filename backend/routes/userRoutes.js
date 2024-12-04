import express from 'express';
import { getUserDetails, updateUserDetails } from "../controllers/userDetailController.js"
import { registerUser, loginUser, addUserDetails } from "../controllers/userController.js";

const router = express.Router();

// Route to register a new user
router.post("/register", registerUser);

// Route to login a user
router.post("/login", loginUser);

// Route to add user details
router.post("/details", addUserDetails);

//router.get('/', getAllUsers);

router.get("/details", getUserDetails);
router.put("/details", updateUserDetails);

export default router;
