/* eslint-disable */
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
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function EmployeeDetails() {
  const location = useLocation();
  const employee = location.state.employee;
  console.log(employee);
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
              <MDBox display="flex" width="100%">
                <MDBox
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    border: "3px solid rgba(0, 0, 0, 0.23)",
                    borderRadius: "4px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    margin: "30px",
                    width: "100%",
                    paddingTop: "20px",
                    marginRight: "12px",
                  }}
                >
                  <MDTypography variant="h6" fontSize={25}>
                    {" "}
                    Personal Data :
                  </MDTypography>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MDTypography variant="body1" style={{ padding: "8px" }}>
                      Name :
                    </MDTypography>
                    <MDTypography variant="body2"> {employee.fullName} </MDTypography>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MDTypography variant="body1" style={{ padding: "8px" }}>
                      {" "}
                      Email :
                    </MDTypography>
                    <MDTypography variant="body2">{employee.email}</MDTypography>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MDTypography variant="body1" style={{ padding: "8px" }}>
                      {" "}
                      ID Card Number :
                    </MDTypography>
                    <MDTypography variant="body2">{employee.nCin}</MDTypography>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MDTypography variant="body1" style={{ padding: "8px" }}>
                      {" "}
                      Gender:
                    </MDTypography>
                    <MDTypography variant="body2">{employee.gender}</MDTypography>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MDTypography variant="body1" style={{ padding: "8px" }}>
                      {" "}
                      Birth date:
                    </MDTypography>
                    <MDTypography variant="body2">{formatDate(employee.birthdate)}</MDTypography>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MDTypography variant="body1" style={{ padding: "8px" }}>
                      {" "}
                      Phone Number :
                    </MDTypography>
                    <MDTypography variant="body2">
                      {formatPhoneNumber(employee.phoneNumber)}
                    </MDTypography>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MDTypography variant="body1" style={{ padding: "8px" }}>
                      {" "}
                      address :
                    </MDTypography>
                    <MDTypography variant="body2">{employee.address}</MDTypography>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MDTypography variant="body1" style={{ padding: "8px" }}>
                      {" "}
                      city :
                    </MDTypography>
                    <MDTypography variant="body2">{employee.city}</MDTypography>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MDTypography variant="body1" style={{ padding: "8px" }}>
                      {" "}
                      Code Postal :
                    </MDTypography>
                    <MDTypography variant="body2">{employee.codePostal}</MDTypography>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MDTypography variant="body1" style={{ padding: "8px" }}>
                      {" "}
                      Civil State :
                    </MDTypography>
                    <MDTypography variant="body2">{employee.civilState}</MDTypography>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MDTypography variant="body1" style={{ padding: "8px" }}>
                      Dependents :
                    </MDTypography>
                    <MDTypography variant="body2">{employee.dependents}</MDTypography>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MDTypography variant="body1" style={{ padding: "8px" }}>
                      Emergency Number :
                    </MDTypography>
                    <MDTypography variant="body2">{employee.emergencyNumber}</MDTypography>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MDTypography variant="body1" style={{ padding: "8px" }}>
                      RIB:
                    </MDTypography>
                    <MDTypography variant="body2">{employee.RIB}</MDTypography>
                  </div>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MDTypography variant="body1" style={{ padding: "8px" }}>
                      Cnss Number :
                    </MDTypography>
                    <MDTypography variant="body2">{employee.cnssNumber}</MDTypography>
                  </div>
                </MDBox>
              </MDBox>
              <MDBox display="flex" width="100%">
                <MDBox
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    border: "3px solid rgba(0, 0, 0, 0.23)",
                    borderRadius: "4px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    margin: "30px",
                    width: "100%",
                    paddingTop: "20px",
                    marginRight: "12px",
                  }}
                >
                  <MDTypography variant="h6" fontSize={25}>
                    {" "}
                    Professional Data :
                  </MDTypography>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MDTypography variant="body1" style={{ padding: "8px" }}>
                      {" "}
                      Contract :
                    </MDTypography>
                    <MDTypography variant="body2">{employee.contract}</MDTypography>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MDTypography variant="body1" style={{ padding: "8px" }}>
                      {" "}
                      Position :
                    </MDTypography>
                    <MDTypography variant="body2">{employee.position}</MDTypography>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MDTypography variant="body1" style={{ padding: "8px" }}>
                      {" "}
                      entryDate :
                    </MDTypography>
                    <MDTypography variant="body2">{employee.position}</MDTypography>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MDTypography variant="body1" style={{ padding: "8px" }}>
                      {" "}
                      Gross Salary :
                    </MDTypography>
                    <MDTypography variant="body2">{employee.grossSalary}</MDTypography>
                  </div>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MDTypography variant="body1" style={{ padding: "8px" }}>
                      {" "}
                      Gross Salary :
                    </MDTypography>
                    <MDTypography variant="body2">{employee.grossSalary}</MDTypography>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MDTypography variant="body1" style={{ padding: "8px" }}>
                      {" "}
                      Net Salary :
                    </MDTypography>
                    <MDTypography variant="body2">{employee.netSalary}</MDTypography>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MDTypography variant="body1" style={{ padding: "8px" }}>
                      {" "}
                      RIB:
                    </MDTypography>
                    <MDTypography variant="body2">{employee.RIB}</MDTypography>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MDTypography variant="body1" style={{ padding: "8px" }}>
                      {" "}
                      Cnss Number:
                    </MDTypography>
                    <MDTypography variant="body2">{employee.cnssNumber}</MDTypography>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MDTypography variant="body1" style={{ padding: "8px" }}>
                      {" "}
                      Hierarchical Superior:
                    </MDTypography>
                    <MDTypography variant="body2">{employee.hierarchicalSuperior}</MDTypography>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MDTypography variant="body1" style={{ padding: "8px" }}>
                      {" "}
                      Experience Level:
                    </MDTypography>
                    <MDTypography variant="body2">{employee.experienceLevel}</MDTypography>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MDTypography variant="body1" style={{ padding: "8px" }}>
                      {" "}
                      Leave Balance:
                    </MDTypography>
                    <MDTypography variant="body2">{employee.leaveBalance}</MDTypography>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MDTypography variant="body1" style={{ padding: "8px" }}>
                      {" "}
                      Last Negotiation Date:
                    </MDTypography>
                    <MDTypography variant="body2">
                      {formatDate(employee.lastNegotiationDate)}
                    </MDTypography>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MDTypography variant="body1" style={{ padding: "8px" }}>
                      {" "}
                      Last NegotiationDate:
                    </MDTypography>
                    <MDTypography variant="body2">
                      {formatDate(employee.lastNegotiationDate)}
                    </MDTypography>
                  </div>
                </MDBox>
              </MDBox>
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
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
