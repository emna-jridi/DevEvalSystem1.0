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

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";
import axios from "axios";
import { AuthContextProvider } from "context";
import { LoadingProvider } from "./layouts/tables/LoadingContext";
const container = document.getElementById("app");
const root = createRoot(container);
axios.defaults.baseURL = "https://devevalsystemback.onrender.com";
//axios.defaults.baseURL = "http://localhost:4000";

root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <LoadingProvider>
        <MaterialUIControllerProvider>
          <App />
        </MaterialUIControllerProvider>
      </LoadingProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
