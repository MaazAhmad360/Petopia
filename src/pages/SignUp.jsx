import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../AxioInstance";
import image from '../assets/pet.jpg';
import UserDetailsModal from "../components/UserDetailsModal"; // Import the modal
import './Login.css';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    });

    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/user/register", formData);
            if (response.status === 201) {
                // User successfully registered
                console.log("User registered successfully");
                setShowModal(true); // Show modal for additional details
            } else {
                console.error("Failed to register user");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleModalClose = () => {
        setShowModal(false); // Close the modal
        navigate('/login'); // Redirect to login after modal is closed
    };

    return (
        <React.Fragment>
            <div className="signup login">
                <div className="signupForm loginForm">
                    <h1>Create an Account</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="signupWrapper loginWrapper">
                            <div className="inputWrapper">
                                <input
                                    type="text"
                                    className="primary"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    className="primary"
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                                <input
                                    type="email"
                                    className="primary"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <input
                                    type="password"
                                    className="primary"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <button type="submit" className="button secondary">Register</button>
                        </div>
                    </form>
                </div>
                <div className="imageContainer">
                    <img src={image} alt="Pet"></img>
                </div>
            </div>

            {/* User Details Modal */}
            {showModal && <UserDetailsModal onClose={handleModalClose} />}
        </React.Fragment>
    );
};

export default SignUp;
