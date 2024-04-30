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
  Select,
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
import config from "../../../config.json";
import { formatDate } from "../utils";
import { Link } from "react-router-dom";
import { useLoading } from "../LoadingContext";
import ReleaseSelectionDialog from "./ReleaseSelectionDialog ";

export default function Data() {
  const [rows, setRows] = useState([]);
  const [releases, setReleases] = useState([]);
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const { setLoading } = useLoading();
  const [updateEmployeeFullName, setSelectedEmployeeName] = useState("");
  const [updateReleaseName, setSelectedRelease] = useState("");

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
    { Header: "Code", accessor: "Code", width: "15%", align: "left" },
    { Header: "Employee", accessor: "Employee", width: "25%", align: "center" },
    { Header: "Email", accessor: "Email", align: "center" },
    { Header: "Position", accessor: "Position", align: "center" },
    { Header: "Rank", accessor: "Rank", align: "center" },
    { Header: "Performance", accessor: "Performance", align: "center" },
  ];

  if (role === config.ROLES.RTA) {
  } else {
    columns.push(
      { Header: "Phone Number", accessor: "PhoneNumber", align: "center" },
      { Header: "Employed At", accessor: "EmployedAt", align: "center" },
    
      { Header: "More", accessor: "More", align: "center", width: "10%" },
      { Header: "Action", accessor: "Action", width: "10%", align: "center" }
    );
  }

  const handleUpdate = (
    email,
    id,
    code,
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
    navigate("/employees/edit", {
      state: {
        email,
        id,
        code,
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
  };

  const handleConfirmDelete = async (id) => {
    try {
      await axios.delete(`employee/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedRows = rows.filter((row) => row.id !== id);
      setRows(updatedRows);
    } catch (error) {
      console.log(error);
    }
  };
  const handleReleaseClick = (release, fullName) => {
    setSelectedRelease(release);
    setSelectedEmployeeName(fullName);
    navigate(`/employees/performance`, { state: { release: release, employee: fullName } }); //nzidou param nom yssir alih research backend
  };

  useEffect(() => {
    const fetchReleaseData = async () => {
      try {
        const response = await axios.get(`releases`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const releasesData = response.data.Releases.map((release) => release.name);
        setReleases((prevReleases) => {
          if (JSON.stringify(prevReleases) !== JSON.stringify(releasesData)) {
            return releasesData;
          }
          return prevReleases;
        });
      } catch (error) {
        console.error("Error :", error);
      }
    };

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("employees", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const donneesReponse = response.data.employees;
        const tableau = donneesReponse.map((donnee, index) => ({
          id: donnee.id,
          Code: <Code code={donnee.code} />,
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
              <IconButton
                onClick={() =>
                  handleUpdate(
                    donnee.email,
                    donnee.id,
                    donnee.code,
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
                  )
                }
              >
                <Icon fontSize="small">edit</Icon>
              </IconButton>
              <IconButton onClick={() => setOpenConfirmation(true)}>
                <AlertDialog handleDelete={() => handleConfirmDelete(donnee.id)} />
              </IconButton>
            </MDBox>
          ),
          More: (
            <MDBox key={index}>
              {/* <CustomizedDialogs employee={donnee} /> */}
              <button
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  font: "inherit",
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/employees/details", { state: { employee: donnee } })}
              >
                Show more
              </button>
            </MDBox>
          ),
          Performance: (
            <MDBox>
              <ReleaseSelectionDialog  employeeName={donnee.fullName} releases={releases} handleReleaseClick={handleReleaseClick} />
            </MDBox>
          ),
        }));
        setRows(tableau);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    fetchReleaseData();
  }, [token, selectedEmployee, releases]);

  const Employee = ({ fullName }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{fullName}</MDTypography>
    </MDBox>
  );
  const Code = ({ code }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {code}
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
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{cnssNumber}</MDTypography>
    </MDBox>
  );

  const EmergencyNumber = ({ emergencyNumber }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{formatPhoneNumber(emergencyNumber)}</MDTypography>
    </MDBox>
  );

  const HierarchicalSuperior = ({ hierarchicalSuperior }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{hierarchicalSuperior}</MDTypography>
    </MDBox>
  );

  const LeaveBalance = ({ leaveBalance }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{leaveBalance}</MDTypography>
    </MDBox>
  );

  const LastNegotiationDate = ({ lastNegotiationDate }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
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
