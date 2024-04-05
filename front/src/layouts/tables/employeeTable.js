/* eslint-disable */
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import axios from "axios";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import IconButton from "@mui/material/IconButton";

// Data
import employeeTableData from "layouts/tables/data/employeeTableData";
import Icon from "@mui/material/Icon";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Pagination, PaginationItem, TablePagination } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import config from "../../config.json"
function EmployeesTables() {
  const { columns: pColumns, rows: pRows } = employeeTableData();
  const [role , setRole] = useState("")

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;
  const navigate = useNavigate();

  
    const token = localStorage.getItem('accessToken');
  const handleAddEmployee = () => {
    navigate('/employees/create');
  };

  const fetchUserDetails = async (token) => {
    try {
      
          const response = await axios.get('userDetails', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRole(response.data.role);
    } catch (error) {
      console.error('ERROR :', error);
    }
  };
  fetchUserDetails(token);

  const totalEntries = pRows.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const getCurrentPageEntries = () => {
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    return pRows.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
                  Employees Table
                </MDTypography>
                {(role === config.ROLES.RPA ||role === config.ROLES.RA  )&& (
                  <IconButton onClick={handleAddEmployee} color="white">
                    <Icon fontSize="medium">person_add</Icon>
                  </IconButton>
                )}
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: getCurrentPageEntries() }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
        <MDBox pt={3} display="flex" alignItems="center" justifyContent="center" textAlign="center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => handlePageChange(page)}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default EmployeesTables;
