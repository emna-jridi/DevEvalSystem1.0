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
  const [selectedName, setSelectedName] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");

  const handleOpenMenu = (event, name) => {
    setOpenMenu(event.currentTarget);
    setSelectedName(name);
  };
  const handleMenuAction = (action,selectedName, name, description, start_date,end_date ) => {
    if (action === "update") {
      navigate("/tables/releaseTables/updateRelease", { state: { name, description , start_date , end_date  } });
    } else if (action === "delete") {
      handleDeleteRelease(selectedName);
    }else if (action === "assignTo"){
        navigate("/tables/projectTables/assignTo")
    }
  };
  const handleCloseMenu = () => {
    setOpenMenu(null);
    setSelectedName(null);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/releases`);
        const donneesReponse = response.data.Releases;
        const tableau = donneesReponse.map((donnee, index) => {
          return {
            Release: <Release name={donnee.name} />,
            Description: <Description description={donnee.description} />,
            StartDate : <StartDate  startDate= {donnee.start_date}/>,
            EndDate : <EndDate  endDate= {donnee.end_date}/>,
            Action: (
              <MDBox key={index}>
                <IconButton onClick={(event) => handleOpenMenu(event, donnee.name)}>
                  <Icon fontSize="small">settings</Icon>
                </IconButton>
                <Menu
                  anchorEl={openMenu}
                  open={Boolean(openMenu && selectedName === donnee.name)}
                  onClose={handleCloseMenu}
                >
                  <MenuItem
                    onClick={() =>
                      handleMenuAction("update", selectedName, donnee.name, donnee.description , donnee.start_date, donnee.end_date)
                    }
                  >
                    Update
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuAction("delete", selectedName, donnee.name)}>
                    Delete
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuAction("assignTo", selectedName, donnee.name)}> Assign To </MenuItem>
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
  }, [openMenu, selectedName]);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString("en-US", options);
    return formattedDate;
  };

  const handleDeleteRelease = async (name) => {
    try {
      await axios.delete(`http://localhost:4000/release/${name}`);
      const updatedRows = rows.filter((row) => row.Release.props.name === name);
      setRows(updatedRows);
      handleCloseMenu();
    } catch (error) {
      console.log(error);
    }
  };
  const Release = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const Description = ({ description }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

    const StartDate = ({ startDate}) => (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDTypography variant="caption">{formatDate(startDate)}</MDTypography>
      </MDBox>
    );

    const EndDate = ({endDate}) => (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDTypography variant="caption">{formatDate(endDate)}</MDTypography>
      </MDBox>
    );

  return {
    columns: [
      { Header: "Release", accessor: "Release", width: "20%", align: "left" },
      { Header: "Description", accessor: "Description", width: "30%", align: "left" },
       { Header: "Start At", accessor: "StartDate", width: "20%", align: "left" },
       { Header: "End At", accessor: "EndDate", width: "20%", align: "left" },
      { Header: "Action", accessor: "Action", width: "10%", align: "center" },
    ],
    rows,
  };
}
