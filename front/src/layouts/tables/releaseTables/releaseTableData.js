/* eslint-disable */
import { IconButton, Menu, MenuItem, styled } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import { useNavigate } from "react-router-dom";
import AlertDialog from "../data/AlertDialog";
import { formatDate } from "../utils";
import { useLoading } from "../LoadingContext";

import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ECEEFF",
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));
export default function Data() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [deletedItemId, setDeletedItemId] = useState(null);

  const { setLoading } = useLoading();
  const token = localStorage.getItem("accessToken");

  const handleUpdate = (id,code, name, description, start_date, end_date, project) => {
    navigate("/release/edit", {
      state: { id, code,name, description, start_date, end_date, project },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`releases`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const donneesReponse = response.data.Releases;
        const tableau = donneesReponse.map((donnee, index) => {
          return {
            id: donnee.id,
            Code: <Code code={donnee.code} />,
            Release: <Release name={donnee.name} />,
            Description: <Description description={donnee.description} />,
            StartDate: <StartDate startDate={donnee.start_date} />,
            EndDate: <EndDate endDate={donnee.end_date} />,
            AssignedTo: <AssignedTo AssignedTo={donnee.assignedProject} />,
            Action: (
              <MDBox key={index}>
                <IconButton
                  onClick={() =>
                    handleUpdate(
                      donnee.id,
                      donnee.code,
                      donnee.name,
                      donnee.description,
                      donnee.start_date,
                      donnee.end_date,
                      donnee.assignedProject
                    )
                  }
                >
                  <Icon fontSize="small">edit</Icon>
                </IconButton>
                <IconButton onClick={() => setOpenConfirmation(true)}>
                  <AlertDialog handleDelete={() => handleDeleteRelease(donnee.id)} />
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

  const handleDeleteRelease = async (id) => {
    try {
      await axios.delete(`release/${id}`, {
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
  const Release = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDTypography variant="caption">
        {name}
      </MDTypography>
    </MDBox>
  );

  const Code = ({ code }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {code}
      </MDTypography>
    </MDBox>
  );
  const Description = ({ description }) => {
    const MAX_DISPLAY_LENGTH = 50;
    let truncatedDescription = description;
    if (description.length > MAX_DISPLAY_LENGTH) {
      truncatedDescription = description.substring(0, MAX_DISPLAY_LENGTH);
      const lastSpaceIndex = truncatedDescription.lastIndexOf(" ");
      if (lastSpaceIndex !== -1) {
        truncatedDescription = truncatedDescription.substring(0, lastSpaceIndex);
      }

      truncatedDescription += "...";
    }
    return (
      <LightTooltip title={description} arrow={false} disableInteractive>
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDTypography variant="caption">{truncatedDescription}</MDTypography>
        </MDBox>
      </LightTooltip>
    );
  };

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
      { Header: "Code", accessor: "Code", width: "15%", align: "left" },
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
