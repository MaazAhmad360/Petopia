import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../AxioInstance";
import UserDetailsModal from "../components/UserDetailsModal"; // Import the modal
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [token, setToken] = useState(null); // Store token for further API calls

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Step 1: Log the user in
            const response = await axios.post("/api/user/login", formData);
            if (response.status === 200) {
                console.log("Login successful");
                const userToken = response.data.token;

                // Save token to state and localStorage
                setToken(userToken);
                localStorage.setItem("token", userToken);

                // Step 2: Check if user details exist
                await checkUserDetails(userToken);
            } else {
                console.error("Login failed");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    const checkUserDetails = async (userToken) => {
        try {
            const response = await axios.get("/api/user/details", {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            if (!response.data || Object.keys(response.data).length === 0) {
                console.log("User details missing. Showing modal.");
                setShowModal(true); // Show modal if user details are missing
            } else {
                console.log("User details exist. Redirecting to homepage.");
                navigate("/"); // Redirect to homepage
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log("User details not found. Showing modal.");
                setShowModal(true); // Show modal if details not found
            } else {
                console.error("Error checking user details:", error);
            }
        }
    };

    const handleModalClose = () => {
        setShowModal(false); // Close the modal
        navigate("/"); // Redirect to homepage
    };

    return (
        <div className="login">
            <div className="loginForm">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="inputWrapper">
                        <input
                            type="email"
                            className="primary"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            className="primary"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="button secondary">Login</button>
                </form>
            </div>

            {/* User Details Modal */}
            {showModal && (
                <UserDetailsModal
                    onClose={handleModalClose} // Close modal and redirect
                />
            )}
        </div>
    );
};

export default Login;
