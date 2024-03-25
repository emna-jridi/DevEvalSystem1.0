/* eslint-disable */
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import IconButton from "@mui/material/IconButton";
// Data
import agentsTableData from "layouts/tables/data/agentTableData";
import { useNavigate } from "react-router-dom";
import Icon from "@mui/material/Icon";
import { useState } from "react";
import { Pagination, PaginationItem, TablePagination } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
function AgentTables() {
  const { columns, rows } = agentsTableData();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  const handleAddAgent = () => {
    navigate("/agents/create");
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
                <MDTypography variant="h6" color="white"sx={{ fontSize: "1rem" }}>
                  Agents Table
                </MDTypography>
                <IconButton
                  onClick={handleAddAgent}
                  color="white"
                  sx={{ flexDirection: "column", alignItems: "center" ,fontSize: "1rem" }}
                >
                  <Icon fontSize="medium">person_add</Icon>
                  {/* <MDTypography variant="overline" align="center" color="white">
                    Add
                  </MDTypography> */}
                </IconButton>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows: getCurrentPageEntries() }}
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

export default AgentTables;
