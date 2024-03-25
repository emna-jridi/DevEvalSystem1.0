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
  FormControlLabel,
  Radio,
  Button,
  TextField,
  InputLabel,
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const UpdateDemand = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setstart_date] = useState(new Date());
  const [end_date, setEnd_date] = useState(new Date());
  const [estimation, setEstimation] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { title, description, start_date, end_date, estimation } = location.state;
      setTitle(title);
      setDescription(description);
      setstart_date(start_date);
      setEnd_date(end_date);
      setEstimation(estimation);
    }
  }, [location]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleSubmit = async () => {
    try {
      if (!title || !description || !start_date || !end_date) {
        setError("All fields are required.");
        return;
      }
      if (end_date <= start_date) {
        setError("End date must be after the start date.");
        return;
      }

      await axios.put(`http://localhost:4000/demand/${title}`, {
        title,
        description,
        start_date,
        end_date,
        estimation,
      });
      navigate("/demand");
    } catch (error) {
      console.error("Error adding Demand:", error);
    }
  };
  const handleCancel = () => {
    navigate("/demand");
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
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
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
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="Estimation"
                      type="number"
                      inputProps={{ min: 0 }}
                      value={estimation}
                      onChange={(e) => setEstimation(e.target.value)}
                      fullWidth
                      style={{ marginTop: "8px" }}
                    />
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

export default UpdateDemand;
