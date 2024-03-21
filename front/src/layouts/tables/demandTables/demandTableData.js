/* eslint-disable */
import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import { useNavigate } from "react-router-dom";

export default function Data() {
  const [rows, setRows] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");

  const handleOpenMenu = (event, title) => {
    setOpenMenu(event.currentTarget);
    setSelectedTitle(title);
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const handleMenuAction = (action, selectedTitle, title, description) => {
    if (action === "update") {
      navigate("/tables/demandTables/updateDemand", { state: { title, description } });
    } else if (action === "delete") {
      handleDeleteProject(selectedTitle);
    }
  };
  const handleCloseMenu = () => {
    setOpenMenu(null);
    setSelectedTitle(null);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/demands`);
        const donneesReponse = response.data.Demands;
        const tableau = donneesReponse.map((donnee, index) => {
          return {
            Demand: <Demand title={donnee.title} />,
            Description: <Description description={donnee.description} />,
            StartDate: <StartDate startDate={donnee.start_date} />,
            EndDate: <EndDate endDate={donnee.end_date} />,
            Estimation: <Estimation estimation={donnee.estimation} />,
            Action: (
              <MDBox key={index}>
                <IconButton onClick={(event) => handleOpenMenu(event, donnee.title)}>
                  <Icon fontSize="small">settings</Icon>
                </IconButton>
                <Menu
                  anchorEl={openMenu}
                  open={Boolean(openMenu && selectedTitle === donnee.title)}
                  onClose={handleCloseMenu}
                >
                  <MenuItem
                    onClick={() =>
                      handleMenuAction("update", selectedTitle, donnee.title, donnee.description)
                    }
                  >
                    Update
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuAction("delete", selectedTitle, donnee.title)}>
                    Delete
                  </MenuItem>
                </Menu>
              </MDBox>
            ),
          };
        });
        setRows(tableau);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [openMenu, selectedTitle]);

  const handleDeleteProject = async (title) => {
    try {
      await axios.delete(`http://localhost:4000/demand/${title}`);
      const updatedRows = rows.filter((row) => row.Demand.props.title === title);
      setRows(updatedRows);
      handleCloseMenu();
    } catch (error) {
      console.log(error);
    }
  };
  const Demand = ({ title }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {title}
      </MDTypography>
    </MDBox>
  );

  const Description = ({ description }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );
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

  const Estimation = ({ estimation }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{estimation}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Demand", accessor: "Demand", width: "30%", align: "left" },
      { Header: "Description", accessor: "Description", width: "30%", align: "left" },
      { Header: "Start At", accessor: "StartDate", width: "20%", align: "left" },
      { Header: "End At", accessor: "EndDate", width: "20%", align: "left" },
      { Header: "Estimation", accessor: "Estimation", width: "20%", align: "left" },
      { Header: "Action", accessor: "Action", width: "10%", align: "center" },
    ],
    rows,
  };
}
