/* eslint-disable */
import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import { useNavigate } from "react-router-dom";
import AlertDialog from "../data/AlertDialog";
import { formatDate } from '../utils';
export default function Data() {
  const [rows, setRows] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const token = localStorage.getItem("accessToken");

  const handleOpenMenu = (event, title) => {
    setOpenMenu(event.currentTarget);
    setSelectedTitle(title);
  };

  const handleMenuAction = (
    action,
    selectedTitle,
    id, 
    title,
    description,
    start_date,
    end_date,
    estimation,
    releaseName
  ) => {
    if (action === "update") {
      navigate("/demand/edit", { state: { id,title, description, start_date, end_date, estimation , releaseName } });
      
    } else if (action === "delete") {
      setOpenConfirmation(true);
    }
  };
  const handleCloseMenu = () => {
    setOpenMenu(null);
    setSelectedTitle(null);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`demands`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const donneesReponse = response.data.Demands;
        console.log(donneesReponse);
        const tableau = donneesReponse.map((donnee, index) => {
          return {
            id : donnee.id, 
            Demand: <Demand title={donnee.title} />,
            Description: <Description description={donnee.description} />,
            StartDate: <StartDate startDate={donnee.start_date} />,
            EndDate: <EndDate endDate={donnee.end_date} />,
            Estimation: <Estimation estimation={donnee.estimation} />,
            Release: <Release release={donnee.release.name} />,
            Project: <Project project={donnee.release.assignedProject.label} />,  
            Action: (
              <MDBox key={index}>
                <IconButton onClick={(event) => handleOpenMenu(event, donnee.title)}>
                  <Icon fontSize="small">settings</Icon>
                </IconButton>
                <Menu
                  anchorEl={openMenu}
                  open={Boolean(openMenu && selectedTitle === donnee.title)}
                  onClose={handleCloseMenu}
                >
                  <MenuItem
                    onClick={() =>
                      handleMenuAction(
                        "update",
                        selectedTitle,
                        donnee.id,
                        donnee.title,
                        donnee.description,
                        donnee.start_date,
                        donnee.end_date,
                        donnee.estimation,
                        donnee.release.name,
                      )
                    }
                  >
                    Update
                  </MenuItem>
                  <AlertDialog handleDelete={() => handleDeleteDemand(donnee.id)} />
                </Menu>
              </MDBox>
            ),
          };
        });
        setRows(tableau);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [openMenu, selectedTitle]);

  const handleDeleteDemand = async (id) => {
    try {
      await axios.delete(`demand/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedRows = rows.filter((row) => row.id !== id);
      setRows(updatedRows);
      handleCloseMenu();
    } catch (error) {
      console.log(error);
    }
  };
  const Demand = ({ title }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {title}
      </MDTypography>
    </MDBox>
  );

  const Description = ({ description }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );
  const StartDate = ({ startDate }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{formatDate(startDate)}</MDTypography>
    </MDBox>
  );

  const EndDate = ({ endDate }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{formatDate(endDate)}</MDTypography>
    </MDBox>
  );

  const Estimation = ({ estimation }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{estimation}</MDTypography>
    </MDBox>
  );
  const Release = ({ release }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{release}</MDTypography>
    </MDBox>
  );

  const Project = ({ project }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{project}</MDTypography>
    </MDBox>
  );
  return {
    columns: [
      { Header: "Demand", accessor: "Demand", width: "20%", align: "left" },
      { Header: "Description", accessor: "Description", width: "28%", align: "left" },
      { Header: "Start At", accessor: "StartDate", width: "12%", align: "center" },
      { Header: "End At", accessor: "EndDate", width: "12%", align: "center" },
      { Header: "Estimation (H)", accessor: "Estimation", width: "15%", align: "center" },
      { Header: " Release", accessor: "Release", width: "20%", align: "center" },
      { Header: "Project", accessor: "Project", width: "20%", align: "center" },
      { Header: "Action", accessor: "Action", width: "15%", align: "center" },
    ],
    rows,
    confirmationDialog: (
      <AlertDialog open={openConfirmation} handleClose={() => setOpenConfirmation(false)} />
    ),
  };
}
