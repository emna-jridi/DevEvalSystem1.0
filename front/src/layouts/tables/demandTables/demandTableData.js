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
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { useLoading } from "../LoadingContext";
import formatDemandRow from "./formatDemandRow";

export default function Data() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const { setLoading } = useLoading();
  const [deletedItemId, setDeletedItemId] = useState(null);
  const token = localStorage.getItem("accessToken");

  const handleUpdate = (id,code, title, description, start_date, end_date, estimation, releaseName) => {
    navigate("/demand/edit", {
      state: { id,code, title, description, start_date, end_date, estimation, releaseName },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`demands`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const donneesReponse = response.data.Demands;
        const tableau = donneesReponse.map((donnee, index) =>
          formatDemandRow(donnee, index, setOpenConfirmation, handleDeleteDemand, navigate)
        );
        setRows(tableau);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [, deletedItemId]);

  const handleDeleteDemand = async (id) => {
    try {
      await axios.delete(`demand/${id}`, {
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

  return {
    columns: [
      { Header: "Code", accessor: "Code", width: "20%", align: "left" },
      { Header: "Demand", accessor: "Demand", width: "15%", align: "left" },
      { Header: "Description", accessor: "Description", width: "25%", align: "left" },
      { Header: "Start At", accessor: "StartDate", width: "12%", align: "center" },
      { Header: "End At", accessor: "EndDate", width: "12%", align: "center" },
      { Header: "Estimation (H)", accessor: "Estimation", width: "22%", align: "center" },
      { Header: " Release", accessor: "Release", width: "20%", align: "center" },
      { Header: "Project", accessor: "Project", width: "20%", align: "center" },
      { Header: "Action", accessor: "Action", width: "15%", align: "center" },
    ],
    rows,
    confirmationDialog: (
      <AlertDialog open={openConfirmation} handleClose={() => setOpenConfirmation(false)} />
    ),
  };
}
