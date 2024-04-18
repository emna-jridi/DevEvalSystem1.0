/* eslint-disable */
/* eslint-disable */
import { useLoading } from "../LoadingContext";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pagination, PaginationItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CircularProgress from "@mui/material/CircularProgress";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { formatDate } from "../utils";
import demandTableData from "layouts/tables/demandTables/demandTableData";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { Button, MenuItem, Select, styled } from "@mui/material";
import MDBox from "components/MDBox";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import AlertDialog from "../data/AlertDialog";
import formatDemandRow from "./formatDemandRow";

function CustomFilter({ projects, onFilterChange, selectedValue }) {
  const handleFilterChange = (event) => {
    const { value } = event.target;
 
    onFilterChange(value === "all" ? "" : value);
  };
  return (
    <Select
      value={selectedValue}
      onChange={handleFilterChange}
      displayEmpty
      inputProps={{ "aria-label": "Select Project" }}
      sx={{
        color: "#15192B",
        fontSize: "0.8rem",
        paddingTop: "10px",
        paddingBottom: "10px",
        marginRight: "15px",
      }}
    >
      <MenuItem value="" disabled>
        Select Project
      </MenuItem>
      <MenuItem value="all">All</MenuItem> 
      {projects.map((project) => (
        <MenuItem key={project.id} value={project.label} sx={{ textAlign: "center" }}>
          {project.label}
        </MenuItem>
      ))}
    </Select>
  );
}
function CustomReleaseFilter({ releases, onFilterChange, selectedValue }) {
  const handleReleaseFilterChange = (event) => {
    const { value } = event.target;
    onFilterChange(value === "all" ? "" : value);
  };
  return (
    <Select
      value={selectedValue}
      onChange={handleReleaseFilterChange}
      displayEmpty
      inputProps={{ "aria-label": "Select Release" }}
      sx={{
        color: "#15192B",
        fontSize: "0.8rem",
        paddingTop: "10px",
        paddingBottom: "10px",
      }}
    >
      <MenuItem value="" disabled>
        Select Release
      </MenuItem>
      <MenuItem value="all">All</MenuItem>
      {releases.map((release) => (
        <MenuItem key={release.id} value={release.name} sx={{ textAlign: "center" }}>
          {release.name}
        </MenuItem>
      ))}
    </Select>
  );
}

const initialState = {
  projects: [],
  releases: [],
  currentPage: 1,
  filterValue: "",
  loading: true,
  filterRelease: "",
  initialRows: [],
  filteredRows: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_INITIAL_DATA":
      return {
        ...state,
        projects: action.payload.projects,
        releases: action.payload.releases,
        loading: false,
      };
    case "SET_INITIAL_ROWS":
      return {
        ...state,
        initialRows: action.payload.initialRows,
      };
    case "SET_FILTER_VALUE":
      return {
        ...state,
        filterValue: action.payload.filterValue,
        currentPage: 1,
      };
    case "SET_FILTERED_ROWS":
      return {
        ...state,
        filteredRows: action.payload.filteredRows,
      };
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.payload.currentPage,
      };
    case "SET_FILTER_RELEASE":
      return {
        ...state,
        filterRelease: action.payload.filterRelease,
        currentPage: 1,
      };
    default:
      return state;
  }
};

function DemandTables() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const { columns, rows } = demandTableData();
  const { loading } = useLoading();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedRelease, setSelectedRelease] = useState("");

  const entriesPerPage = 5;

  const totalEntries = rows.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const [projectsResponse, releasesResponse] = await Promise.all([
          axios.get(`projects`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`releases`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        const projectsData = projectsResponse.data.Projects;
        const releasesData = releasesResponse.data.Releases;
        dispatch({
          type: "SET_INITIAL_DATA",
          payload: { projects: projectsData, releases: releasesData },
        });
        console.log("releases", state.releases);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`demands`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const donneesReponse = response.data.Demands;
        const formattedRows = donneesReponse.map((donnee, index) => ({
          id: donnee.id,
          description: donnee.description,
          end_date: donnee.end_date,
          estimation: donnee.estimation,
          release: {
            assignedProject: { label: donnee.release.assignedProject.label },
            name: donnee.release.name,
          },
          start_date: donnee.start_date,
          title: donnee.title,
        }));
        dispatch({ type: "SET_INITIAL_ROWS", payload: { initialRows: formattedRows } });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filterRows = () => {
      const trimmedValue = state.filterValue.trim();
      const filterFunction = (row) => {
        const rowLabel = row.release.assignedProject.label;
        return rowLabel === trimmedValue;
      };
      const filteredRows = state.initialRows.filter(filterFunction);
      dispatch({ type: "SET_FILTERED_ROWS", payload: { filteredRows } });
    };

    filterRows();
  }, [state.filterValue, state.initialRows]);

  const handleAddRelease = () => {
    navigate("/demand/create");
  };
  const handleDeleteDemand = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`demand/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedRows = state.filteredRows.filter((row) => row.id !== id);
      dispatch({ type: "SET_FILTERED_ROWS", payload: { filteredRows: updatedRows } });
      setOpenConfirmation(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleReleaseFilterChange = (value) => {
    setSelectedRelease(value);
    dispatch({ type: "SET_FILTER_RELEASE", payload: { filterRelease: value } });
   
    if (state.filterValue !== "") {
      dispatch({ type: "SET_FILTER_VALUE", payload: { filterValue: "" } });
      setSelectedProject("");
    }
  }
  useEffect(() => {
    const filterRowsByRelease = () => {
      const trimmedValue = state.filterRelease.trim();
      const filterFunction = (row) => {
        const rowReleaseName = row.release.name;
        return rowReleaseName === trimmedValue;
      };
      const filteredRows = state.initialRows.filter(filterFunction);
      dispatch({ type: "SET_FILTERED_ROWS", payload: { filteredRows } });
    };
  
    filterRowsByRelease();
  }, [state.filterRelease, state.initialRows]);
  const handlePageChange = (page) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: { currentPage: page } });
  };
  const handleFilterChange = (value) => {
    setSelectedProject(value);
    dispatch({ type: "SET_FILTER_VALUE", payload: { filterValue: value } });
    if (state.filterRelease !== "") {
      dispatch({ type: "SET_FILTER_RELEASE", payload: { filterRelease: "" } });
      setSelectedRelease("");
    }
  };

  const formattedFilteredRows = state.filteredRows.map((donnee, index) =>
    formatDemandRow(donnee, index, setOpenConfirmation, handleDeleteDemand, navigate)
  );

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
                  <MDTypography variant="h6" color="white">
                    Demands Table
                  </MDTypography>
                  <IconButton onClick={handleAddRelease} color="white">
                    <AddCircleOutlineIcon fontSize="medium"></AddCircleOutlineIcon>
                  </IconButton>
                </MDBox>
              )}
              <MDBox pt={2}>
                <Stack direction="row" sx={{ marginRight: "80px" }} justifyContent="flex-end">
                  {" "}
                  <CustomFilter
                    projects={state.projects}
                    onFilterChange={handleFilterChange}
                    selectedValue={selectedProject}
                  />
                  <CustomReleaseFilter
                    releases={state.releases}
                    onFilterChange={handleReleaseFilterChange}
                    selectedValue={selectedRelease}
                  />
                  {/* <Button size="small">Add new Demand </Button> */}
                </Stack>
              </MDBox>

              <MDBox pt={3}>
                {!loading && (
                  <DataTable
                    table={{
                      columns,
                      rows: state.filterValue || state.filterRelease ? formattedFilteredRows : rows,
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
            page={state.currentPage}
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

export default DemandTables;
