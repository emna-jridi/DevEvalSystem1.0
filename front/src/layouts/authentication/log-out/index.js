/* eslint-disable */

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutComponent = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Remove the authentication token
        localStorage.removeItem('accessToken');
        // Redirect the user to the login page
        navigate('/authentication/sign-in');
    }, []);

    // This component can be empty as it will handle logout and redirection automatically
    return null;
};

export default LogoutComponent;
