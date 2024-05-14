/* eslint-disable */
import React, { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import { useNavigate } from "react-router-dom"
import TableChartIcon from '@mui/icons-material/TableChart';

export default function ReleaseSelectionDialog({ employeeName, releases, handleReleaseClick }) {
  const [open, setOpen] = useState(false);
  const [selectedRelease, setSelectedRelease] = useState("");
  const [employee, setEmployee] = useState("");
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setSelectedRelease(event.target.value);
  };

  const handleConfirm = () => {
    if (selectedRelease) {
      handleReleaseClick(selectedRelease);
      setOpen(false);
      navigate(`/employees/performance`, { state: { employeeName, selectedRelease } });
    }
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
      <TableChartIcon/>
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Select a Release to Track {employeeName.split(" ")[0]}'s Performance
        </DialogTitle>
        <DialogContent>
          <Select
            value={selectedRelease}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Select Release" }}
            sx={{
              color: "#15192B",
              width: "100%",
              fontSize: "1.1rem",
              paddingTop: "15px",
              paddingBottom: "10px",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <MenuItem value="" disabled>
              Select Release
            </MenuItem>
            {releases.map((release) => (
              <MenuItem key={release} value={release}>
                <Button
                  onClick={() => {
                    handleReleaseClick(release);
                    setOpen(false);
                  }}
                >
                  {release}
                </Button>
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
