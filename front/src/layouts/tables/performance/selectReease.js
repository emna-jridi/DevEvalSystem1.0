import React, { useState, useEffect } from "react";
import { Grid, Card, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function PerformanceSelectionPage() {
  const navigate = useNavigate();
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedRelease, setSelectedRelease] = useState("");
  const token = localStorage.getItem("accessToken");
  const [employees, setEmployees] = useState([]);
  const [releases, setReleases] = useState([]);
  const handleEmployeeChange = (event) => {
    setSelectedEmployee(event.target.value);
  };
  const handleReleasesChange = (event) => {
    setSelectedRelease(event.target.value);
  };

  useEffect(() => {
    getAllEmployees();
    fetchReleasesData();
  }, [selectedEmployee]);
  const getAllEmployees = async () => {
    try {
      const response = await axios.get("employees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const employee = response.data.employees.map((employee) => employee.fullName);
      setEmployees(employee);
    } catch (error) {
      console.error("Error :", error);
    }
  };
  const fetchReleasesData = async () => {
    try {
      const response = await axios.get(`ratings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const filteredPerformances = response.data.performanceReports.filter(
        (performance) => performance.employee.fullName === selectedEmployee
      );
      const uniqueReleases = filteredPerformances.map(
        (performance) => performance.demand.releaseName
      );
      setReleases(uniqueReleases);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleViewPerformance = () => {
    navigate("/employees/performance", {
      state: {
        employee: selectedEmployee,
        release: selectedRelease,
      },
    });
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
                <MDTypography variant="h6" color="white" sx={{ fontSize: "1rem" }}>
                  Study of Performance for Employee in Specific Release
                </MDTypography>
              </MDBox>
              <MDBox display="flex" width="100%" mt={3} py={3} px={2}>
                <FormControl fullWidth margin="normal" sx={{ marginRight: "16px" }}>
                  <InputLabel>Employee</InputLabel>
                  <Select
                    labelId="demand-label"
                    id="demand"
                    value={selectedEmployee}
                    onChange={handleEmployeeChange}
                    label="Employee"
                    sx={{
                      color: "#15192B",
                      fontSize: "1rem",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      alignItems: "center",
                    }}
                  >
                    {employees.map((employee) => (
                      <MenuItem key={employee} value={employee}>
                        {employee}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Releases</InputLabel>
                  <Select
                    labelId="demand-label"
                    id="demand"
                    value={selectedRelease}
                    onChange={handleReleasesChange}
                    label="Demand"
                    sx={{
                      color: "#15192B",
                      width: "100%",
                      fontSize: "1rem",
                      paddingTop: "10px",
                      paddingBottom: "10px",
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
              </MDBox>
              <MDBox mb={2} mt={2} display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#15192B",
                    color: "#fff",
                    marginRight: "15px",
                    "&:hover": {
                      backgroundColor: "#3A4B8A",
                      color: "#fff",
                    },
                  }}
                  onClick={handleViewPerformance}
                >
                  View Performance
                </Button>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default PerformanceSelectionPage;
