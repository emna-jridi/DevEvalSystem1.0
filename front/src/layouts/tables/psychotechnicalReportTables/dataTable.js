/* eslint-disable */
import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import { useNavigate, useLocation } from "react-router-dom";
import AlertDialog from "../data/AlertDialog";
import { useLoading } from "../LoadingContext";
import { formatMonthYear } from "../utils";

export default function Data() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [deletedItemId, setDeletedItemId] = useState(null);
  const { setLoading } = useLoading();

  const token = localStorage.getItem("accessToken");
  const handleUpdate = (id, rowData) => {
    navigate("/psychotechnique-reports/edit", { state: { rowData } });
  };

  const getRadioLabel = (value) => {
    switch (value) {
      case 0:
        return "Non compliant";
      case 3:
        return "Compliant";
      case 5:
        return "Super compliant";
      default:
        return "";
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`psychotechnical-reports`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.psychotechnicalReports);
        const donneesReponse = response.data.psychotechnicalReports;
        const tableau = donneesReponse.map((donnee, index) => {
          return {
            id: donnee.id,
            Employee: <Employee fullName={donnee.employee.fullName} />,
            Created_At: <Created_At created_At={donnee.created_At} />,
            AttendanceFrequency: (
              <AttendanceFrequency attendanceFrequency={donnee.attendanceFrequency} />
            ),
            Punctuality: <Punctuality punctuality={donnee.punctuality} />,
            AbsenceCommunication: (
              <AbsenceCommunication absenceCommunication={donnee.absenceCommunication} />
            ),
            TotalAttendance: <TotalAttendance TotalAttendance={donnee.TotalAttendance} />,
            InterpersonalRelationships: (
              <InterpersonalRelationships
                interpersonalRelationships={donnee.interpersonalRelationships}
              />
            ),
            Collaboration: <Collaboration collaboration={donnee.collaboration} />,
            InterpersonalTotal: (
              <InterpersonalTotal InterpersonalTotal={donnee.InterpersonalTotal} />
            ),
            TechEvalRating: <TechEvalRating TechEvalRating={donnee.TechEvalRating} />,
            TechEvaltoatal: <TechEvaltoatal TechEvaltoatal={donnee.TechEvaltoatal} />,
            Total: <Total total={donnee.total} />,
            Action: (
              <MDBox key={index}>
                <IconButton onClick={() => handleUpdate(donnee.id, donnee)}>
                  <Icon fontSize="small">edit</Icon>
                </IconButton>
                <IconButton onClick={() => setOpenConfirmation(true)}>
                  <AlertDialog handleDelete={() => handleConfirmDelete(donnee.id)} />
                </IconButton>
              </MDBox>
            ),
          };
        });
        setRows(tableau);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [deletedItemId]);
  const handleConfirmDelete = async (id) => {
    try {
      await axios.delete(`/psychotechnical-report/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedRows = rows.filter((row) => row.id !== id);
      setRows(updatedRows);
      setOpenConfirmation(false);
      setDeletedItemId(id);
    } catch (error) {
      console.log(error);
    }
  };
  const Employee = ({ fullName }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{fullName}</MDTypography>
    </MDBox>
  );
  const Created_At = ({ created_At }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{formatMonthYear(created_At)}</MDTypography>
    </MDBox>
  );
  const AttendanceFrequency = ({ attendanceFrequency }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{getRadioLabel(attendanceFrequency)}</MDTypography>
    </MDBox>
  );
  const Punctuality = ({ punctuality }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{getRadioLabel(punctuality)}</MDTypography>
    </MDBox>
  );
  const AbsenceCommunication = ({ absenceCommunication }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{getRadioLabel(absenceCommunication)}</MDTypography>
    </MDBox>
  );
  const TotalAttendance = ({ TotalAttendance }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{TotalAttendance}</MDTypography>
    </MDBox>
  );
  const InterpersonalRelationships = ({ interpersonalRelationships }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{getRadioLabel(interpersonalRelationships)}</MDTypography>
    </MDBox>
  );
  const Collaboration = ({ collaboration }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{getRadioLabel(collaboration)}</MDTypography>
    </MDBox>
  );
  const InterpersonalTotal = ({ InterpersonalTotal }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{InterpersonalTotal}</MDTypography>
    </MDBox>
  );
  const TechEvalRating = ({ TechEvalRating }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{getRadioLabel(TechEvalRating)}</MDTypography>
    </MDBox>
  );
  const TechEvaltoatal = ({ TechEvaltoatal }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{TechEvaltoatal}</MDTypography>
    </MDBox>
  );
  const Total = ({ total }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{total}</MDTypography>
    </MDBox>
  );
  return {
    columns: [
      { Header: "Employee", accessor: "Employee", align: "center" },
      { Header: "Attendance Frequency", accessor: "AttendanceFrequency", align: "center" },
      { Header: "Punctuality", accessor: "Punctuality", align: "center" },
      { Header: "Absence Communication", accessor: "AbsenceCommunication", align: "center" },
    //  { Header: "Total Attendance", accessor: "TotalAttendance", align: "center" },
      {
        Header: "Interpersonal Relationships",
        accessor: "InterpersonalRelationships",
        align: "center",
      },
      { Header: "Collaboration", accessor: "Collaboration", align: "center" },
     // { Header: "Interpersonal Total", accessor: "InterpersonalTotal", align: "center" },
      { Header: "TechEval Rating", accessor: "TechEvalRating", align: "center",  },
      //{ Header: "TechEvaltoatal", accessor: "TechEvaltoatal", align: "center" },
      { Header: "Score", accessor: "Total", align: "center",width: "5%",  },  
      { Header: "Created At", accessor: "Created_At", align: "center" },  { Header: "Action", accessor: "Action", width: "5%", align: "center" },
    ],
    rows: rows,
    confirmationDialog: (
      <AlertDialog
        open={openConfirmation}
        handleClose={() => setOpenConfirmation(false)}
        handleAgree={handleConfirmDelete}
        title="Confirm Delete"
      />
    ),
  };
}
