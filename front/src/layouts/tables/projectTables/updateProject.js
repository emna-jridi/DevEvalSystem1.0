/* eslint-disable */

import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio, Button, TextField, InputLabel } from '@mui/material';
import PageLayout from 'examples/LayoutContainers/PageLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



const UpdateProject = () => {
    const [label, setLabel] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            const { label, description } = location.state;
            setLabel(label);
            setDescription(description);
        }
    }, [location]);

    const handleSubmit = async () => {
        try {
            if (!label || !description) {
                setError('All fields are required.');
                return;
            }
            await axios.put(`http://localhost:4000/project/${label}`, { label, description },);
            console.log("done");
            navigate('/tables/projectTables/projectTable');
        } catch (error) {
            console.error("Error adding agent:", error);
        }
    };
    const handleCancel = () => {
        navigate('/tables/projectTables/projectTable');
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
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                }}
            >
                <MDTypography
                    variant="h5"
                    align="center"
                    mb={3}
                    sx={{
                        backgroundColor: '#313852',
                        color: '#FFFFFF',
                        padding: '10px',
                        borderRadius: '4px',
                    }}
                >Update Project</MDTypography>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Label"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            variant="outlined"
                        />
                    </FormControl>


                    {error && <MDTypography variant="body2" color="error">{error}</MDTypography>}
                    <MDBox mt={2} display="flex" justifyContent="flex-end"  >
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
                        }} onClick={handleSubmit}>Update</Button>
                    </MDBox>
                </form>
            </MDBox>
        </PageLayout>

    );
};



export default UpdateProject;