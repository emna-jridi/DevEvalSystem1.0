/* eslint-disable */

import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio, Button, TextField, InputLabel } from '@mui/material';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const roles = ['ROLE_TECHNICAL_AGENT', 'ROLE_PSYCHOTECHNICAL_AGENT'];

const UpdateAgent = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
   // const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

  
    useEffect(() => {
        if (location.state) {
            setEmail(location.state);
            console.log("email",email);
        }
        
    }, [location]);


    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            if (!fullName || !email || !role) {
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
            await axios.put(`http://localhost:4000/agent/${email}`, { fullName, email, role});
            navigate('/tables/agentsTables');
        } catch (error) {
            console.error("Error adding agent:", error);
        }
    };
    const handleCancel = () => {
        navigate('/tables/agentsTable');
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
                <MDTypography variant="h5" align="center" mb={3}>Update Agent</MDTypography>
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
                        <Button style={{ backgroundColor: '#15192B', color: '#fff', marginLeft: '8px' }} onClick={handleSubmit}>Update</Button>
                    </MDBox>
                </form>
            </MDBox>
        </DashboardLayout>
    );
};



export default UpdateAgent;