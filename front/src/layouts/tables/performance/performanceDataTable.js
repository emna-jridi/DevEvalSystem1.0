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


export default function Data() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [deletedItemId, setDeletedItemId] = useState(null);
  const { setLoading } = useLoading();
  const token = localStorage.getItem("accessToken");
  const [releaseName, setReleaseName] = useState("");
  const [selectedEmployee, setEmployee] = useState("");
  const location = useLocation();
  const handleUpdate = (id, rowData) => {
    navigate("/employees/performance/edit", { state: { rowData } });
  };
  useEffect(() => {
    if (location.state) {
      const release = location.state.selectedRelease;
      const employeeName = location.state.employeeName;
      setEmployee(employeeName);
      setReleaseName(release);
    }
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`ratings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const donneesReponse = response.data.performanceReports;
        const filteredData = donneesReponse.filter(
          (donnee) =>
            donnee.demand.releaseName === releaseName && donnee.employee.fullName === selectedEmployee
        );

        const tableau = filteredData.map((donnee, index) => {
          return {
            id: donnee.id,
            Employee: <Employee fullName={donnee.employee.fullName} />,
            Demand: <Demand title={donnee.demand.title} />,
            Estimation: <Estimation estimation={donnee.estimation} />,
            CodeQuality: <CodeQuality codeQuality={donnee.total} />,
            Conformity: <Conformity conformity={donnee.conformity} />,
            MajorBugs: <MajorBugs majorBugs={donnee.majorBugs} />,
            MinorBugs: <MinorBugs minorBugs={donnee.minorBugs} />,
            codeOptimization: donnee.codeOptimization,
            perfermance: donnee.perfermance,
            commentedCode: donnee.commentedCode,
            translation: donnee.translation,
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

        const totalScore = calculateTotalScore(tableau);
        const scoreRow = {
          id: "score",
          Employee: <MDTypography variant="caption">Score</MDTypography>,
          Demand: <MDTypography variant="caption">{totalScore.Demand}</MDTypography>,
          Estimation: <MDTypography variant="caption">{totalScore.Estimation}</MDTypography>,
          CodeQuality: <MDTypography variant="caption">{totalScore.CodeQuality}</MDTypography>,
          Conformity: <MDTypography variant="caption">{totalScore.Conformity}</MDTypography>,
          MajorBugs: <MDTypography variant="caption">{totalScore.MajorBugs}</MDTypography>,
          MinorBugs: <MDTypography variant="caption">{totalScore.MinorBugs}</MDTypography>,
          Action: null,
          sx: {
            backgroundColor: "#f2f2f2", 
          },
        };

        const updatedRows = [...tableau, scoreRow];
        setRows(updatedRows);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [deletedItemId, releaseName, selectedEmployee]);

  const handleConfirmDelete = async (id) => {
    try {
      await axios.delete(`/rating/${id}`, {
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

  const calculateTotalScore = (tableau) => {
    let totalDemand = 0;
    let totalEstimation = 0;
    let totalCodeQuality = 0;
    let totalConformity = 0;
    let totalMajorBugs = 0;
    let totalMinorBugs = 0;

    tableau.forEach((row) => {
      totalDemand += 1;
      totalEstimation += parseFloat(row.Estimation.props.estimation);
      totalCodeQuality += parseFloat(row.CodeQuality.props.codeQuality);
      totalConformity += parseFloat(row.Conformity.props.conformity);
      totalMajorBugs += parseFloat(row.MajorBugs.props.majorBugs);
      totalMinorBugs += parseFloat(row.MinorBugs.props.minorBugs);
    });

    return {
      Demand: totalDemand,
      Estimation: totalEstimation,
      CodeQuality: totalCodeQuality,
      Conformity: totalConformity,
      MajorBugs: totalMajorBugs,
      MinorBugs: totalMinorBugs,
    };
  };



  const Employee = ({ fullName }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {fullName}
      </MDTypography>
    </MDBox>
  );

  const Demand = ({ title }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{title}</MDTypography>
    </MDBox>
  );

  const Estimation = ({ estimation }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{estimation}</MDTypography>
    </MDBox>
  );
  const CodeQuality = ({ codeQuality }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{codeQuality}</MDTypography>
    </MDBox>
  );
  const Conformity = ({ conformity }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{conformity}</MDTypography>
    </MDBox>
  );

  const MajorBugs = ({ majorBugs }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{majorBugs}</MDTypography>
    </MDBox>
  );

  const MinorBugs = ({ minorBugs }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{minorBugs}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Employee", accessor: "Employee", width: "30%", align: "center" },
      { Header: "Demand", accessor: "Demand", width: "30%", align: "center" },
      { Header: "Estimation", accessor: "Estimation", width: "22%", align: "center" },
      { Header: "CodeQuality", accessor: "CodeQuality", width: "10%", align: "center" },
      { Header: "Conformity", accessor: "Conformity", width: "10%", align: "center" },
      { Header: "MajorBugs", accessor: "MajorBugs", width: "10%", align: "center" },
      { Header: "MinorBugs", accessor: "MinorBugs", width: "10%", align: "center" },
      { Header: "Action", accessor: "Action", width: "10%", align: "center" },
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