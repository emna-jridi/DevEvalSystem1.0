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
// @mui material components
import Icon from "@mui/material/Icon";
import { IconButton, Menu, MenuItem } from "@mui/material";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function data() {
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
        const response = await axios.get("http://localhost:4000/employees");
        const donneesReponse = response.data.employees;
        const tableau = donneesReponse.map((donnee, index) => ({
          Employee: <Employee fullName={donnee.fullName} />,
          Email: <Email email={donnee.email} />,
          Position: <Position Position={donnee.position} />,
          Rank: <Rank rank={donnee.rank} />,
          EmployedAt: <EmployedAt entryDate={donnee.entryDate} />,
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
                <MenuItem onClick={() => handleDeleteEmployee(donnee.email)}>Delete</MenuItem>
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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString("en-US", options);
    return formattedDate;
  };
  const handleDeleteEmployee = async (email) => {
    try {
      await axios.delete(`http://localhost:4000/employee/${email}`);
      const updatedRows = rows.filter((row) => row.Email === email);
      setRows(updatedRows);
      handleCloseMenu();
    } catch (error) {
      console.log(error);
    }
  };


  const Employee = ({ fullName }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar name={fullName} size="sm" variant="rounded" /> */}
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
  const Position = ({ Position }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{Position}</MDTypography>
    </MDBox>
  );
  const Rank = ({ rank }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{rank}</MDTypography>
    </MDBox>
  );
  const EmployedAt = ({ entryDate }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{formatDate(entryDate)}</MDTypography>
    </MDBox>
  );
  // const Progress = ({ color, value }) => (
  //   <MDBox display="flex" alignItems="center">
  //     <MDTypography variant="caption" color="text" fontWeight="medium">
  //       {value}%
  //     </MDTypography>
  //     <MDBox ml={0.5} width="9rem">
  //       <MDProgress variant="gradient" color={color} value={value} />
  //     </MDBox>
  //   </MDBox>
  // );

  return {
    columns: [
      { Header: "Employee", accessor: "Employee", width: "30%", align: "left" },
      { Header: "Email", accessor: "Email", align: "left" },
      { Header: "Position", accessor: "Position", align: "center" },
      { Header: "Rank", accessor: "Rank", align: "center" },
      { Header: "EmployedAt", accessor: "EmployedAt", align: "center" },
      { Header: "Action", accessor: "Action", width: "10%", align: "center" },
    ],

    rows,
  };
}
