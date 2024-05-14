/* eslint-disable */
import * as React from "react";
0;
import { useState, useEffect } from "react";
import { Grid, Card, IconButton, styled, TableCell } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircularProgress from "@mui/material/CircularProgress";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Pagination, PaginationItem } from "@mui/material";
import axios from "axios";
import { useLoading } from "../LoadingContext";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  gridItem: {
    width: "100px",
    marginBottom: "-1rem",
    marginTop: "15px",
  },
}));

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ECEEFF",
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));
export default function ReportTable() {
  const [expanded, setExpanded] = useState(null);
  const [releases, setReleases] = useState([]);
  const [reports, setReports] = useState([]);
  const { setLoading, loading } = useLoading();
  const token = localStorage.getItem("accessToken");
  const classes = useStyles();
  const navigate = useNavigate();

  const isAccordionDisabled = (index) => {
    const releaseName = releases[index].Release.props.name;
    return reports.filter((report) => report.release === releaseName).length === 0;
  };
  const handleExpansion = (index) => {
    const isDisabled = isAccordionDisabled(index);
    if (!isDisabled) {
      setExpanded((prevExpanded) => (prevExpanded === index ? null : index));
    }
  };
  const handleAddPerformance = () => {
    navigate("/employees/performance/create");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`releases`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const donneesReponse = response.data.Releases;
        const tableau = donneesReponse.map((donnee, index) => {
          return {
            id: donnee.id,
            Release: <Release name={donnee.name} />,
            Description: <Description description={donnee.description} />,
          };
        });
        setReleases(tableau);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchReportData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`static`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const donneesReponse = response.data.finalPerformances;
        console.log(donneesReponse);
        const tableau = donneesReponse.map((donnee, index) => {
          return {
            employee: donnee.employee.fullName,
            release: donnee.release.name,
            totalDemands: donnee.totalDemands,
            autonomy: donnee.autonomy,
            conformity: donnee.conformity,
            estimation: donnee.estimation,
            codeQuality: donnee.codeQuality,
            majorBugs: donnee.majorBugs,
            minorBugs: donnee.minorBugs,
            score: donnee.score,
          };
        });
        setReports(tableau);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    fetchReportData();
  }, []);

  const Release = ({ name }) => (
    <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
      {name}
    </MDTypography>
  );
  const Description = ({ description }) => {
    const MAX_DISPLAY_LENGTH = 100;
    let truncatedDescription = description;
    if (description.length > MAX_DISPLAY_LENGTH) {
      truncatedDescription = description.substring(0, MAX_DISPLAY_LENGTH);
      const lastSpaceIndex = truncatedDescription.lastIndexOf(" ");
      if (lastSpaceIndex !== -1) {
        truncatedDescription = truncatedDescription.substring(0, lastSpaceIndex);
      }

      truncatedDescription += "...";
    }
    return (
      <LightTooltip title={description} arrow={false} disableInteractive>
        <MDTypography variant="caption">{truncatedDescription}</MDTypography>
      </LightTooltip>
    );
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  p: 3,
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Card sx={{ paddingBottom: "20px", paddingLeft: "20px", paddingRight: "20px" }}>
                <MDBox
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <MDTypography variant="h6" color="white" sx={{ fontSize: "1rem" }}>
                    Reports
                  </MDTypography>
                  <IconButton
                    onClick={handleAddPerformance}
                    color="white"
                    sx={{
                      flexDirection: "column",
                      alignItems: "center",
                      fontSize: "1rem",
                    }}
                  >
                    <AddCircleOutlineIcon fontSize="medium"></AddCircleOutlineIcon>
                  </IconButton>
                </MDBox>
                <br />
                <br />
                {releases.map((release, index) => {
                  const isDisabled = isAccordionDisabled(index);
                  return (
                    <Accordion
                      key={index}
                      expanded={expanded === index}
                      onChange={() => handleExpansion(index)}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                        sx={{
                          backgroundColor: isDisabled ? "	rgb(211,211,211)" : "rgba(0, 0, 0, 0.05)",
                          color: isDisabled ? "rgb(240, 240, 242)" : "inherit",
                        }}
                      >
                        <MDTypography sx={{ width: "33%", flexShrink: 0 }}>
                          {release.Release}
                        </MDTypography>
                        <MDTypography sx={{ color: "text.secondary" }}>
                          {release.Description}
                        </MDTypography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ backgroundColor: "rgba(0, 0, 0, 0.035)" }}>
                        <Grid container spacing={0}>
                          <Grid item xs={2} className={classes.gridItem}>
                            <MDTypography variant="button">Employee</MDTypography>
                          </Grid>
                          <Grid item xs={1.5} className={classes.gridItem}>
                            <MDTypography variant="button">Demands</MDTypography>
                          </Grid>
                          <Grid item xs={1} className={classes.gridItem}>
                            <MDTypography variant="button">Autonomy</MDTypography>
                          </Grid>
                          <Grid item xs={1} className={classes.gridItem}>
                            <MDTypography variant="button">Estimation</MDTypography>
                          </Grid>
                          <Grid item xs={1} className={classes.gridItem}>
                            <MDTypography variant="button">Conformity</MDTypography>
                          </Grid>
                          <Grid item xs={1.5} className={classes.gridItem}>
                            <MDTypography variant="button">Code Quality</MDTypography>
                          </Grid>
                          <Grid item xs={1} className={classes.gridItem}>
                            <MDTypography variant="button">Major Bugs</MDTypography>
                          </Grid>
                          <Grid item xs={1.5} className={classes.gridItem}>
                            <MDTypography variant="button">Minor Bugs</MDTypography>
                          </Grid>
                          <Grid item xs={1.5} className={classes.gridItem}>
                            <MDTypography variant="button">Score</MDTypography>
                          </Grid>
                        </Grid>
                        {reports
                          .filter((report) => report.release === release.Release.props.name)
                          .map((report, reportIndex) => (
                            <Grid container spacing={0} key={reportIndex}>
                              <Grid item xs={2} className={classes.gridItem}>
                                <TableCell>
                                  <MDTypography variant="button">{report.employee}</MDTypography>
                                </TableCell>
                              </Grid>
                              <Grid item xs={1.5} className={classes.gridItem}>
                                <TableCell>
                                  <MDTypography variant="button" className={classes.gridItem}>
                                    {report.totalDemands}
                                  </MDTypography>
                                </TableCell>
                              </Grid>
                              <Grid item xs={1} className={classes.gridItem}>
                                <TableCell>
                                  <MDTypography variant="button">{report.autonomy}</MDTypography>
                                </TableCell>
                              </Grid>
                              <Grid item xs={1} className={classes.gridItem}>
                                <TableCell>
                                  <MDTypography variant="button">{report.estimation}</MDTypography>
                                </TableCell>
                              </Grid>
                              <Grid item xs={1} className={classes.gridItem}>
                                <TableCell>
                                  <MDTypography variant="button">{report.conformity}</MDTypography>
                                </TableCell>
                              </Grid>
                              <Grid item xs={1.5} className={classes.gridItem}>
                                <TableCell>
                                  <MDTypography variant="button">{report.codeQuality}</MDTypography>
                                </TableCell>
                              </Grid>
                              <Grid item xs={1} className={classes.gridItem}>
                                <TableCell>
                                  <MDTypography variant="button">{report.majorBugs}</MDTypography>
                                </TableCell>
                              </Grid>
                              <Grid item xs={1.5} className={classes.gridItem}>
                                <TableCell>
                                  <MDTypography variant="button">{report.minorBugs}</MDTypography>
                                </TableCell>
                              </Grid>
                              <Grid item xs={1.5} className={classes.gridItem}>
                                <TableCell>
                                  <MDTypography variant="button">{report.score}</MDTypography>
                                </TableCell>
                              </Grid>
                            </Grid>
                          ))}
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </Card>
            )}
          </Grid>
        </Grid>
        <Footer />
      </MDBox>
    </DashboardLayout>
  );
}
