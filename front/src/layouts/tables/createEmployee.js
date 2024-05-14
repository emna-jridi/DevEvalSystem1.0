/* eslint-disable */
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  FormControl,
  Button,
  MenuItem,
  TextField,
  Select,
  InputLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import colors from "assets/theme/base/colors";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import CurrencyInput from "react-currency-input-field";
import { formatDate } from "./utils";

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
const positions = [" Web Developer", "Mobile Developer", "Tester"];
const createEmployee = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nCin, setNCin] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthDate] = useState(formatDate(new Date()));
  const [address, setAdress] = useState("");
  const [city, setCity] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [code, setCode] = useState("");
  const [civilState, setCivilState] = useState("");
  const [dependents, setDependents] = useState(0);
  const [contract, setContract] = useState("");
  const [position, setPosition] = useState("");
  const [entryDate, setEntryDate] = useState(formatDate(new Date()));
  const [grossSalary, setGrossSalary] = useState(0);
  const [netSalary, setNetSalary] = useState(0);
  const [RIB, setRIB] = useState("");
  const [cnssNumber, setCnssNumber] = useState("");
  const [emergencyNumber, setEmergencyNumber] = useState("");
  const [hierarchicalSuperior, setHierarchicalSuperior] = useState("");
  const [leaveBalance, setLeaveBalance] = useState(0);
  const [lastNegotiationDate, setLastNegotiationDate] = useState(formatDate(new Date()));
  const [experienceLevel, setExperienceLevel] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const civilStates = ["Single", "Married", "Divorced", "Widowed"];
  const contractTypes = ["CDI", "CDD", "CIVP", "Internship", "Freelance", "Seasonal Contract"];
  const token = localStorage.getItem("accessToken");

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (!fullName || !email || !position || !experienceLevel || !entryDate || !code) {
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
      if (!salaryPattern.test(grossSalary)) {
        setError("Please enter a valid salary.");
        return;
      }
      if (RIB.length > 20) {
        setError("RIB cannot exceed 20 digits.");
        return;
      }

      if (cnssNumber.length > 10) {
        setError("CNSS number cannot exceed 10 digits.");
        return;
      }
      const response = await axios.get(`auth/emailExist/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.exists) {
        setError("This email already exists. Please use a different email address.");
        return;
      }

      await axios.post(
        "employee",
        {
          fullName,
          code,
          email,
          phoneNumber,
          nCin,
          gender,
          birthdate,
          address,
          city,
          codePostal,
          civilState,
          dependents,
          contract,
          position,
          entryDate,
          grossSalary,
          netSalary,
          RIB,
          cnssNumber,
          emergencyNumber,
          hierarchicalSuperior,
          leaveBalance,
          lastNegotiationDate,
          experienceLevel,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
                  <MDBox display="flex" width="100%">
                    <FormControl fullWidth margin="normal" sx={{ marginRight: "16px" }}>
                      <TextField
                        label="Code "
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        variant="outlined"
                      />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                      <TextField
                        label="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        variant="outlined"
                      />
                    </FormControl>
                  </MDBox>
                  <MDBox display="flex" width="100%">
                    <FormControl fullWidth margin="normal" sx={{ marginRight: "16px" }}>
                      <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                      />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                      <TextField
                        label="ID Card Number"
                        value={nCin}
                        onChange={(e) => setNCin(e.target.value)}
                        variant="outlined"
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
                        marginTop: "2px",
                        width: "50%",
                      }}
                    >
                      <MDTypography
                        variant="caption"
                        fontSize={13.5}
                        pt={2}
                        style={{ marginRight: "8px" }}
                      >
                        Gender:
                      </MDTypography>
                      <RadioGroup
                        row
                        aria-label="gender"
                        name="gender"
                        value={gender}
                        onChange={handleGenderChange}
                        margin="normal"
                      >
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Male"
                          style={{ margin: "4px" }}
                        />
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Female"
                          style={{ margin: "4px" }}
                        />
                      </RadioGroup>
                    </MDBox>
                    <FormControl
                      fullWidth
                      style={{ width: "50%", marginLeft: "16px", marginTop: "5px" }}
                    >
                      <TextField
                        label="Birth Date "
                        type="date"
                        value={formatDate(birthdate)}
                        onChange={(e) => setBirthDate(new Date(e.target.value))}
                        fullWidth
                      />
                    </FormControl>
                  </MDBox>
                  <MDBox display="flex" width="100%">
                    <FormControl fullWidth margin="normal" sx={{ marginRight: "16px" }}>
                      <TextField
                        label="address"
                        value={address}
                        onChange={(e) => setAdress(e.target.value)}
                        variant="outlined"
                      />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                      <TextField
                        label="City "
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        variant="outlined"
                      />
                    </FormControl>
                  </MDBox>
                  <MDBox display="flex" width="100%">
                    <FormControl fullWidth margin="normal" sx={{ marginRight: "16px" }}>
                      <TextField
                        label="Code Postal "
                        value={codePostal}
                        onChange={(e) => setCodePostal(e.target.value)}
                        variant="outlined"
                      />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
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
                  </MDBox>
                  <MDBox display="flex" width="100%">
                    <FormControl fullWidth margin="normal" sx={{ marginRight: "16px" }}>
                      <InputLabel>Civil State</InputLabel>
                      <Select
                        value={civilState}
                        onChange={(e) => setCivilState(e.target.value)}
                        label="Civil State"
                        sx={{
                          color: "#15192B",
                          width: "100%",
                          fontSize: "1rem",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                        }}
                      >
                        {civilStates.map((state) => (
                          <MenuItem key={state} value={state}>
                            {state}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                      <TextField
                        label="Dependents"
                        type="number"
                        value={dependents}
                        onChange={(e) => setDependents(e.target.value)}
                        variant="outlined"
                      />
                    </FormControl>
                  </MDBox>
                  <MDBox display="flex" width="100%">
                    <FormControl fullWidth margin="normal" sx={{ marginRight: "16px" }}>
                      <InputLabel>Contract Type</InputLabel>
                      <Select
                        value={contract}
                        onChange={(e) => setContract(e.target.value)}
                        label="Contract Type"
                        sx={{
                          color: "#15192B",
                          width: "100%",
                          fontSize: "1rem",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                        }}
                      >
                        {contractTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                      <InputLabel>Position </InputLabel>
                      <Select
                        id="position"
                        value={position}
                        onChange={handlePositionChange}
                        label="Position"
                        sx={{
                          color: "#15192B",
                          width: "100%",
                          fontSize: "1rem",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                        }}
                      >
                        {positions.map((position) => (
                          <MenuItem key={position} value={position}>
                            {position}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </MDBox>
                  <MDBox display="flex" width="100%">
                    <FormControl fullWidth margin="normal" sx={{ marginRight: "16px" }}>
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
                        label="Gross Salary"
                        value={grossSalary}
                        onChange={(e) => setGrossSalary(e.target.value)}
                        variant="outlined"
                      />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                      <TextField
                        label="Net Salary"
                        value={netSalary}
                        onChange={(e) => setNetSalary(e.target.value)}
                        variant="outlined"
                      />
                    </FormControl>
                  </MDBox>
                  <MDBox display="flex" width="100%">
                    <FormControl fullWidth margin="normal" sx={{ marginRight: "16px" }}>
                      <TextField
                        label="RIB"
                        value={RIB}
                        onChange={(e) => setRIB(e.target.value)}
                        variant="outlined"
                      />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
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
                        label="Emergency Phone Number"
                        value={emergencyNumber}
                        onChange={(e) => setEmergencyNumber(e.target.value)}
                        variant="outlined"
                      />
                    </FormControl>
                    <FormControl fullWidth margin="normal" >
                      <TextField
                        label="Entry Date"
                        type="date"
                        value={formatDate(entryDate)}
                        onChange={(e) => setEntryDate(new Date(e.target.value))}
                        fullWidth
                      />
                    </FormControl>
                    
                  </MDBox>
                  <MDBox display="flex" width="100%">
                  <FormControl fullWidth margin="normal" sx={{ marginRight: "16px" }}>
                      <TextField
                        label="Hierarchical Superior"
                        value={hierarchicalSuperior}
                        onChange={(e) => setHierarchicalSuperior(e.target.value)}
                        variant="outlined"
                      />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                      <TextField
                        label="Leave Balance"
                        type="number"
                        value={leaveBalance}
                        onChange={(e) => setLeaveBalance(e.target.value)}
                        variant="outlined"
                      />
                    </FormControl>

                   
                  </MDBox>
                  <MDBox display="flex" width="100%">
                    <FormControl fullWidth margin="normal" sx={{ marginRight: "16px" }}>
                      <TextField
                        label="Experience Level"
                        value={experienceLevel}
                        onChange={(e) => setExperienceLevel(e.target.value)}
                        variant="outlined"
                      />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                      <TextField
                        label="Last Approved Negotiation : "
                        type="date"
                        value={formatDate(lastNegotiationDate)}
                        onChange={(e) => setLastNegotiationDate(new Date(e.target.value))}
                        fullWidth
                      />
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
