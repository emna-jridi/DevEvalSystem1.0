import React from "react";
import { formatDate } from "../utils";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import { IconButton, styled } from "@mui/material";
import AlertDialog from "../data/AlertDialog";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const formatDemandRow = (donnee, index, setOpenConfirmation, handleDeleteDemand, navigate) => {
  const token = localStorage.getItem("accessToken");
  const MAX_DISPLAY_LENGTH = 50;
  let truncatedDescription = donnee.description;
  if (donnee.description.length > MAX_DISPLAY_LENGTH) {
    truncatedDescription = donnee.description.substring(0, MAX_DISPLAY_LENGTH);
    const lastSpaceIndex = truncatedDescription.lastIndexOf(" ");
    if (lastSpaceIndex !== -1) {
      truncatedDescription = truncatedDescription.substring(0, lastSpaceIndex);
    }
    truncatedDescription += "...";
  }
  const handleUpdate = (data) => {
    navigate("/demand/edit", {
      state: { data },
    });
  };

  return {
    id: donnee.id,

    Code: (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium" ml={1}>
          {donnee.code}
        </MDTypography>
      </MDBox>
    ),
    Demand: (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDTypography variant="caption">{donnee.title}</MDTypography>
      </MDBox>
    ),
    Description: (
      <LightTooltip title={donnee.description} arrow={false} disableInteractive>
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDTypography variant="caption">{truncatedDescription}</MDTypography>
        </MDBox>
      </LightTooltip>
    ),
    StartDate: (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDTypography variant="caption">{formatDate(donnee.start_date)}</MDTypography>
      </MDBox>
    ),
    EndDate: (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDTypography variant="caption">{formatDate(donnee.end_date)}</MDTypography>
      </MDBox>
    ),
    Estimation: (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDTypography variant="caption">{donnee.estimation}</MDTypography>
      </MDBox>
    ),
    Release: (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDTypography variant="caption">{donnee.release.name}</MDTypography>
      </MDBox>
    ),
    Project: (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDTypography variant="caption">{donnee.release.assignedProject.label}</MDTypography>
      </MDBox>
    ),
    Action: (
      <MDBox key={index}>
        <IconButton onClick={() => handleUpdate(donnee)}>
          <Icon fontSize="small">edit</Icon>
        </IconButton>
        <IconButton onClick={() => setOpenConfirmation(true)}>
          <AlertDialog handleDelete={() => handleDeleteDemand(donnee.id)} />
        </IconButton>
      </MDBox>
    ),
  };
};

export default formatDemandRow;
