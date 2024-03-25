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
import React, { useState, useEffect } from "react";
import axios from "axios";
import { IconButton, Menu, MenuItem } from "@mui/material";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useNavigate } from 'react-router-dom';

export default function data() {
  const [rows, setRows] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");


  const handleMenuAction = (action, selectedEmail, email, fullName, position,rank ,entryDate,) => {
    if (action === "update") {
      navigate('/employees/edit',{state:{ email, fullName, position,rank ,entryDate}} );
    } else if (action === "delete") {
      handleDeleteEmployee(selectedEmail);
    }
  };

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
                <MenuItem onClick={() => handleMenuAction("update",selectedEmail, donnee.email,donnee.fullName,donnee.position  ,donnee.rank , donnee.entryDate)}>Update</MenuItem>
                <MenuItem onClick={() => handleMenuAction("delete" ,selectedEmail, donnee.email,donnee.fullName,donnee.position ,  donnee.rank , donnee.entryDate)}>Delete</MenuItem>
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
  }, [openMenu, selectedEmail,]);


  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString("en-US", options);
    return formattedDate;
  };

  const handleDeleteEmployee = async (email) => {
    try {
      await axios.delete(`http://localhost:4000/employee/${email}`);
      const updatedRows = rows.filter((row) => row.Email.props.email !== email);
      setRows(updatedRows);
      handleCloseMenu();
    } catch (error) {
      console.log(error);
    }
  };

  const Employee = ({ fullName }) => (
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

 

  return {
    columns: [
      { Header: "Employee", accessor: "Employee", width: "30%", align: "left" },
      { Header: "Email", accessor: "Email", align: "left" },
      { Header: "Position", accessor: "Position", align: "center" },
      { Header: "Rank", accessor: "Rank", align: "center" },
      { Header: "Employed At", accessor: "EmployedAt", align: "center" },
      { Header: "Action", accessor: "Action", width: "10%", align: "center" },
    ],rows , 

  };
}
