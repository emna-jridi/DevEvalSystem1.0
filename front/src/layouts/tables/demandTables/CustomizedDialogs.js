/* eslint-disable */
import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import MDTypography from "components/MDTypography";
import { Grid } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import ReadMoreIcon from '@mui/icons-material/ReadMore';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
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
      {/* <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          backgroundColor: "#3A4B8A",
          color: "#fff",
          marginLeft: "8px",
          "&:hover": {
            backgroundColor: "#3A4B8A",
            color: "#fff",
          },
        }}
      >
        More
      </Button> */}
   <Button
  onClick={handleClickOpen}
  variant="button" fontWeight="medium"ml={1} lineHeight={1}
  sx={{
    textDecoration: 'underline',
    color: '#7E65F5',
    cursor: 'pointer',
    lineHeight: 1,
    textTransform: 'lowercase',
  }}
>
 show  More
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
          {/* <Grid container spacing={2}>
            <Grid item xs={12} sm={6}> */}
              <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={0.5}>
                <Item>
                  <MDTypography variant="h6" gutterBottom>
                    Name: {employee.employee.fullName}
                  </MDTypography>
                </Item>
                <Item>
                  <MDTypography variant="h6" gutterBottom>
                    Email: {employee.employee.email}
                  </MDTypography>
                </Item>
                <Item>
                  <MDTypography variant="h6" gutterBottom>
                    Phone Number: {formatPhoneNumber(employee.employee.phoneNumber)}
                  </MDTypography>
                </Item>
                <Item>
                  <MDTypography variant="h6" gutterBottom>
                    Civil State: {employee.employee.civilState}
                  </MDTypography>
                </Item>
                <Item>
                  <MDTypography variant="h6" gutterBottom>
                    Dependents: {employee.employee.dependents}
                  </MDTypography>
                </Item>
                <Item>
                  <MDTypography variant="h6" gutterBottom>
                    Contract: {employee.employee.contract}
                  </MDTypography>{" "}
                </Item>
                <Item>
                  <MDTypography variant="h6" gutterBottom>
                    Position: {employee.employee.position}
                  </MDTypography>{" "}
                </Item>
                <Item>
                  <MDTypography variant="h6" gutterBottom>
                    Employed At: {formatDate(employee.employee.entryDate)}
                  </MDTypography>
                </Item>
                <Item>
                  <MDTypography variant="h6" gutterBottom>
                    Salary: {employee.employee.salary}
                  </MDTypography>
                </Item>
                <Item>
                  <MDTypography variant="h6" gutterBottom>
                    RIB: {employee.employee.RIB}
                  </MDTypography>{" "}
                </Item>
                <Item>
                  <MDTypography variant="h6" gutterBottom>
                    Cnss Number: {employee.employee.cnssNumber}
                  </MDTypography>
                </Item>
                <Item>
                  <MDTypography variant="h6" gutterBottom>
                    Emergency Number: {formatPhoneNumber(employee.employee.emergencyNumber)}
                  </MDTypography>
                </Item>
                <Item>
                  <MDTypography variant="h6" gutterBottom>
                    Hierarchical Superior: {employee.employee.hierarchicalSuperior}
                  </MDTypography>
                </Item>
                <Item>
                  <MDTypography variant="h6" gutterBottom>
                    Leave Balance: {employee.employee.leaveBalance}
                  </MDTypography>
                </Item>
                <Item>
                  <MDTypography variant="h6" gutterBottom>
                    Last Negotiation: {formatDate(employee.employee.lastNegotiationDate)}
                  </MDTypography>
                </Item>
                <Item>
                  <MDTypography variant="h6" gutterBottom>
                    Rank: {employee.employee.rank}
                  </MDTypography>
                </Item>
              </Stack>
            {/* </Grid>
          </Grid> */}
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
