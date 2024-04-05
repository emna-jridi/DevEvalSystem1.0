/* eslint-disable */
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { FormControl, Button, MenuItem, TextField, Select, InputLabel } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import colors from "assets/theme/base/colors";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import CurrencyInput from "react-currency-input-field";
import { formatDate } from './utils';
import { format } from "date-fns";
const CustomInput = React.forwardRef((props, ref) => {
  return (
    <TextField
      {...props}
      ref={ref}
      fullWidth
      inputProps={{
        style: {
          height: "3rem",
          padding: "0.5rem",
          fontSize: "1rem",
          borderRadius: "0.25rem",
          border: "1px solid #BDBDBD",
        },
      }}
    />
  );
});
const positions = ["Developer", "Tester"];
const createEmployee = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [civilState, setCivilState] = useState("");
  const [dependents, setDependents] = useState(0);
  const [contract, setContract] = useState("");
  const [position, setPosition] = useState("");
  const [entryDate, setEntryDate] =  useState(format(new Date(), "dd-MM-yyyy"));
  const [salary, setSalary] = useState("");
  const [RIB, setRIB] = useState("");
  const [cnssNumber, setCnssNumber] = useState("");
  const [emergencyNumber, setEmergencyNumber] = useState("");
  const [hierarchicalSuperior, setHierarchicalSuperior] = useState("");
  const [leaveBalance, setLeaveBalance] = useState(0);
  const [lastNegotiationDate, setLastNegotiationDate] =  useState(format(new Date(), "dd-MM-yyyy"));
  const [rank, setRank] = useState(0);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const civilStates = ["Single", "Married", "Divorced", "Widowed"];
  const contractTypes = ["CDI", "CDD", "Stage", "Internship", "Freelance", "Seasonal Contract"];
  const token = localStorage.getItem("accessToken");
 
  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };
  const handleSubmit = async () => {
    try {
      if (!fullName || !email || !position || !rank || !entryDate) {
        setError("All fields are required.");
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        setError("Please enter a valid email address.");
        return;
      }
      const namePattern = /^[A-Za-z\s]+$/;
      if (!namePattern.test(fullName)) {
        setError("Please enter a valid full name.");
        return;
      }
      const phonePattern = /^\d{8}$/; // Regular expression to match exactly 8 digits
      if (!phoneNumber.match(/^\d+$/)) {
          setError("Phone number should only contain digits.");
          return;
      }
      if (!phonePattern.test(phoneNumber)) {
          setError("Please enter a valid 8-digit phone number.");
          return;
      }
      const salaryPattern = /^\d+(\.\d{1,3})?$/; 
      if (!salaryPattern.test(salary)) {
          setError("Please enter a valid salary.");
          return;
      }
      const response = await axios.get(`auth/emailExist/${email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },);
      if (response.data.exists) {
        setError("This email already exists. Please use a different email address.");
        return;
      }

      await axios.post("employee", {
        fullName,
        email,
        phoneNumber,
        civilState,
        dependents,
        contract,
        position,
        entryDate,
        salary,
        RIB,
        cnssNumber,
        emergencyNumber,
        hierarchicalSuperior,
        leaveBalance,
        lastNegotiationDate,
        rank,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },);
      navigate("/employees");
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };
  const handleCancel = () => {
    navigate("/employees");
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
                  Create Employee
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
                  <MDBox display="flex" width="100%">
                    <FormControl fullWidth margin="normal" sx={{ marginRight: "16px" }}>
                      {/* <PhoneInput
                        defaultCountry="TN"
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                        inputComponent={CustomInput}
                        countryCodeEditable={false}
                        inputStyle={{ width: "100%" }}
                      /> */}
                      <TextField
                      label="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      variant="outlined"
                    />
                      {/* <PhoneInput
                        defaultCountry="TN"
                        placeholder="Enter phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        inputComponent={CustomInput}
                        countryCodeEditable={false}
                        inputStyle={{ width: "100%" }}
                        //enableSearch={false}
                       // enableAreaCodesList={false}
                      /> */}
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                      <InputLabel>Civil State</InputLabel>
                      <Select
                        value={civilState}
                        onChange={(e) => setCivilState(e.target.value)}
                        label="Civil State"
                        sx={{
                          color: "#15192B",
                          width: "100%",
                          fontSize: "1rem",
                          paddingTop: "14px",
                        }}
                      >
                        {civilStates.map((state) => (
                          <MenuItem key={state} value={state}>
                            {state}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </MDBox>
                  <MDBox display="flex" width="100%">
                    <FormControl fullWidth margin="normal" sx={{ marginRight: "16px" }}>
                      <TextField
                        label="Dependents"
                        type="number"
                        value={dependents}
                        onChange={(e) => setDependents(e.target.value)}
                        variant="outlined"
                      />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                      <InputLabel>Contract Type</InputLabel>
                      <Select
                        value={contract}
                        onChange={(e) => setContract(e.target.value)}
                        label="Contract Type"
                        sx={{
                          color: "#15192B",
                          width: "100%",
                          fontSize: "1rem",
                          paddingTop: "14px",
                        }}
                      >
                        {contractTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </MDBox>

                  <MDBox display="flex" width="100%">
                    <FormControl fullWidth margin="normal" sx={{ marginRight: "16px" }}>
                      <InputLabel>Position </InputLabel>
                      <Select
                        id="position"
                        value={position}
                        onChange={handlePositionChange}
                        label="Position"
                        alignItems="center"
                        sx={{
                          color: "#15192B",
                          width: "100%",
                          fontSize: "1.22rem",
                          paddingTop: "14px",
                        }}
                      >
                        {positions.map((position) => (
                          <MenuItem key={position} value={position}>
                            {position}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                      <TextField
                        label="Entry Date"
                        type="date"
                        value={format(entryDate, "dd-MM-yyyy")}
                        onChange={(e) => setEntryDate(new Date(e.target.value))}
                        fullWidth
                      />
                    </FormControl>
                  </MDBox>

                  <FormControl fullWidth margin="normal">
                    {/*         
                    <CurrencyInput
                      name="salary"
                      placeholder="Enter salary"
                      value={salary}
                      onValueChange={(value) => setSalary(value)}
                      allowDecimals={true}
                      decimalsLimit={2}
                      prefix="TND "
                      sx={{
                        color: "#15192B",
                        width: "100%",
                        fontSize: "1rem",
                        paddingTop: "14px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        backgroundColor: "#fff",
                        height: "56px",
                      }}
                    /> */}
                    <TextField
                      label="Salary"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      variant="outlined"
                    />
                  </FormControl>
                  <MDBox display="flex" width="100%">
                    <FormControl fullWidth margin="normal" sx={{ marginRight: "16px" }}>
                      <TextField
                        label="RIB"
                        value={RIB}
                        onChange={(e) => setRIB(e.target.value)}
                        variant="outlined"
                      />
                    </FormControl>

                    <FormControl fullWidth margin="normal" >
                      <TextField
                        label="Cnss Number"
                        type="number"
                        value={cnssNumber}
                        onChange={(e) => setCnssNumber(e.target.value)}
                        variant="outlined"
                      />
                    </FormControl>
                  </MDBox>
                  <MDBox display="flex" width="100%">
                    <FormControl fullWidth margin="normal" sx={{ marginRight: "16px" }}>
                      {/* <PhoneInput
                        placeholder="Enter Emergency Number"
                        value={emergencyNumber}
                        onChange={setEmergencyNumber}
                        inputClassName="custom-input-class"
                        style={{
                          color: "#15192B",
                          width: "100%",
                          fontSize: "1.1rem",
                          paddingTop: "14px",
                        }}
                        country="TN"
                        international={false}
                        defaultCountry="TN"
                      /> */}
                      <TextField
                        label="Emergency Number"
                        value={emergencyNumber}
                        onChange={(e) => setEmergencyNumber(e.target.value)}
                        variant="outlined"
                      />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                      <TextField
                        label="Hierarchical Superior"
                        value={hierarchicalSuperior}
                        onChange={(e) => setHierarchicalSuperior(e.target.value)}
                        variant="outlined"
                      />
                    </FormControl>
                  </MDBox>
                  <MDBox display="flex" width="100%">
                    <FormControl fullWidth margin="normal" sx={{ marginRight: "16px" }}>
                      <TextField
                        label="Leave Balance"
                        type="number"
                        value={leaveBalance}
                        onChange={(e) => setLeaveBalance(e.target.value)}
                        variant="outlined"
                      />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                      <TextField
                        label="Last Negotiation : 
                        "
                        type="date"
                        value={format(lastNegotiationDate, "dd-MM-yyyy")}
                        onChange={(e) => setLastNegotiationDate(new Date(e.target.value))}
                        fullWidth
                      />
                    </FormControl>
                  </MDBox>
                  <FormControl fullWidth margin="normal" sx={{ marginRight: "16px" }}>
                    <TextField
                      label="Rank"
                      type="number"
                      value={rank}
                      onChange={(e) => setRank(e.target.value)}
                      variant="outlined"
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

export default createEmployee;
