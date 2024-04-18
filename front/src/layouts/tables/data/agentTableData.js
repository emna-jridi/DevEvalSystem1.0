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

import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { Link } from "react-router-dom";
import Icon from "@mui/material/Icon";
import { useNavigate } from "react-router-dom";
import AlertDialog from "./AlertDialog";

import { useLoading } from "../LoadingContext";

export default function Data() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [deletedItemId, setDeletedItemId] = useState(null);
  const { setLoading } = useLoading();
  const token = localStorage.getItem("accessToken");

  const handleUpdate = (id, fullName, email, role, state) => {
    navigate("/agents/edit", { state: { id, fullName, email, role, state } });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`Agents`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const donneesReponse = response.data.agents;
        const tableau = donneesReponse.map((donnee, index) => {
          return {
            id: donnee.id,
            Agent: <Agent fullName={donnee.fullName} />,
            Email: <Email email={donnee.email} />,
            Role: <Role role={donnee.role} />,
            State: <State state={donnee.state} />,
            Action: (
              <MDBox key={index}>
                <IconButton
                  onClick={() =>
                    handleUpdate(
                      donnee.id,
                      donnee.fullName,
                      donnee.email,
                      donnee.role,
                      donnee.state
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
      await axios.delete(`agent/${id}`, {
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
  const Agent = ({ fullName }) => (
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

  const Role = ({ role }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{role}</MDTypography>
    </MDBox>
  );
  const State = ({ state }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{state ? "Active" : "Inactive"}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Agent", accessor: "Agent", width: "30%", align: "left" },
      { Header: "Email", accessor: "Email", width: "30%", align: "left" },
      { Header: "Role", accessor: "Role", width: "22%", align: "left" },
      { Header: "State", accessor: "State", width: "10%", align: "left" },
      { Header: "Action", accessor: "Action", width: "10%", align: "center" },
    ],
    rows,
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
