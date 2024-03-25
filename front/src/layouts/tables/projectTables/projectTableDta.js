/* eslint-disable */
import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import { useNavigate } from "react-router-dom";

export default function Data() {
  const [rows, setRows] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");

  const handleOpenMenu = (event, label) => {
    setOpenMenu(event.currentTarget);
    setSelectedLabel(label);
  };
  const handleMenuAction = (action, selectedLabel, label, description) => {
    if (action === "update") {
      navigate("/project/edit", { state: { label, description } });
    } else if (action === "delete") {
      handleDeleteProject(selectedLabel);
    }
  };
  const handleCloseMenu = () => {
    setOpenMenu(null);
    setSelectedLabel(null);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/projects`);
        const donneesReponse = response.data.Projects;

        const tableau = donneesReponse.map((donnee, index) => {
          return {
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
                      handleMenuAction("update", selectedLabel, donnee.label, donnee.description)
                    }
                  >
                    Update
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuAction("delete", selectedLabel, donnee.label, donnee.description)}>
                    Delete
                  </MenuItem>
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

  const handleDeleteProject = async (label) => {
    try {
      await axios.delete(`http://localhost:4000/project/${label}`);
      const updatedRows = rows.filter((row) => row.Project.props.label === label);
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
  };
}
