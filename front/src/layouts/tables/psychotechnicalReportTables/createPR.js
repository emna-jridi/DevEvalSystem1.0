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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import { formatDate } from "../utils";

const CreatePsychotechnicalReport = () => {

  const [created_At, setCreated_At] = useState(new Date());
  const [attendanceFrequency, setAttendanceFrequency] = useState(0);
  const [punctuality, setPunctuality] = useState(0);
  const [absenceCommunication, setAbsenceCommunication] = useState(0);
  const [TotalAttendance, setTotalAttendance] = useState(0);
  const [interpersonalRelationships, setInterpersonalRelationships] = useState(0);
  const [InterpersonalTotal, setInterpersonalTotal] = useState(0);
  const [collaboration, setCollaboration] = useState(0);
  const [TechEvalRating, setTechEvalRating] = useState(0);
  const [TechEvaltoatal, setTechEvaltoatal] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  const [employees, setEmployees] = useState([]);
  const [showFields, setShowFields] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const handleAttendanceFrequencyChange = (event) => {
    setAttendanceFrequency(event.target.value);
  };
  
  const handlePunctualityChange = (event) => {
    setPunctuality(event.target.value);
  };

  const handleAbsenceCommunicationChange = (event) => {
    setAbsenceCommunication(event.target.value);
  };

  const handleTechEvalRatingChange = (event) => {
    setTechEvalRating(event.target.value);
  };
  const handleInterpersonalRelationshipsChange = (event) => {
    setInterpersonalRelationships(event.target.value);
  };
  const handleCollaborationChange = (event) => {
    setCollaboration(event.target.value);
  };
  const handleEmployeeChange = (event) => {
    setSelectedEmployee(event.target.value);
  };
  useEffect(() => {
    fetchUserDetails(token);
    getAllEmployees();
  }, [token]);
  const fetchUserDetails = async (token) => {
    try {
      const response = await axios.get("userDetails", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdminId(response.data._id);
    } catch (error) {
      console.error("Error :", error);
    }
  };

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

  useEffect(() => {
    calculateTotalAttendance();
    calculateInterpersonalTotal();
    calculateTechEvaltoatal();
  }, [
    attendanceFrequency,
    punctuality,
    absenceCommunication,
    interpersonalRelationships,
    collaboration,
    TechEvalRating,
  ]);

  useEffect(() => {
    calculateTotal();
  }, [TotalAttendance, InterpersonalTotal, TechEvaltoatal]);

  const calculateTotalAttendance = () => {
    const sum =
      (parseInt(absenceCommunication) + parseInt(punctuality) + parseInt(attendanceFrequency)) * 4;

    setTotalAttendance(sum);
  };
  const calculateInterpersonalTotal = () => {
    const sum = (parseInt(interpersonalRelationships) + parseInt(collaboration)) * 6;

    setInterpersonalTotal(sum);
  };
  const calculateTechEvaltoatal = () => {
    const sum = parseInt(TechEvalRating) * 4;

    setTechEvaltoatal(sum);
  };

  const calculateTotal = () => {
    const sum =
      (parseInt(TotalAttendance) + parseInt(InterpersonalTotal) + parseInt(TechEvaltoatal)) / 14;
    console.log(sum);
    const roundedTotal = sum.toFixed(2);
    setTotal(parseFloat(roundedTotal));
  };
  const handleSubmit = async () => {
    try {
      if (
        !attendanceFrequency ||
        !punctuality ||
        !absenceCommunication ||
        !interpersonalRelationships ||
        !collaboration ||
        !TechEvalRating
      ) {
        setError("All fields are required.");
        return;
      }
      await axios.post(
        "psychotechnical-report",
        {
          created_At,
          adminId,
          attendanceFrequency,
          punctuality,
          absenceCommunication,
          interpersonalRelationships,
          collaboration,
          TechEvalRating,
          TotalAttendance,
          InterpersonalTotal,
          TechEvaltoatal,
          total,
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
      navigate("/tables/psychotechnique-reports");
    } catch (error) {
      console.error("Error adding performance Rating :", error);
      setError("Error  adding performance Rating ");
    }
  };
  const handleCancel = () => {
    navigate("/tables/psychotechnique-reports");
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
                        label="Date "
                        type="date"
                        value={formatDate(created_At)}
                        onChange={(e) => setCreated_At(new Date(e.target.value))}
                        fullWidth
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
                          Attendance Frequency :
                        </MDTypography>
                        <RadioGroup row onChange={handleAttendanceFrequencyChange}>
                          <FormControlLabel value={0} control={<Radio />} label="Non compliant" />
                          <FormControlLabel value={3} control={<Radio />} label="Compliant" />
                          <FormControlLabel value={5} control={<Radio />} label="Super compliant" />
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
                        marginRight: "12px",
                      }}
                    >
                      <FormControl fullWidth margin="normal">
                        <MDTypography variant="caption" fontSize={13.5}>
                          {" "}
                          Punctuality :
                        </MDTypography>
                        <RadioGroup row onChange={handlePunctualityChange}>
                          <FormControlLabel value={0} control={<Radio />} label="Non compliant" />
                          <FormControlLabel value={3} control={<Radio />} label="Compliant" />
                          <FormControlLabel value={5} control={<Radio />} label="Super compliant" />
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
                          Absence Communication :
                        </MDTypography>
                        <RadioGroup row onChange={handleAbsenceCommunicationChange}>
                          <FormControlLabel value={0} control={<Radio />} label="Non compliant" />
                          <FormControlLabel value={3} control={<Radio />} label="Compliant" />
                          <FormControlLabel value={5} control={<Radio />} label="Super compliant" />
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
                        marginRight: "12px",
                      }}
                    >
                      <FormControl fullWidth margin="normal">
                        <MDTypography variant="caption" fontSize={13.5}>
                          {" "}
                          Interpersonal Relationships :
                        </MDTypography>
                        <RadioGroup row onChange={handleInterpersonalRelationshipsChange}>
                          <FormControlLabel value={0} control={<Radio />} label="Non compliant" />
                          <FormControlLabel value={3} control={<Radio />} label="Compliant" />
                          <FormControlLabel value={5} control={<Radio />} label="Super compliant" />
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
                          collaboration :
                        </MDTypography>
                        <RadioGroup row onChange={handleCollaborationChange}>
                          <FormControlLabel value={0} control={<Radio />} label="Non compliant" />
                          <FormControlLabel value={3} control={<Radio />} label="Compliant" />
                          <FormControlLabel value={5} control={<Radio />} label="Super compliant" />
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
                        marginRight: "12px",
                      }}
                    >
                      <FormControl fullWidth margin="normal">
                        <MDTypography variant="caption" fontSize={13.5}>
                          {" "}
                          Technical Rating:
                        </MDTypography>
                        <RadioGroup row onChange={handleTechEvalRatingChange}>
                          <FormControlLabel value={0} control={<Radio />} label="Non compliant" />
                          <FormControlLabel value={3} control={<Radio />} label="Compliant" />
                          <FormControlLabel value={5} control={<Radio />} label="Super compliant" />
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

export default CreatePsychotechnicalReport;
