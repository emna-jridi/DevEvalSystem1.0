/* eslint-disable */
import React, { useState , useEffect} from 'react';
import { TextField, Button, Snackbar, FormControl, MenuItem, Select, } from '@mui/material';
import axios from 'axios';
import PageLayout from 'examples/LayoutContainers/PageLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import { useNavigate } from "react-router-dom"
export default function AssignProject() {
    const [email, setEmail] = useState('');
    const [label, setLabel] = useState('');
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();


    const handleCancel = () => {
        navigate("/tables/projectTables/projectTable");
    };
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:4000/employees');
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);


    const handleAssignProject = async () => {
        try {
            const response = await axios.post(`http://localhost:4000/project/${label}`, { email });
            setSnackbarMessage(response.data.message);
            setSnackbarOpen(true);
            setEmail('');
            setLabel('');
        } catch (error) {
            setSnackbarMessage('Une erreur est survenue lors de l\'assignation du projet.');
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
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
                <MDTypography variant="h5" align="center" mb={3}
                    sx={{
                        backgroundColor: '#313852',
                        color: '#FFFFFF',
                        padding: '10px',
                        borderRadius: '4px',
                    }}>Assign To :</MDTypography>
                <FormControl fullWidth margin="normal">
                <Select
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    displayEmpty
                >
                    <MenuItem value="" disabled>
                        Sélectionner un employé
                    </MenuItem>
                    {employees.map((employee) => (
                        <MenuItem key={employee.id} value={employee.email}>
                            {employee.email}
                        </MenuItem>
                    ))}
                </Select>
                </FormControl>
                <TextField
                    label="Label du projet"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <MDBox mt={2} display="flex" justifyContent="flex-end">
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
                        variant="contained"
                        color="primary"
                        sx={{
                            backgroundColor: "#15192B",
                            color: "#fff",
                            marginLeft: "8px",
                            "&:hover": {
                                backgroundColor: "#3A4B8A",
                                color: "#fff",
                            },
                        }}
                        onClick={handleAssignProject}
                    >
                        Assigner le projet
                    </Button>
                </MDBox>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    message={snackbarMessage}
                />

            </MDBox>
        </PageLayout>
    );
}