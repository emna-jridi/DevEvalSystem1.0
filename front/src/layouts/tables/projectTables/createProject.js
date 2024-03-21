/* eslint-disable */
import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  TextField,
  InputLabel,
} from "@mui/material";
import PageLayout from "examples/LayoutContainers/PageLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");

  const handleSubmit = async () => {
    try {
      if (!label || !description) {
        setError("All fields are required.");
        return;
      }

      const response = await axios.get(`http://localhost:4000/projectExists/${label}`);
      if (response.data.exists === true) {
        setError("This project already exists.");
        return;
      }
      console.log(label, description, "data");

      const repo = await axios.post(
        "http://localhost:4000/project",
        { label, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Created project:", repo.data);
      navigate("/tables/projectTables/projectTable");
    } catch (error) {
      console.error("Error adding Project :", error);
      setError("Error adding Project");
    }
  };
  const handleCancel = () => {
    navigate("/tables/projectTables/projectTable");
  };

  return (
    <PageLayout>
      <DashboardNavbar />
      <MDBox
        sx={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          margin: "0 auto",
          marginTop: "50px",
          marginBottom: "20px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          width: "100%",
        }}
      >
        <MDTypography
          variant="h5"
          align="center"
          mb={3}
          sx={{
            backgroundColor: "#313852",
            color: "#FFFFFF",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          Add New Project
        </MDTypography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
            />
          </FormControl>

          {error && (
            <MDTypography variant="body2" color="error">
              {error}
            </MDTypography>
          )}
          <MDBox mt={2} display="flex" justifyContent="flex-end">
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
    </PageLayout>
  );
};

export default CreateProject;
