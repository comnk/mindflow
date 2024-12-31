import React, { useState, useEffect } from "react";
import Navbar from '../../components/Nav/Navbar';
import "./Profile.css";

function Profile() {
    const [profile, setProfile] = useState({ name: "", email: "" });
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            const email = localStorage.getItem("email");
            console.log("Fetching profile for:", email);
    
            if (!email) {
                console.log("No email found. Please log in");
                return;
            }
    
            try {
                const response = await fetch("https://hackvortex4-project.onrender.com/api/profile", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                });
    
                if (response.ok) {
                    const data = await response.json();
                    console.log("Profile data:", data);
                    setProfile(data); // Update the profile state
                } else {
                    const error = await response.json();
                    console.error("Error fetching profile:", error.msg);
                }
            } catch (err) {
                console.error("Network error:", err);
            }
        };
    
        fetchProfile();
    }, []);        

    const handleUpdateName = async () => {
        const email = localStorage.getItem("email");

        try {
            const response = await fetch("https://hackvortex4-project.onrender.com/api/profile/update-name", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, name }),
            });

            if (response.ok) {
                setProfile((prev) => ({ ...prev, name }));
                setMessage("Name updated successfully.");
            } else {
                const errorData = await response.json();
                setMessage(errorData.msg || "Failed to update name.");
            }
        } catch (error) {
            setMessage("Error updating name: " + error.message);
        }
    };

    const handleUpdateEmail = async () => {
        const currentEmail = localStorage.getItem("email");

        try {
            const response = await fetch("https://hackvortex4-project.onrender.com/api/profile/update-email", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ currentEmail, newEmail: email }),
            });

            if (response.ok) {
                setProfile((prev) => ({ ...prev, email }));
                setMessage("Email updated successfully.");
            } else {
                const errorData = await response.json();
                setMessage(errorData.msg || "Failed to update email.");
            }
        } catch (error) {
            setMessage("Error updating email: " + error.message);
        }
    };

    const handleUpdatePassword = async () => {
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        const email = localStorage.getItem("email");

        try {
            const response = await fetch("https://hackvortex4-project.onrender.com/api/profile/update-password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, currentPassword, newPassword }),
            });

            if (response.ok) {
                setMessage("Password updated successfully.");
            } else {
                const errorData = await response.json();
                setMessage(errorData.msg || "Failed to update password.");
            }
        } catch (error) {
            setMessage("Error updating password: " + error.message);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="profile-container">
                <div className="content">
                    <h1>Profile Management</h1>
                    <p style={{ color: "green" }}>{message}</p>
                    <div>
                        <h3>Update Name</h3>
                        <p><strong>Current Name:</strong> {profile.name}</p>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="New Name"
                        />
                        <button onClick={handleUpdateName}>Update Name</button>
                    </div>
                    <div>
                        <h3>Update Email</h3>
                        <p><strong>Current Email:</strong> {profile.email}</p>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="New Email"
                        />
                        <button onClick={handleUpdateEmail}>Update Email</button>
                    </div>
                    <div>
                        <h3>Update Password</h3>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Current Password"
                        />
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New Password"
                        />
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm New Password"
                        />
                        <button onClick={handleUpdatePassword}>Update Password</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;