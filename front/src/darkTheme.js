import React, { useContext } from "react";
import { useMaterialUIController, setDarkMode } from "context";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

function DarkModeButton() {
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;

  const handleDarkModeToggle = () => {
    setDarkMode(dispatch, !darkMode);
  };

  return (
    <IconButton color="inherit" onClick={handleDarkModeToggle}>
      {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}

export default DarkModeButton;
