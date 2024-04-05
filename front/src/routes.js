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

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/
/* eslint-disable */
// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import AgentTables from "layouts/tables/agentTable";
import EmployeeTables from "layouts/tables/employeeTable";

import SignIn from "layouts/authentication/sign-in";
import handleLogout from "layouts/authentication/log-out";
import Logout from "layouts/authentication/log-out";
import ProjectTables from "layouts/tables/projectTables/projectTable";
import ReleaseTables from "layouts/tables/releaseTables/releaseTable";
import DemandTables from "layouts/tables/demandTables/demandTable";
import Reset from "layouts/authentication/reset-password/cover"
import NewPassword from "layouts/authentication/reset-password/cover/newPassword";
import CreateAgent from "layouts/tables/createAgent";
import UpdateAgent from "layouts/tables/updateAgent";

import CreateEmployee from "layouts/tables/createEmployee";
import UpdateEmployee from "layouts/tables/updateEmployee";

import CreateProject from "layouts/tables/projectTables/createProject";
import UpdateProject from "layouts/tables/projectTables/updateProject";


import CreateRelease from "layouts/tables/releaseTables/createRelease";
import UpdateRelease from "layouts/tables/releaseTables/updateRelease";

import CreateDemand from "layouts/tables/demandTables/createDemand";
import UpdateDemand from "layouts/tables/demandTables/updateDemand";
//import ConfirmDialog from "layouts/tables/confirmationDialog";
// @mui icons
import Icon from "@mui/material/Icon";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import WebIcon from "@mui/icons-material/Web";
import SendTimeExtensionIcon from "@mui/icons-material/SendTimeExtension";
import config from './config.json';

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },

  {
    // type: "collapse",
    name: "Sign In",
    key: "sign-in",
    //icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Agents",
    key: "agent",
    icon: <Icon>business_center</Icon>,
    route: "/Agents",
    allowedRoles: [config.ROLES.RA],
    component: <AgentTables />,
  },
  {
    type: "collapse",
    name: "Employees",
    key: "employee",
    icon: <Icon>group</Icon>,
    route: "/Employees",
    allowedRoles: [config.ROLES.RA, config.ROLES.RPA, config.ROLES.RTA],
    component: <EmployeeTables />,
  },
  {
    type: "collapse",
    name: "Statics",
    key: "statics",
    icon: <ShowChartIcon />,
    allowedRoles: [],
    //route: "/tables/employeeTables",
    //component: <EmployeeTables />
  },

  // {
  //   type: "collapse",
  //   name: "logout",
  //   key: "logout",
  //   icon: <Icon fontSize="small">logout</Icon>,
  //   route: "/authentication/log-out",
  //   component: <Logout />,
  //   onClick: handleLogout,

  // },
  {
    //type: "collapse",
    name: CreateAgent,
    key: "createAgent",
    component: <CreateAgent />,
    route: "/agents/create",
  },
  {
    //type: "collapse",
    name: UpdateAgent,
    key: "updateAgent",
    component: <UpdateAgent />,
    route: "/agents/edit",
  },

 
  {
    //type: "collapse",
    name: CreateEmployee,
    key: "createEmployee",
    component: <CreateEmployee />,
    route: "/employees/create",
  },
  {
    //type: "collapse",
    name: UpdateEmployee,
    key: "updateEmployee",
    component: <UpdateEmployee />,
    route: "/employees/edit",
  },
  {
    //type: "collapse",
    name: CreateProject,
    key: "createProject",
    component: <CreateProject />,
    route: "/projects/create",
  },
  {
    //type: "collapse",
    name: UpdateProject,
    key: "updateProject",
    component: <UpdateProject />,
    route: "/projects/edit",
  },
  
  {
    //type: "collapse",
    name: CreateRelease,
    key: "createRelease",
    component: <CreateRelease />,
    route: "/release/create",
  },
  {
    //type: "collapse",
    name: UpdateRelease,
    key: "updateRelease",
    component: <UpdateRelease />,
    route: "/release/edit",
  },
  {
    type: "collapse",
    name: "Projects",
    key: "project",
    icon: <WebIcon />,
    route: "/projects",
    allowedRoles: [config.ROLES.RA, config.ROLES.RTA],
    component: <ProjectTables />,
  },
  {
    type: "collapse",
    name: "Releases",
    key: "release",
    icon: <Icon>code</Icon>,
    route: "/release",
    allowedRoles: [config.ROLES.RTA],
    component: <ReleaseTables />,
  },

  {
    type: "collapse",
    name: "Demands",
    key: "demand",
    icon: <SendTimeExtensionIcon />,
    route: "/demand",
    allowedRoles: [config.ROLES.RTA],
    component: <DemandTables />,
  },
  {
    //type: "collapse",
    name: CreateDemand,
    key: "createDemand",
    component: <CreateDemand />,
    route: "/demand/create",
  },
  {
    //type: "collapse",
    name: UpdateDemand,
    key: "updateDemand",
    component: <UpdateDemand />,
    route: "/demand/edit",
  },
  {
    
    name: "ForgotPassword",
    key: "rest",
    route: "/authentication/reset-password",
    allowedRoles: [config.ROLES.RTA, config.ROLES.RA , config.ROLES.RPA],
    component: <Reset />,
  },
  {
    name: "NewPassword",
    key: "newPassword",
    route: "/Newpassword/:token",
    allowedRoles: [config.ROLES.RTA, config.ROLES.RA , config.ROLES.RPA],
    component: <NewPassword />,
  },
];

export default routes;
