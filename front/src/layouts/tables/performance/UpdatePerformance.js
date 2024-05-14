/* eslint-disable */
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { FormControl, MenuItem, Select, Button, TextField, InputLabel } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils";
import Slider from "@mui/material/Slider";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";

const UpdatePerformanceRating = () => {
  const [demands, setDemands] = useState([]);
  const [selectedDemand, setSelectedDemand] = useState("");
  const [autonomy, setAutonomy] = useState(0);
  const [estimation, setEstimation] = useState(0);
  const [conformity, setConformity] = useState(0);
  const [majorBugs, setMajorBugs] = useState(0);
  const [minorBugs, setMinorBugs] = useState(0);
  const [score, setScore] = useState(0);
  const [codeOptimization, setCodeOptimization] = useState(0);
  const [perfermance, setPerfermance] = useState(0);
  const [commentedCode, setCommentedCode] = useState(0);
  const [translation, setTranslation] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  const [id, setId] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [releaseName, setReleaseName] = useState("");
  const [releases, setReleases] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.state.rowData) {
      const {
        id,
        autonomy,
        estimation,
        conformity,
        demand,
        majorBugs,
        minorBugs,
        total,
        codeOptimization,
        perfermance,
        commentedCode,
        translation,
        employee,
      } = location.state.rowData;
      setId(id);
      setAutonomy(autonomy);
      setEstimation(estimation);
      setConformity(conformity);
      setSelectedDemand(demand.title);
      setMajorBugs(majorBugs);
      setMinorBugs(minorBugs);
      setTotal(total);
      setCodeOptimization(codeOptimization);
      setCommentedCode(commentedCode);
      setPerfermance(perfermance);
      setTranslation(translation);
      setReleaseName(demand.releaseName);
      setSelectedEmployee(employee.fullName);
    }
  }, [location]);

  const handleEstimationChange = (event) => {
    setEstimation(event.target.value);
  };

  const handleOptimizationChange = (event) => {
    setCodeOptimization(event.target.value);
  };

  const handleCommentedCodeChange = (event) => {
    setCommentedCode(event.target.value);
  };

  const handlePerfermanceChange = (event) => {
    setPerfermance(event.target.value);
  };
  const handleTranslationChange = (event) => {
    setTranslation(event.target.value);
  };
  const handleAutonomyChange = (event) => {
    setAutonomy(event.target.value);
  };
  const handleEmployeeChange = (event) => {
    setSelectedEmployee(event.target.value);
  };
  const handleReleasesChange = (event) => {
    setReleaseName(event.target.value);
  };

  useEffect(() => {
    fetchReleasesData();
    getAllEmployees();
  }, []);

  const fetchReleasesData = async () => {
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

  useEffect(() => {
    calculateTotal();
  }, [codeOptimization, perfermance, commentedCode, translation]);

  const calculateTotal = () => {
    const sum =
      parseInt(codeOptimization) +
      parseInt(perfermance) +
      parseInt(commentedCode) +
      parseInt(translation);
    setTotal(sum);
  };
  const handleDemandChange = (event) => {
    setSelectedDemand(event.target.value);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`demands`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const filteredData = response.data.Demands.filter(
        (demand) => demand.release.name === releaseName
      );
      const demandsData = filteredData.map((demand) => demand.title);
      setDemands(demandsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [releaseName]);

  const getAllEmployees = async () => {
    try {
      const response = await axios.get("employees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const employeeData = response.data.employees.map((employee) => employee.fullName);
      setEmployees(employeeData);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!estimation || !conformity || !autonomy || !majorBugs || !minorBugs) {
        setError("All fields are required.");
        return;
      }
      if (estimation < 0 || estimation > 10) {
        setError("Estimation must be between 0 and 10");
        return;
      }

      if (conformity < 0 || conformity > 10) {
        setError("Conformity must be between 0 and 10");
        return;
      }

      if (autonomy < 0 || autonomy > 6) {
        setError("Autonomy must be between 0 and 6");
        return;
      }

      if (majorBugs < 0) {
        setError("Major bugs must be a positive number");
        return;
      }

      if (minorBugs < 0) {
        setError("Minor bugs must be a positive number");
        return;
      }
      if (codeOptimization < 0 || codeOptimization > 5) {
        setError("Code Optimization must be between 0 and 5");
        return;
      }

      if (perfermance < 0 || perfermance > 5) {
        setError("Performance must be between 0 and 5");
        return;
      }

      if (commentedCode < 0 || commentedCode > 5) {
        setError("Commented Code must be between 0 and 5");
        return;
      }

      if (translation < 0 || translation > 5) {
        setError("Translation must be between 0 and 5");
        return;
      }
      await axios.put(
        `rating/${id}`,
        {
          estimation,
          conformity,
          autonomy,
          majorBugs,
          minorBugs,
          codeOptimization,
          perfermance,
          commentedCode,
          translation,
          total,
          demand: {
            title: selectedDemand,
          },
          employee: {
            fullName: selectedEmployee,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await axios.put(
        `statics/${releaseName}`,
        { selectedEmployee },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/tables/performance");
    } catch (error) {
      console.error("Error Updating performance Rating :", error);
      setError("Error  Updating performance Rating ");
    }
  };

  const handleCancel = () => {
    navigate("/tables/performance");
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
                  Add Performance Rating
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={1.5}>
                <form onSubmit={handleSubmit}>
                  <MDBox display="flex" width="100%">
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Releases</InputLabel>
                      <Select
                        labelId="demand-label"
                        id="demand"
                        value={releaseName}
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
                    <FormControl fullWidth margin="normal" sx={{ marginLeft: "16px" }}>
                      <InputLabel>Demand</InputLabel>
                      <Select
                        labelId="demand-label"
                        id="demand"
                        value={selectedDemand}
                        onChange={handleDemandChange}
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
                        {demands.map((demand) => (
                          <MenuItem key={demand} value={demand}>
                            {demand}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </MDBox>

                  <MDBox display="flex" width="100%">
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
                          width: "100%",
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
                      <TextField
                        label="conformity"
                        type="number"
                        value={conformity}
                        onChange={(e) => setConformity(e.target.value)}
                        variant="outlined"
                        inputProps={{ min: 0, max: 10 }}
                      />
                    </FormControl>
                  </MDBox>

                  <MDBox display="flex" width="100%">
                    <MDBox
                      style={{
                        display: "flex",
                        border: "1px solid rgba(0, 0, 0, 0.23)",
                        borderRadius: "4px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        margin: "4px",
                        width: "100%",
                        marginRight: "12px",
                      }}
                    >
                      <FormControl fullWidth margin="normal">
                        <MDTypography variant="caption" fontSize={13.5}>
                          {" "}
                          Estimation :
                        </MDTypography>
                        <RadioGroup row value={estimation} onChange={handleEstimationChange}>
                          <FormControlLabel value={0} control={<Radio />} label="Non compliant" />
                          <FormControlLabel value={5} control={<Radio />} label="Compliant" />
                          <FormControlLabel
                            value={10}
                            control={<Radio />}
                            label="Super compliant"
                          />
                        </RadioGroup>
                      </FormControl>
                    </MDBox>
                    <MDBox
                      style={{
                        display: "flex",
                        border: "1px solid rgba(0, 0, 0, 0.23)",
                        borderRadius: "4px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        margin: "4px",
                        width: "100%",
                      }}
                    >
                      <FormControl fullWidth margin="normal">
                        <MDTypography variant="caption" fontSize={13.5}>
                          {" "}
                          Autonomy :
                        </MDTypography>
                        <RadioGroup row value={autonomy} onChange={handleAutonomyChange}>
                          <FormControlLabel value={0} control={<Radio />} label="Non compliant" />
                          <FormControlLabel value={3} control={<Radio />} label="Compliant" />
                          <FormControlLabel value={6} control={<Radio />} label="Super compliant" />
                        </RadioGroup>
                      </FormControl>
                    </MDBox>
                  </MDBox>
                  <MDBox display="flex" width="100%">
                    <FormControl fullWidth margin="normal" sx={{ marginRight: "16px" }}>
                      <TextField
                        label="Major Bugs"
                        type="number"
                        value={majorBugs}
                        onChange={(e) => setMajorBugs(e.target.value)}
                        variant="outlined"
                      />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                      <TextField
                        label="Minor Bugs"
                        type="number"
                        value={minorBugs}
                        onChange={(e) => setMinorBugs(e.target.value)}
                        variant="outlined"
                      />
                    </FormControl>
                  </MDBox>

                  <Box sx={{ minWidth: 275 }}>
                    <MDTypography variant="h6">Code Quality Rating</MDTypography>
                    <MDBox display="flex" width="100%">
                      <MDBox
                        style={{
                          display: "flex",
                          border: "1px solid rgba(0, 0, 0, 0.23)",
                          borderRadius: "4px",
                          width: "100%",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          margin: "4px",
                          marginRight: "12px",
                        }}
                      >
                        <FormControl fullWidth margin="normal">
                          <MDTypography variant="caption" fontSize={13.5}>
                            {" "}
                            code Optimization :
                          </MDTypography>
                          <RadioGroup
                            value={codeOptimization}
                            row
                            onChange={handleOptimizationChange}
                          >
                            <FormControlLabel value={0} control={<Radio />} label="Non compliant" />
                            <FormControlLabel value={3} control={<Radio />} label="Compliant" />
                            <FormControlLabel
                              value={5}
                              control={<Radio />}
                              label="Super compliant"
                            />
                          </RadioGroup>
                        </FormControl>
                      </MDBox>
                      <MDBox
                        style={{
                          display: "flex",
                          border: "1px solid rgba(0, 0, 0, 0.23)",
                          borderRadius: "4px",
                          width: "100%",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          margin: "4px",
                        }}
                      >
                        <FormControl fullWidth margin="normal">
                          <MDTypography variant="caption" fontSize={13.5}>
                            {" "}
                            Perfermance :
                          </MDTypography>
                          <RadioGroup value={perfermance} row onChange={handlePerfermanceChange}>
                            <FormControlLabel value={0} control={<Radio />} label="Non compliant" />
                            <FormControlLabel value={3} control={<Radio />} label="Compliant" />
                            <FormControlLabel
                              value={5}
                              control={<Radio />}
                              label="Super compliant"
                            />
                          </RadioGroup>
                        </FormControl>
                      </MDBox>
                    </MDBox>
                    <MDBox display="flex" width="100%">
                      <MDBox
                        style={{
                          display: "flex",
                          border: "1px solid rgba(0, 0, 0, 0.23)",
                          borderRadius: "4px",
                          width: "100%",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          margin: "4px",
                          marginRight: "12px",
                        }}
                      >
                        <FormControl fullWidth margin="normal">
                          <MDTypography variant="caption" fontSize={13.5}>
                            {" "}
                            Commented Code:
                          </MDTypography>
                          <RadioGroup
                            value={commentedCode}
                            row
                            onChange={handleCommentedCodeChange}
                          >
                            <FormControlLabel value={0} control={<Radio />} label="Non compliant" />
                            <FormControlLabel value={3} control={<Radio />} label="Compliant" />
                            <FormControlLabel
                              value={5}
                              control={<Radio />}
                              label="Super compliant"
                            />
                          </RadioGroup>
                        </FormControl>
                      </MDBox>
                      <MDBox
                        style={{
                          display: "flex",
                          border: "1px solid rgba(0, 0, 0, 0.23)",
                          borderRadius: "4px",
                          width: "100%",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          margin: "4px",
                        }}
                      >
                        <FormControl fullWidth margin="normal">
                          <MDTypography variant="caption" fontSize={13.5}>
                            {" "}
                            Translation:
                          </MDTypography>
                          <RadioGroup value={translation} row onChange={handleTranslationChange}>
                            <FormControlLabel value={0} control={<Radio />} label="Non compliant" />
                            <FormControlLabel value={3} control={<Radio />} label="Compliant" />
                            <FormControlLabel
                              value={5}
                              control={<Radio />}
                              label="Super compliant"
                            />
                          </RadioGroup>
                        </FormControl>
                      </MDBox>
                    </MDBox>

                    {/* <MDBox display="flex" width="50%">
                        <FormControl fullWidth margin="normal" sx={{ marginRight: "8px" }}>
                          <TextField
                            label="total"
                            type="number"
                            value={total}
                            onChange={(e) => setTotal(e.target.value)}
                            variant="outlined"
                            disabled
                          />
                        </FormControl>
                      </MDBox> */}
                  </Box>
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
                      Edit
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

export default UpdatePerformanceRating;
