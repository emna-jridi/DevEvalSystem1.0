import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Paper from "@mui/material/Paper";
import MDTypography from "components/MDTypography";
import Button from "@mui/material/Button";

import { blueGrey } from "@mui/material/colors";
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function EmployeeDetails() {
  const location = useLocation();
  const employee = location.state.employee;
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/employees");
  };
  function formatPhoneNumber(phoneNumber) {
    phoneNumber = phoneNumber.toString();
    if (phoneNumber.startsWith("216")) {
      return phoneNumber.slice(3);
    }
    return phoneNumber;
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString("en-US", options);
    return formattedDate;
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
                  Employee details
                </MDTypography>
              </MDBox>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableBody>
                    <TableRow sx={{ backgroundColor: "#F5F5F5" }}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bold", color: "#333" }}
                      >
                        <MDTypography variant="body2">Name :</MDTypography>
                      </TableCell>
                      <TableCell>{employee.fullName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <MDTypography variant="body2" color="inherit">
                          Email :
                        </MDTypography>
                      </TableCell>
                      <TableCell>{employee.email}</TableCell>
                    </TableRow>
                    <TableRow sx={{ backgroundColor: "#F5F5F5" }}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bold", color: "#333" }}
                      >
                        <MDTypography variant="body2"> Phone Number :</MDTypography>
                      </TableCell>
                      <TableCell>{formatPhoneNumber(employee.phoneNumber)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <MDTypography variant="body2" color="inherit">
                          Civil State :
                        </MDTypography>
                      </TableCell>
                      <TableCell>{employee.civilState}</TableCell>
                    </TableRow>
                    <TableRow sx={{ backgroundColor: "#F5F5F5" }}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bold", color: "#333" }}
                      >
                        <MDTypography variant="body2"> Dependents :</MDTypography>
                      </TableCell>
                      <TableCell>{employee.dependents}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <MDTypography variant="body2" color="inherit">
                          Contract :
                        </MDTypography>
                      </TableCell>
                      <TableCell>{employee.contract}</TableCell>
                    </TableRow>
                    <TableRow sx={{ backgroundColor: "#F5F5F5" }}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bold", color: "#333" }}
                      >
                        <MDTypography variant="body2"> Position :</MDTypography>
                      </TableCell>
                      <TableCell>{employee.position}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <MDTypography variant="body2" color="inherit">
                          Employed At :
                        </MDTypography>
                      </TableCell>
                      <TableCell>{formatDate(employee.entryDate)}</TableCell>
                    </TableRow>
                    <TableRow sx={{ backgroundColor: "#F5F5F5" }}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bold", color: "#333" }}
                      >
                        <MDTypography variant="body2"> Salary :</MDTypography>
                      </TableCell>
                      <TableCell>{employee.salary}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <MDTypography variant="body2" color="inherit">
                          RIB :
                        </MDTypography>
                      </TableCell>
                      <TableCell>{employee.RIB}</TableCell>
                    </TableRow>
                    <TableRow sx={{ backgroundColor: "#F5F5F5" }}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bold", color: "#333" }}
                      >
                        <MDTypography variant="body2"> Cnss Number :</MDTypography>
                      </TableCell>
                      <TableCell>{employee.cnssNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <MDTypography variant="body2" color="inherit">
                          Emergency Number :
                        </MDTypography>
                      </TableCell>
                      <TableCell>{formatPhoneNumber(employee.emergencyNumber)}</TableCell>
                    </TableRow>
                    <TableRow sx={{ backgroundColor: "#F5F5F5" }}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bold", color: "#333" }}
                      >
                        <MDTypography variant="body2"> Hierarchical Superior :</MDTypography>
                      </TableCell>
                      <TableCell>{employee.hierarchicalSuperior}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <MDTypography variant="body2" color="inherit">
                          Leave Balance :
                        </MDTypography>
                      </TableCell>
                      <TableCell>{employee.leaveBalance}</TableCell>
                    </TableRow>
                    <TableRow sx={{ backgroundColor: "#F5F5F5" }}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bold", color: "#333" }}
                      >
                        <MDTypography variant="body2"> Last Negotiation :</MDTypography>
                      </TableCell>
                      <TableCell>{formatDate(employee.lastNegotiationDate)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <MDTypography variant="body2" color="inherit">
                          Rank :
                        </MDTypography>
                      </TableCell>
                      <TableCell>{employee.rank}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <MDBox mb={1} mt={1} display="flex" justifyContent="flex-end">
                  <Button
                    autoFocus
                    sx={{
                      backgroundColor: "#15192B",
                      color: "#fff",
                      marginRight: "8px",
                      "&:hover": {
                        backgroundColor: "#3A4B8A",
                        color: "#fff",
                      },
                    }}
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </MDBox>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
