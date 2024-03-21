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


const createDemand = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [start_date, setstart_date] = useState(new Date());
    const [end_date, setEnd_date] = useState(new Date());
    const [estimation, setEstimation] = useState("")
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
            if (!title || !description || !start_date || !end_date || !estimation) {
                setError('All fields are required.');
                return;
            }
            await axios.post("http://localhost:4000/demand", { title, description, start_date, end_date, estimation });
            navigate('/tables/demandTables/demandTable');
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    };
    const handleCancel = () => {
        navigate('/tables/demandTables/demandTable');
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
                }} >Add New Demand</MDTypography>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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

                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Start Date"
                            type="date"
                            value={formatDate(start_date)}
                            onChange={(e) => setstart_date(new Date(e.target.value))}
                            fullWidth
                            style={{ marginTop: '8px' }}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="End Date"
                            type="date"
                            value={formatDate(end_date)}
                            onChange={(e) => setEnd_date(new Date(e.target.value))}
                            fullWidth
                            style={{ marginTop: '8px' }}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Estimation"
                            value={estimation}
                            onChange={(e) => setEstimation(e.target.value)}
                            fullWidth
                            style={{ marginTop: '8px' }}
                        />
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



export default createDemand;