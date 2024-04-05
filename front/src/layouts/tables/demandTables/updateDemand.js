/* eslint-disable */
  import Grid from "@mui/material/Grid";
  import Card from "@mui/material/Card";
  import React from "react";
  import axios from "axios";
  import { useState } from "react";
  import { useEffect } from "react";
  import { FormControl, Button, TextField, MenuItem, Select, InputLabel } from "@mui/material";
  import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
  import DashboardNavbar from "examples/Navbars/DashboardNavbar";
  import MDBox from "components/MDBox";
  import MDTypography from "components/MDTypography";
  import { useNavigate } from "react-router-dom";
  import { useLocation } from "react-router-dom";

  import { format } from 'date-fns';

  const UpdateDemand = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [start_date, setstart_date] = useState(new Date("2024-01-01")); 
    const [end_date, setEnd_date] = useState(new Date("2024-01-31")); 
    const [estimation, setEstimation] = useState(0);
    const [error, setError] = useState("");
    const [releases, setReleases] = useState([]);
    const [id, setId] = useState("");

    const [selectedRelease, setSelectedRelease] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const token = localStorage.getItem("accessToken");
    useEffect(() => {
      console.log(location.state);
      if (location.state) {
        const { id , title, description, start_date, end_date, estimation, releaseName } = location.state;
        setId(id);
        setTitle(title);
        setDescription(description);
        setstart_date(start_date);
        setEnd_date(end_date);
        setEstimation(estimation)
        setSelectedRelease(releaseName);
        console.log( estimation);
      }
      calculateEstimation();
      fetchData();

    }, [location,]);

    // useEffect(() => {
    //   calculateEstimation();
    // }, [start_date, end_date,]);
    // Function to calculate the estimation based on start and end dates
  const calculateEstimation = () => {
    if (start_date > end_date) {
      console.error("Invalid dates: Start date cannot be after end date.");
      return;
    }
    // Calculate number of milliseconds in one day
    const oneDay = 24 * 60 * 60 * 1000;
    // Calculate difference in days, rounded to the nearest integer
    const diffInDays = Math.round(Math.abs((start_date - end_date) / oneDay));
    // Counter for working days
    let workingDays = 0;

    for (let i = 0; i <= diffInDays; i++) {
      const currentDate = new Date(start_date);
      currentDate.setDate(currentDate.getDate() + i);
      // Check if the day is not a weekend (Saturday or Sunday)
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        workingDays++;
      }
    } const estimationHours = workingDays * 8;
    setEstimation(estimationHours);
  };

  

    const handleStartDateChange =  (e) => {
      const newStartDate = new Date(e.target.value);
      setstart_date(newStartDate);
      calculateEstimation();
    };
    
    const handleEndDateChange = (e) => {
      const newEndDate = new Date(e.target.value);
      setEnd_date(newEndDate);
      calculateEstimation();
    };  

    const fetchData = async () => {
      try {
        const response = await axios.get(`releases`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const releasesData = response.data.Releases.map((release) => release.name);

        setReleases(releasesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const handleReleaseChange = (event) => {
      setSelectedRelease(event.target.value);
    };

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

    await axios.put(
      `demand/${id}`,
      {
        title,
        description,
        start_date,
        end_date,
        estimation,
        release: {
          name: selectedRelease,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
                        rows={4}
                        multiline
                      />
                    </FormControl>
                    <MDBox display="flex" width="100%">
                      <FormControl fullWidth margin="normal" sx={{ marginRight: "16px" }}>
                        <TextField
                          label="Start Date"
                          type="date"
                          value={format(start_date, 'dd-MM-yyyy')}
                          onChange={handleStartDateChange}
                          fullWidth
                          style={{ marginTop: "8px" }}
                        />
                      </FormControl>
                      <FormControl fullWidth margin="normal">
                        <TextField
                          label="End Date"
                          type="date"
                          value={format(start_date, 'dd-MM-yyyy')}
                          onChange={handleEndDateChange}
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
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Release</InputLabel>
                      <Select
                        labelId="release-label"
                        id="release"
                        value={selectedRelease}
                        onChange={handleReleaseChange}
                        label="Release"
                        sx={{
                          color: "#15192B",
                          width: "100%",
                          fontSize: "1.1rem",
                          paddingTop: "14px",
                          alignItems: "center",
                        }}
                      >
                        {releases.map((release) => (
                          <MenuItem key={release} value={release}>
                            {release}
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
