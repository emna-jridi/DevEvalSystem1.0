/* eslint-disable */
import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import { useNavigate } from "react-router-dom";
import AlertDialog from "../data/AlertDialog";
import { formatDate } from "../utils";
export default function Data() {
  const [rows, setRows] = useState([]);
  const [selectedName, setSelectedName] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const token = localStorage.getItem("accessToken");

  const handleOpenMenu = (event, name) => {
    setOpenMenu(event.currentTarget);
    setSelectedName(name);
  };
  const handleMenuAction = (
    action,
    selectedName,
    id,
    name,
    description,
    start_date,
    end_date,
    project
  ) => {
    if (action === "update") {
      navigate("/release/edit", {
        state: { id, name, description, start_date, end_date, project },
      });
    } else if (action === "delete") {
      setOpenConfirmation(true);
    }
  };
  const handleCloseMenu = () => {
    setOpenMenu(null);
    setSelectedName(null);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`releases`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const donneesReponse = response.data.Releases;
        const tableau = donneesReponse.map((donnee, index) => {
          return {
            id: donnee.id,
            Release: <Release name={donnee.name} />,
            Description: <Description description={donnee.description} />,
            StartDate: <StartDate startDate={donnee.start_date} />,
            EndDate: <EndDate endDate={donnee.end_date} />,
            AssignedTo: <AssignedTo AssignedTo={donnee.assignedProject} />,
            Action: (
              <MDBox key={index}>
                <IconButton onClick={(event) => handleOpenMenu(event, donnee.name)}>
                  <Icon fontSize="small">settings</Icon>
                </IconButton>
                <Menu
                  anchorEl={openMenu}
                  open={Boolean(openMenu && selectedName === donnee.name)}
                  onClose={handleCloseMenu}
                >
                  <MenuItem
                    onClick={() =>
                      handleMenuAction(
                        "update",
                        selectedName,
                        donnee.id,
                        donnee.name,
                        donnee.description,
                        donnee.start_date,
                        donnee.end_date,
                        donnee.assignedProject
                      )
                    }
                  >
                    Update
                  </MenuItem>
                  <AlertDialog handleDelete={() => handleDeleteRelease(donnee.id)} />
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
  }, [openMenu, selectedName]);

  const handleDeleteRelease = async (id) => {
    try {
      await axios.delete(`release/${id}`, {
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
  const Release = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
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
  const AssignedTo = ({ AssignedTo }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{AssignedTo}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Release", accessor: "Release", width: "20%", align: "left" },
      { Header: "Description", accessor: "Description", width: "30%", align: "left" },
      { Header: "Start At", accessor: "StartDate", width: "15%", align: "left" },
      { Header: "End At", accessor: "EndDate", width: "15%", align: "left" },
      { Header: "Project", accessor: "AssignedTo", width: "20%", align: "center" },
      { Header: "Action", accessor: "Action", width: "10%", align: "center" },
    ],
    rows,
    confirmationDialog: (
      <AlertDialog open={openConfirmation} handleClose={() => setOpenConfirmation(false)} />
    ),
  };
}
