/* eslint-disable */
import { IconButton, Menu, MenuItem, styled } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import { useNavigate } from "react-router-dom";
import AlertDialog from "../data/AlertDialog";
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

  const token = localStorage.getItem("accessToken");
  const { setLoading } = useLoading();

  const handleUpdate = (id, label, description) => {
    navigate("/projects/edit", { state: { id, label, description } });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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
                <IconButton
                  onClick={() => handleUpdate(donnee.id, donnee.label, donnee.description)}
                >
                  <Icon fontSize="small">edit</Icon>
                </IconButton>
                <IconButton onClick={() => setOpenConfirmation(true)}>
                  <AlertDialog handleDelete={() => handleDeleteProject(donnee.id)} />
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

  const handleDeleteProject = async (id) => {
    try {
      await axios.delete(`project/${id}`, {
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
  const Project = ({ label }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {label}
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

  return {
    columns: [
      { Header: "Project", accessor: "Project", width: "30%", align: "left" },
      { Header: "Description", accessor: "Description", width: "30%", align: "left" },

      { Header: "Action", accessor: "Action", width: "10%", align: "center" },
    ],
    rows,
    confirmationDialog: (
      <AlertDialog open={openConfirmation} handleClose={() => setOpenConfirmation(false)} />
    ),
  };
}
