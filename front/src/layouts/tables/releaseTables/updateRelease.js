/* eslint-disable */
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import {
  FormControl,
  RadioGroup,
  MenuItem,
  Button,
  Select,
  TextField,
  InputLabel,
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { formatDate } from "../utils";

const UpdateRelease = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setstart_date] = useState(new Date());
  const [end_date, setEnd_date] = useState(new Date());
  const [projects, setProjects] = useState([]);
  const [id, setId] = useState("");
  const [code, setCode] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    if (location.state) {
      const { id, code, name, description, start_date, end_date, project } = location.state;
      setId(id);
      setCode(code);
      setName(name);
      setDescription(description);
      setstart_date(start_date);
      setEnd_date(end_date);
      setSelectedProject(project);
    }
    fetchData();
  }, [location]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const projectsData = response.data.Projects.map((project) => project.label);

      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (!name || !description || !start_date || !end_date || !code) {
        setError("All fields are required.");
        return;
      }
      if (end_date <= start_date) {
        setError("End date must be after the start date.");
        return;
      }
      await axios.put(
        `release/${id}`,
        {
          code,
          name,
          description,
          start_date,
          end_date,
          assignedProject: {
            label: selectedProject,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/release");
    } catch (error) {
      console.error("Error adding agent:", error);
    }
  };
  const handleCancel = () => {
    navigate("/release");
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
                  Edit Release
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={1.5}>
                <form onSubmit={handleSubmit}>
                  <MDBox display="flex" width="100%">
                    <FormControl fullWidth margin="normal" sx={{ marginRight: "16px" }}>
                      <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant="outlined"
                      />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                      <TextField
                        label="Code "
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        variant="outlined"
                      />
                    </FormControl>
                  </MDBox>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      variant="outlined"
                      rows={4}
                      multiline
                    />
                  </FormControl>
                  <MDBox display="flex" width="100%">
                    <FormControl fullWidth margin="normal" sx={{ marginRight: "16px" }}>
                      <TextField
                        label="Start Date"
                        type="date"
                        value={formatDate(start_date)}
                        onChange={(e) => setstart_date(new Date(e.target.value))}
                        fullWidth
                        style={{ marginTop: "8px" }}
                      />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                      <TextField
                        label="End Date"
                        type="date"
                        value={formatDate(end_date)}
                        onChange={(e) => setEnd_date(new Date(e.target.value))}
                        fullWidth
                        style={{ marginTop: "8px" }}
                      />
                    </FormControl>
                  </MDBox>
                  <MDBox display="flex" width="50%">
                    <FormControl fullWidth margin="normal" sx={{ marginRight: "8px" }}>
                      {/* <MDBox mb={2}>
                      <MDTypography variant="h6"> Project :</MDTypography>
                    </MDBox> */}
                      <InputLabel>Project</InputLabel>
                      <Select
                        labelId="project-label"
                        id="project"
                        value={selectedProject}
                        onChange={handleProjectChange}
                        label="Project"
                        sx={{
                          color: "#15192B",
                          width: "100%",
                          fontSize: "1rem",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                          alignItems: "center",
                        }}
                      >
                        {projects.map((project) => (
                          <MenuItem key={project} value={project}>
                            {project}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </MDBox>
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
                      Update
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

export default UpdateRelease;
