/* eslint-disable */
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  FormControl,
  MenuItem,
  Select,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  Button,
  TextField,
  InputLabel,
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useNavigate } from "react-router-dom";

const roles = ["ROLE_TECHNICAL_AGENT", "ROLE_PSYCHOTECHNICAL_AGENT"];

const CreateAgent = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [state, setState] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (!fullName || !email || !password || !role) {
        setError("All fields are required.");
        return;
      }
      const namePattern = /^[A-Za-z\s]+$/;
      if (!namePattern.test(fullName)) {
        setError("Please enter a valid full name.");
        return;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        setError("Please enter a valid email address.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      const response = await axios.get(`auth/emailExist/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.exists) {
        setError("This email already exists. Please use a different email address.");
        return;
      }
      await axios.post("Agent", {
        fullName,
        email,
        role,
        password,
        state
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/agents");
    } catch (error) {
      console.error("Error adding agent:", error);
      setError("Error adding agent");
    }
  };
  const handleCancel = () => {
    navigate("/agents");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <MDTypography variant="h6" color="white">
                  Create Agent
                </MDTypography>
              </MDBox>

              <MDBox pt={3} px={1.5}>
                <form onSubmit={handleSubmit}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      variant="outlined"
                    />
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      variant="outlined"
                    />
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      variant="outlined"
                    />
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="Confirm Password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      variant="outlined"
                    />
                  </FormControl>

                  <FormControl component="fieldset">
                  <MDTypography variant="caption" fontSize={13.5} pt={2}> State :</MDTypography>
                    <RadioGroup
                      row
                      aria-label="status"
                      name="status"
                      value={state}
                      onChange={handleStateChange}
                    >
                      <FormControlLabel value={true} control={<Radio />} label="Active" />
                      <FormControlLabel value={false} control={<Radio />} label="Inactive" />
                    </RadioGroup>
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <InputLabel >Role</InputLabel>
                    <Select
                      labelId="role-label"
                      id="role"
                      value={role}
                      onChange={handleRoleChange}
                      label="Role"
                      alignItems="center"
                      sx={{
                        color: "#15192B",
                        width: "100%",
                        fontSize: "1.1rem",
                        paddingTop: "14px",
                      }}
                    >
                      {roles.map((role) => (
                        <MenuItem key={role} value={role}>
                          {role.split("_").join(" ")}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {error && (
                    <MDTypography variant="body2" color="error">
                      {error}
                    </MDTypography>
                  )}
                  <MDBox mb={2} mt={2} display="flex" justifyContent="flex-end">
                    <Button
                      sx={{
                        backgroundColor: "#ccc",
                        color: "#333",
                        marginRight: "8px",
                        "&:hover": {
                          backgroundColor: "#999",
                          color: "#fff",
                        },
                      }}
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      sx={{
                        backgroundColor: "#15192B",
                        color: "#fff",
                        marginLeft: "8px",
                        "&:hover": {
                          backgroundColor: "#3A4B8A",
                          color: "#fff",
                        },
                      }}
                      onClick={handleSubmit}
                    >
                      Add
                    </Button>
                  </MDBox>
                </form>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};

export default CreateAgent;
