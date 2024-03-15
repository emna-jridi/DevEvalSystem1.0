/* eslint-disable */

import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { FormControl, RadioGroup, FormControlLabel, Radio, Button, TextField, InputLabel } from '@mui/material';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useNavigate } from 'react-router-dom';

const roles = ['ROLE_TECHNICAL_AGENT', 'ROLE_PSYCHOTECHNICAL_AGENT'];

const CreateAgent = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      
        if (!fullName || !email || !password || !role) {
          setError('All fields are required.');
          return;
        }
        const namePattern = /^[A-Za-z\s]+$/;
        if (!namePattern.test(fullName)) {
          setError('Please enter a valid full name.');
          return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
          setError('Please enter a valid email address.');
          return;
        }
        const response = await axios.get(`http://localhost:4000/auth/emailExist/${email}`);
        if (response.data.exists) {
          console.log(response.data.exists);
          setError('This email already exists. Please use a different email address.');
          return;
        }
      await axios.post("http://localhost:4000/Agent", { fullName, email, role, password });
      navigate('/tables/agentsTables');
    } catch (error) {
      console.error("Error adding agent:", error);
      setError("Error adding agent")
    }

  };
  const handleCancel = () => {
    navigate('/tables/agentsTables');
  };


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        sx={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          maxWidth: '400px',
          margin: '0 auto',
          marginTop: '50px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <MDTypography variant="h5" align="center" mb={3}>Add New Agent</MDTypography>
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
          <FormControl fullWidth margin="normal">
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
            />
          </FormControl>
          <FormControl component="fieldset" margin="normal">
            <InputLabel htmlFor="role">Role</InputLabel>
            <br />
            <RadioGroup aria-label="role" name="role" value={role} onChange={handleRoleChange}>
              {roles.map((role) => (
                <FormControlLabel
                  key={role}
                  value={role}
                  control={<Radio />}
                  label={role.split('_').join(' ')}
                />
              ))}
            </RadioGroup>
          </FormControl>
          {error && <MDTypography variant="body2" color="error">{error}</MDTypography>}
          <MDBox mt={2} display="flex">
            <Button style={{ backgroundColor: '#ccc', color: '#333', marginRight: '8px' }} onClick={handleCancel}>Cancel</Button>
            <Button style={{ backgroundColor: '#15192B', color: '#fff', marginLeft: '8px' }} onClick={handleSubmit}>Add</Button>
          </MDBox>
        </form>
      </MDBox>
    </DashboardLayout>
  );
};



export default CreateAgent;