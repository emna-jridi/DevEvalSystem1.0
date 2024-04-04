/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
/* eslint-disable */
import { useState, useEffect } from "react";
import axios from "axios";
// react-router-dom components
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import MDAlert from "components/MDAlert";

function Basic() {
  const [errorMessage, setErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 


  const handleLogin = async (email, password) => {
    try {
      if (!email || !password) {
        setErrorMessage("Please provide an email and password.");
        console.error("Email and password are required.");
        return;
      }
      const response = await axios.post('auth/login', { email, password });
      console.log("Authentification réussie :", response.data.accessToken)


      if (response.data && response.data.accessToken) {
        navigate("/dashboard", { replace: true});
        localStorage.setItem('accessToken', response.data.accessToken)
      } 
      
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Incorrect email or password.");
      if (error.response && error.response.status === 401) {
      setErrorMessage("An error occurred while attempting to login.");
    } else {
      setErrorMessage("An error occurred while attempting to login. ");
    }
    }
  }

  return (
    <BasicLayout >
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
            </MDBox>
            <MDBox display="flex" alignItems="center" justifyContent="flex-end" ml={-1}>
              <MDTypography
                 variant="h6"
                fontWeight="regular"
                color="text"
                mt={1}
              
              >
              <Link to="/authentication/reset-password" >Forgot Password ?</Link> 
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={() => handleLogin(email, password)}>
                sign in
              </MDButton>
              <MDTypography variant="h6" fontWeight="regular" color="error" mt={1}>  {errorMessage &&<div>{errorMessage}</div>}</MDTypography>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
             
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
