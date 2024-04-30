import React, { useState, useEffect } from "react";
import { Grid, Card, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Icon from "@mui/material/Icon";
import { Pagination, PaginationItem } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useLoading } from "../LoadingContext";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import performanceDataTable from "layouts/tables/performance/performanceDataTable";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function PerformanceTables() {
  const navigate = useNavigate();
  const { columns, rows } = performanceDataTable();
  const { loading } = useLoading();
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  const handleAddPerformance = () => {
    navigate("/employees/performance/create");
  };

  const totalEntries = rows.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const getCurrentPageEntries = () => {
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    return rows.slice(startIndex, endIndex);
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
              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    p: 3,
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
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
                  <MDTypography variant="h6" color="white" sx={{ fontSize: "1rem" }}>
                    Release
                  </MDTypography>
                  <IconButton
                    onClick={handleAddPerformance}
                    color="white"
                    sx={{
                      flexDirection: "column",
                      alignItems: "center",
                      fontSize: "1rem",
                    }}
                  >
                    <AddCircleOutlineIcon fontSize="medium"></AddCircleOutlineIcon>
                  </IconButton>
                </MDBox>
              )}
              <MDBox pt={3}>
                {!loading && (
                  <DataTable
                    table={{
                      columns,
                      rows: getCurrentPageEntries(),
                    }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                )}
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

export default PerformanceTables;
