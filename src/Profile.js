import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "./MyContext";

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
            const token = localStorage.getItem("token");
            const response = await fetch("https://hackvortex4-project.onrender.com/api/profile", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              const data = await response.json();
              setProfile({ name: data.name, email: data.email });
        };
        fetchProfile();
    }, []);

    const handleUpdateName = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch("https://hackvortex4-project.onrender.com/api/profile/update-name", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: name }),
        });
    
        if (response.ok) {
          setProfile((prev) => ({ ...prev, name: name }));
          setMessage("Name updated successfully.");
        } else {
          setMessage("Failed to update name.");
        }
    };
    
    const handleUpdateEmail = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch("https://hackvortex4-project.onrender.com/api/profile/update-email", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email: email }),
        });
    
        if (response.ok) {
          setProfile((prev) => ({ ...prev, email: email }));
          setMessage("Email updated successfully.");
        } else {
          setMessage("Failed to update email.");
        }
    };
    
    const handleUpdatePassword = async () => {
        if (newPassword !== confirmPassword) {
          setMessage("Passwords do not match.");
          return;
        }
    
        const token = localStorage.getItem("token");
        const response = await fetch("https://hackvortex4-project.onrender.com/api/profile/update-password", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ currentPassword, newPassword }),
        });
    
        if (response.ok) {
          setMessage("Password updated successfully.");
        } else {
          setMessage("Failed to update password.");
        }
    };

    return (
        <div>
            <h1>Profile Management</h1>
            <p style={{ color: "green" }}>{message}</p>
            <div>
                <h3>Update Name</h3>
                <p>Current Name: {profile.name}</p>
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
                <p>Current Email: {profile.email}</p>
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
    )
}

export default Profile;