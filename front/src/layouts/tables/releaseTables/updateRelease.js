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



const UpdateRelease = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [start_date, setstart_date] = useState(new Date());
    const [end_date, setEnd_date] = useState(new Date());
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            const { name, description, start_date, end_date } = location.state;
            setName(name);
            setDescription(description);
            setstart_date(start_date);
            setEnd_date(end_date)

        }
    }, [location]);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const handleSubmit = async () => {
        try {
            if (!name || !description || !start_date || !end_date) {
                setError("All fields are required.");
                return;
            }
            await axios.put(`http://localhost:4000/release/${name}`, { name, description, start_date, end_date },);
            console.log("done");
            navigate('/tables/releaseTables/releaseTable');
        } catch (error) {
            console.error("Error adding agent:", error);
        }
    };
    const handleCancel = () => {
        navigate('/tables/releaseTables/releaseTable');
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
                >Update Release</MDTypography>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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



export default UpdateRelease;