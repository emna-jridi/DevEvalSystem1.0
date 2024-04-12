import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Paper from "@mui/material/Paper";
import MDTypography from "components/MDTypography";
import { blueGrey } from "@mui/material/colors";
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs(employee) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function formatPhoneNumber(phoneNumber) {
    phoneNumber = phoneNumber.toString();
    if (phoneNumber.startsWith("216")) {
      return phoneNumber.slice(3);
    }
    return phoneNumber;
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString("en-US", options);
    return formattedDate;
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        variant="button"
        fontWeight="medium"
        ml={1}
        lineHeight={1}
        sx={{
          textDecoration: "underline",
          color: "#7E65F5",
          cursor: "pointer",
          lineHeight: 1,
          textTransform: "lowercase",
        }}
      >
        Show More
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Employee
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: blueGrey,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow sx={{ backgroundColor: "#F5F5F5" }}>
                  <TableCell component="th" scope="row" sx={{ fontWeight: "bold", color: "#333" }}>
                    <MDTypography variant="body2">Name :</MDTypography>
                  </TableCell>
                  <TableCell>{employee.employee.fullName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <MDTypography variant="body2" color="inherit">
                      Email :
                    </MDTypography>
                  </TableCell>
                  <TableCell>{employee.employee.email}</TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: "#F5F5F5" }}>
                  <TableCell component="th" scope="row" sx={{ fontWeight: "bold", color: "#333" }}>
                    <MDTypography variant="body2"> Phone Number :</MDTypography>
                  </TableCell>
                  <TableCell>{formatPhoneNumber(employee.employee.phoneNumber)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <MDTypography variant="body2" color="inherit">
                      Civil State :
                    </MDTypography>
                  </TableCell>
                  <TableCell>{employee.employee.civilState}</TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: "#F5F5F5" }}>
                  <TableCell component="th" scope="row" sx={{ fontWeight: "bold", color: "#333" }}>
                    <MDTypography variant="body2"> Dependents :</MDTypography>
                  </TableCell>
                  <TableCell>{employee.employee.dependents}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <MDTypography variant="body2" color="inherit">
                      Contract :
                    </MDTypography>
                  </TableCell>
                  <TableCell>{employee.employee.contract}</TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: "#F5F5F5" }}>
                  <TableCell component="th" scope="row" sx={{ fontWeight: "bold", color: "#333" }}>
                    <MDTypography variant="body2"> Position :</MDTypography>
                  </TableCell>
                  <TableCell>{employee.employee.position}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <MDTypography variant="body2" color="inherit">
                      Employed At :
                    </MDTypography>
                  </TableCell>
                  <TableCell>{formatDate(employee.employee.entryDate)}</TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: "#F5F5F5" }}>
                  <TableCell component="th" scope="row" sx={{ fontWeight: "bold", color: "#333" }}>
                    <MDTypography variant="body2"> Salary :</MDTypography>
                  </TableCell>
                  <TableCell>{employee.employee.salary}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <MDTypography variant="body2" color="inherit">
                      RIB :
                    </MDTypography>
                  </TableCell>
                  <TableCell>{employee.employee.RIB}</TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: "#F5F5F5" }}>
                  <TableCell component="th" scope="row" sx={{ fontWeight: "bold", color: "#333" }}>
                    <MDTypography variant="body2"> Cnss Number :</MDTypography>
                  </TableCell>
                  <TableCell>{employee.employee.cnssNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <MDTypography variant="body2" color="inherit">
                      Emergency Number :
                    </MDTypography>
                  </TableCell>
                  <TableCell>{formatPhoneNumber(employee.employee.emergencyNumber)}</TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: "#F5F5F5" }}>
                  <TableCell component="th" scope="row" sx={{ fontWeight: "bold", color: "#333" }}>
                    <MDTypography variant="body2"> Hierarchical Superior :</MDTypography>
                  </TableCell>
                  <TableCell>{employee.employee.hierarchicalSuperior}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <MDTypography variant="body2" color="inherit">
                      Leave Balance :
                    </MDTypography>
                  </TableCell>
                  <TableCell>{employee.employee.leaveBalance}</TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: "#F5F5F5" }}>
                  <TableCell component="th" scope="row" sx={{ fontWeight: "bold", color: "#333" }}>
                    <MDTypography variant="body2"> Last Negotiation :</MDTypography>
                  </TableCell>
                  <TableCell>{formatDate(employee.employee.lastNegotiationDate)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <MDTypography variant="body2" color="inherit">
                      Rank :
                    </MDTypography>
                  </TableCell>
                  <TableCell>{employee.employee.rank}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
