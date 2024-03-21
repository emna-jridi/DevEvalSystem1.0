/* eslint-disable */

import React from 'react';
import axios from 'axios';
import { useState, useEffect } from "react";
import { FormControl, RadioGroup, FormControlLabel, Radio, Button, TextField, InputLabel } from '@mui/material';
import PageLayout from 'examples/LayoutContainers/PageLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import colors from "assets/theme/base/colors";
const { info, dark } = colors
import { useNavigate } from 'react-router-dom';

const positions = ['Developer', 'Tester'];
const createEmployee = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [position, setPosition] = useState("");
    const [rank, setRank] = useState(0);
    const [entryDate, setEntryDate] = useState(new Date());
    const navigate = useNavigate();
    const [error, setError] = useState('');

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

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
            const response = await axios.get(`http://localhost:4000/auth/emailExist/${email}`);
            if (response.data.exists) {
                console.log(response.data.exists);
                setError('This email already exists. Please use a different email address.');
                return;
            }
            await axios.post("http://localhost:4000/employee", { fullName, email, position, rank, entryDate });
            navigate('/tables/employeeTables');
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    };
    const handleCancel = () => {
        navigate('/tables/employeeTables');
    };
    return (
        <PageLayout>
            <DashboardNavbar />
            <MDBox
                sx={{
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '8px',
                    margin: '0 auto',
                    marginTop: '50px',
                    marginBottom: '20px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                }}
            >
                <MDTypography variant="h5" align="center" mb={3} sx={{
                    backgroundColor: '#313852',
                    color: '#FFFFFF',
                    padding: '10px',
                    borderRadius: '4px',
                }} >Add New Employee</MDTypography>
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
                            style={{ marginTop: '8px' }}
                        />
                    </FormControl>
                    <FormControl component="fieldset" margin="normal">
                        <InputLabel htmlFor="position" sx={{
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                        }}>Position : </InputLabel>
                        <br />
                        <RadioGroup aria-label="position" style={{ color: '#15192B' }} name="position" value={position} onChange={handlePositionChange}>
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
                    <MDBox mt={2} display="flex" justifyContent="flex-end">
                        <Button sx={{
                            backgroundColor: '#ccc',
                            color: '#333',
                            marginRight: '8px',
                            '&:hover': {
                                backgroundColor: '#999',
                                color: '#fff',

                            },
                        }} onClick={handleCancel}>Cancel</Button>
                        <Button sx={{
                            backgroundColor: '#15192B',
                            color: '#fff',
                            marginLeft: '8px',
                            '&:hover': {
                                backgroundColor: '#3A4B8A',
                                color: '#fff',
                            },
                        }} onClick={handleSubmit}>Add</Button>
                    </MDBox>
                </form>
            </MDBox>
        </PageLayout>
    );
};



export default createEmployee;