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
import {
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useNavigate } from "react-router-dom";
import AlertDialog from "./AlertDialog";
import CustomizedDialogs from "../demandTables/CustomizedDialogs";
import config from "../../../config.json"
import { formatDate } from '../utils';
//import conste from "shared/ConstConfig"


export default function Data() {
  const [rows, setRows] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const token = localStorage.getItem("accessToken");

  const fetchUserDetails = async (token) => {
    try {
      const response = await axios.get("userDetails", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRole(response.data.role);
    } catch (error) {
      console.error("ERROR :", error);
    }
  };

  fetchUserDetails(token);



  function formatPhoneNumber(phoneNumber) {
    phoneNumber = phoneNumber.toString();
    if (phoneNumber.startsWith("216")) {
      return phoneNumber.slice(3);
    }
    return phoneNumber;
  }

  let columns = [
    { Header: "Employee", accessor: "Employee", width: "25%", align: "left" },
    { Header: "Email", accessor: "Email", align: "left" },
    { Header: "Phone Number", accessor: "PhoneNumber", align: "center" },
    { Header: "Position", accessor: "Position", align: "center" },
    { Header: "Employed At", accessor: "EmployedAt", align: "center" },
    { Header: "Emergency Number", accessor: "EmergencyNumber", align: "center" },
    { Header: "Rank", accessor: "Rank", align: "center" },
  ];

  if (role === config.ROLES.RTA) {
  } else {
    columns.push(
      { Header: "More", accessor: "More", align: "center" },
      { Header: "Action", accessor: "Action", width: "10%", align: "center" }
    );
  }

  const handleMenuAction = (
    action,
    email,
    id,
    fullName,
    phoneNumber,
    civilState,
    dependents,
    contract,
    position,
    entryDate,
    salary,
    RIB,
    cnssNumber,
    emergencyNumber,
    hierarchicalSuperior,
    leaveBalance,
    lastNegotiationDate,
    rank
  ) => {
    if (action === "update") {
      navigate("/employees/edit", {
        state: {
          email,
          id,
          fullName,
          phoneNumber,
          civilState,
          dependents,
          contract,
          position,
          entryDate,
          salary,
          RIB,
          cnssNumber,
          emergencyNumber,
          hierarchicalSuperior,
          leaveBalance,
          lastNegotiationDate,
          rank,
        },
      });
    } else if (action === "delete") {
      setOpenConfirmation(true);
  
    }
  };

  const handleOpenMenu = (event, email, employee) => {
    setOpenMenu(event.currentTarget);
    setSelectedEmail(email);
    setSelectedEmployee(employee);
  
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
    setSelectedEmail(null);
  };

  const handleConfirmDelete = async ( id ) => {
    try {
      await axios.delete(`employee/${id}`,{
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

  const handleCancelDelete = () => {
    setSelectedEmail(null);
    setOpenConfirmation(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("employees",{
          headers: {
            Authorization: `Bearer ${token}`,
          },
    });
        const donneesReponse = response.data.employees;
        const tableau = donneesReponse.map((donnee, index) => ({
          id: donnee.id,
          Employee: <Employee fullName={donnee.fullName} />,
          Email: <Email email={donnee.email} />,
          PhoneNumber: <PhoneNumber phoneNumber={donnee.phoneNumber} />,
          CivilState: <CivilState civilState={donnee.civilState} />,
          Dependents: <Dependents dependents={donnee.dependents} />,
          Contract: <Contract contract={donnee.contract} />,
          Position: <Position Position={donnee.position} />,
          EmployedAt: <EmployedAt entryDate={donnee.entryDate} />,
          Salary: <Salary salary={donnee.salary} />,
          RIB: <RIB RIB={donnee.RIB} />,
          CnssNumber: <CnssNumber cnssNumber={donnee.cnssNumber} />,
          EmergencyNumber: <EmergencyNumber emergencyNumber={donnee.emergencyNumber} />,
          HierarchicalSuperior: (
            <HierarchicalSuperior hierarchicalSuperior={donnee.hierarchicalSuperior} />
          ),
          LeaveBalance: <LeaveBalance leaveBalance={donnee.leaveBalance} />,
          LastNegotiationDate: (
            <LastNegotiationDate lastNegotiationDate={donnee.lastNegotiationDate} />
          ),
          Rank: <Rank rank={donnee.rank} />,
          Action: (
            <MDBox key={index}>
              <IconButton onClick={(event) => handleOpenMenu(event, donnee.email, donnee)}>
                <Icon fontSize="small">settings</Icon>
              </IconButton>
              <Menu
                anchorEl={openMenu}
                open={Boolean(openMenu && selectedEmail === donnee.email)}
                onClose={handleCloseMenu}
              >
                <MenuItem
                  onClick={() => {
                    handleMenuAction(
                      "update",
                      selectedEmail,
                      donnee.id,
                      donnee.fullName,
                      donnee.phoneNumber,
                      donnee.civilState,
                      donnee.dependents,
                      donnee.contract,
                      donnee.position,
                      donnee.entryDate,
                      donnee.salary,
                      donnee.RIB,
                      donnee.cnssNumber,
                      donnee.emergencyNumber,
                      donnee.hierarchicalSuperior,
                      donnee.leaveBalance,
                      donnee.lastNegotiationDate,
                      donnee.rank
                    );
                  }}
                >
                  Update
                </MenuItem>
                <AlertDialog handleDelete={() => handleConfirmDelete(donnee.id)} />
              </Menu>
            </MDBox>
          ),
          More: (
            <MDBox key={index}>
              <CustomizedDialogs employee={donnee} />
            </MDBox>
          ),
        }));
        setRows(tableau);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [openMenu, selectedEmail, selectedEmployee]);

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

  const PhoneNumber = ({ phoneNumber }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{formatPhoneNumber(phoneNumber)}</MDTypography>
    </MDBox>
  );

  const CivilState = ({ civilState }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{civilState}</MDTypography>
    </MDBox>
  );

  const Dependents = ({ dependents }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{dependents}</MDTypography>
    </MDBox>
  );

  const Contract = ({ contract }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{contract}</MDTypography>
    </MDBox>
  );

  const Position = ({ Position }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{Position}</MDTypography>
    </MDBox>
  );

  const EmployedAt = ({ entryDate }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{formatDate(entryDate)}</MDTypography>
    </MDBox>
  );

  const Salary = ({ salary }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{salary}</MDTypography>
    </MDBox>
  );

  const RIB = ({ RIB }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{RIB}</MDTypography>
    </MDBox>
  );

  const CnssNumber = ({ cnssNumber }) => (
    <MDBox display="flex" aligcItems="center" lineHeight={1}>
      <MDTypography variant="caption">{cnssNumber}</MDTypography>
    </MDBox>
  );

  const EmergencyNumber = ({ emergencyNumber }) => (
    <MDBox display="flex" aligcItems="center" lineHeight={1}>
      <MDTypography variant="caption">{formatPhoneNumber(emergencyNumber)}</MDTypography>
    </MDBox>
  );

  const HierarchicalSuperior = ({ hierarchicalSuperior }) => (
    <MDBox display="flex" aligcItems="center" lineHeight={1}>
      <MDTypography variant="caption">{hierarchicalSuperior}</MDTypography>
    </MDBox>
  );

  const LeaveBalance = ({ leaveBalance }) => (
    <MDBox display="flex" aligcItems="center" lineHeight={1}>
      <MDTypography variant="caption">{leaveBalance}</MDTypography>
    </MDBox>
  );

  const LastNegotiationDate = ({ lastNegotiationDate }) => (
    <MDBox display="flex" aligcItems="center" lineHeight={1}>
      <MDTypography variant="caption">{formatDate(lastNegotiationDate)}</MDTypography>
    </MDBox>
  );

  const Rank = ({ rank }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{rank}</MDTypography>
    </MDBox>
  );

  return {
    columns,
    rows,
    confirmationDialog: (
      <AlertDialog open={openConfirmation} handleClose={() => setOpenConfirmation(false)} />
    ),
  };
}
