/* eslint-disable */
import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import { useNavigate } from "react-router-dom";
import AlertDialog from "../data/AlertDialog";

export default function Data() {
  const [rows, setRows] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const token = localStorage.getItem("accessToken");

  const handleOpenMenu = (event, label) => {
    setOpenMenu(event.currentTarget);
    setSelectedLabel(label);
  };
  const handleMenuAction = (action, selectedLabel, id, label, description) => {
    if (action === "update") {
      navigate("/projects/edit", { state: { id, label, description } });
    } else if (action === "delete") {
      setOpenConfirmation(true);
    }
  };
  const handleCloseMenu = () => {
    setOpenMenu(null);
    setSelectedLabel(null);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`projects`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const donneesReponse = response.data.Projects;

        const tableau = donneesReponse.map((donnee, index) => {
          return {
            id: donnee.id,
            Project: <Project label={donnee.label} />,
            Description: <Description description={donnee.description} />,
            Action: (
              <MDBox key={index}>
                <IconButton onClick={(event) => handleOpenMenu(event, donnee.label)}>
                  <Icon fontSize="small">settings</Icon>
                </IconButton>
                <Menu
                  anchorEl={openMenu}
                  open={Boolean(openMenu && selectedLabel === donnee.label)}
                  onClose={handleCloseMenu}
                >
                  <MenuItem
                    onClick={() =>
                      handleMenuAction(
                        "update",
                        selectedLabel,
                        donnee.id,
                        donnee.label,
                        donnee.description
                      )
                    }
                  >
                    Update
                  </MenuItem>
                  <AlertDialog handleDelete={() => handleDeleteProject(donnee.id)} />
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
  }, [openMenu, selectedLabel]);

  const handleDeleteProject = async (id) => {
    try {
      await axios.delete(`project/${id}`, {
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
  const Project = ({ label }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {label}
      </MDTypography>
    </MDBox>
  );

  const Description = ({ description }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  //   const Role = ({ role }) => (
  //     <MDBox display="flex" alignItems="center" lineHeight={1}>
  //       <MDTypography variant="caption">{role}</MDTypography>
  //     </MDBox>
  //   );

  return {
    columns: [
      { Header: "Project", accessor: "Project", width: "30%", align: "left" },
      { Header: "Description", accessor: "Description", width: "30%", align: "left" },
      // { Header: "Role", accessor: "Role", width: "20%", align: "left" },
      { Header: "Action", accessor: "Action", width: "10%", align: "center" },
    ],
    rows,
    confirmationDialog: (
      <AlertDialog open={openConfirmation} handleClose={() => setOpenConfirmation(false)} />
    ),
  };
}
