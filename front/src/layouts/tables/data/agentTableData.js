/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
/* eslint-disable */
import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

import Icon from "@mui/material/Icon";

export default function Data() {
  const [rows, setRows] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleOpenMenu = (event, email) => {
    setOpenMenu(event.currentTarget);
    setSelectedEmail(email);
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
    setSelectedEmail(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/Agents");
        console.log(response);
        const donneesReponse = response.data.agents;
        const tableau = donneesReponse.map((donnee, index) => ({
          Agent: <Agent fullName={donnee.fullName} />,
          Email: <Email email={donnee.email} />,
          Job: <Job job={donnee.job} />,
          Action: (
            <MDBox key={index}>
              <IconButton onClick={(event) => handleOpenMenu(event, donnee.email)}>
                <Icon fontSize="small">settings</Icon>
              </IconButton>
              <Menu
                anchorEl={openMenu}
                open={Boolean(openMenu && selectedEmail === donnee.email)}
                onClose={handleCloseMenu}
              >
                <MenuItem>Update</MenuItem>
                <MenuItem onClick={() => handleDeleteAgent(donnee.email)}>Delete</MenuItem>
              </Menu>
            </MDBox>
          ),
        }));
        setRows(tableau);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [openMenu, selectedEmail]);

  const handleDeleteAgent = async (email) => {
    try {
      await axios.delete(`http://localhost:4000/agent/${email}`);
      const updatedRows = rows.filter((row) => row.Email === email);
      setRows(updatedRows);
      handleCloseMenu();
    } catch (error) {
      console.log(error);
    }
  };
  const Agent = ({ fullName }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {fullName}
      </MDTypography>
    </MDBox>
  );

  const Email = ({ email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{email}</MDTypography>
    </MDBox>
  );

  const Job = ({ job }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{job}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Agent", accessor: "Agent", width: "30%", align: "left" },
      { Header: "Email", accessor: "Email", width: "30%", align: "left" },
      { Header: "Job", accessor: "Job", width: "20%", align: "left" },
      { Header: "Action", accessor: "Action", width: "10%", align: "center" },
    ],
    rows,
  };
}