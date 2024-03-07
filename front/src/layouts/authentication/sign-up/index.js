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
// react-router-dom components
import { Link } from "react-router-dom";
import { useState,   } from "react";
import axios from "axios";
// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate} from "react-router-dom";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function Cover() {

  const [errorMessage, setErrorMessage] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegistre = async (fullName, email, password) => {
    try {
      if (!fullName|| !email || !password ) {
        setErrorMessage("Please provide an email and password.");
        console.error("Email and password are required.");
        return;
      }
      const adminCheckResponse = await axios.get('http://localhost:4000/auth/chekAdmin');
      if (adminCheckResponse.data.exists) {
        setErrorMessage("An admin user already exists. You cannot register.");
        return;
      }
      const response = await axios.post('http://localhost:4000/auth/register', { fullName, email, password })
      if (response) {
        navigate("/authentication/sign-in", { replace: true });
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Error during login.");
    }
  }

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign Up
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="Name" variant="standard" fullWidth value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" variant="standard" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" variant="standard" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
            </MDBox>
            {/* <MDBox
                component="label"
                htmlFor="admin"
                display="flex"
                alignItems="center"
                sx={{ cursor: "pointer" }}
              >
                <Checkbox/>
                <MDTypography variant="button" fontWeight="regular" color="inherit" ml={0.5}>
                Adminastrateur
                </MDTypography>
              </MDBox>
             */}

            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={() => handleRegistre(fullName, email, password)}  >
                sign up
              </MDButton>
              <MDTypography variant="h6" fontWeight="regular" color="error" mt={1}>  {errorMessage && <div>{errorMessage}</div>}</MDTypography>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
