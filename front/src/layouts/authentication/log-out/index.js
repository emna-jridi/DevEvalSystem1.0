/* eslint-disable */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const handleLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Remove the authentication token
        localStorage.removeItem('accessToken');
        // Redirect the user to the login page
        navigate('/authentication/sign-in');
    }, []);

   
    return null;
};

export default handleLogout;