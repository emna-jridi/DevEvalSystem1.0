/* eslint-disable */

import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio, Button, TextField, InputLabel } from '@mui/material';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const positions = ['Developer', 'Tester'];

const UpdateAgent = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [position, setPosition] = useState("");
    const [rank, setRank] = useState(0);
    const [entryDate, setEntryDate] = useState(new Date());
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        if (location.state) {
            setEmail(location.state);
            console.log("email",email);
        }
        
    }, [location]);


    const handlePositionChange = (event) => {
        setPosition(event.target.value);
    };
    const handleSubmit = async () => {
        try {
            if (!fullName || !email || !position || !rank || !entryDate) {
                setError('All fields are required.');
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                setError('Please enter a valid email address.');
                return;
            }
            const namePattern = /^[A-Za-z\s]+$/;
            if (!namePattern.test(fullName)) {
                setError('Please enter a valid full name.');
                return;

            }
            await axios.put(`http://localhost:4000/employee/${email}`, { fullName, email, position, rank, entryDate });
            navigate('/tables/employeeTables');
        } catch (error) {
            console.error("Error adding agent:", error);
        }
    };
    const handleCancel = () => {
        navigate('/tables/employeeTables');
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
                <MDTypography variant="h5" align="center" mb={3}>Update Employee</MDTypography>
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
                        <TextField label="Rank" type="number" value={rank} onChange={(e) => setRank(e.target.value)} variant="outlined" />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Entry Date"
                            type="date"
                            value={formatDate(entryDate)}
                            onChange={(e) => setEntryDate(new Date(e.target.value))}
                            fullWidth
                            style={{ marginBottom: '5px', marginTop: '8px' }}
                        />
                    </FormControl>
                    <FormControl component="fieldset" margin="normal">
                        <InputLabel htmlFor="position">Position</InputLabel>
                        <br />
                        <RadioGroup aria-label="position" name="position" value={position} onChange={handlePositionChange}>
                            {positions.map((position) => (
                                <FormControlLabel
                                    key={position}
                                    value={position}
                                    control={<Radio />}
                                    label={position}
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