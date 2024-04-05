/* eslint-disable */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const handleLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
const logout = async () => {
            try {
                // Call the logout API
                await axios.post("/logout",{
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });

        // Remove the authentication token
        localStorage.removeItem("accessToken");

        // Redirect the user to the login page
        navigate("/authentication/sign-in");
            } catch (error) {
                console.error("Error during logout:", error);
            }
        };

        // Call the logout function
        logout();
    }, [navigate]);

   // Return null since this component doesn't render anything
    return null;
};

export default handleLogout;