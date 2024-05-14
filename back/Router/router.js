const express = require("express");
const router = express.Router();
const { checkAuth } = require("../Service/AuthService");
const {
  createProject,
  getAllProject,
  updateProject,
  deleteProject,
  projectExists,
} = require("../Controller/ProjectController");
const {
  createRelease,
  getAllReleases,
  updateRelease,
  deleteRelease,
  releaseExists,
} = require("../Controller/ReleaseController");
const {
  createDemand,
  getAllDemand,
  updateDemand,
  deleteDemand,
} = require("../Controller/DemandController");

const {
  createPerformance,
  getAllPerformanceReport,
  updatePerformaneReport,
  deletePerformanceReport,
  checkPerformanceReportExists,
} = require("../Controller/PerformanceController");

const {
  calculateFinalPerformance,
  getAllFinalPerformances,
  updateFinalPerformance,
} = require("../Controller/FinalPerformance");

const {
  createpsychotechnicalReport,
  getAllPsychotechnicalReports,
  updatePsychotechnicalReport,
  deletePsychotechnicalReport,
  checkReportExists
} = require("../Controller/psychotechnicalReportController");

//Project Crud
router.route("/project").post(checkAuth, createProject);
router.route("/projects").get(checkAuth, getAllProject);
router
  .route("/project/:id")
  .put(checkAuth, updateProject)
  .delete(checkAuth, deleteProject);

router.route("/projectExists/:label").get(projectExists);

//Release Crud
router.route("/release").post(checkAuth, createRelease);
router.route("/releases").get(checkAuth, getAllReleases);
router
  .route("/release/:id")
  .put(checkAuth, updateRelease)
  .delete(checkAuth, deleteRelease);
router.route("/releaseExists/:name").get(checkAuth, releaseExists);

//demand crud
router.route("/demand").post(checkAuth, createDemand);
router.route("/demands").get(checkAuth, getAllDemand);
router
  .route("/demand/:id")
  .put(checkAuth, updateDemand)
  .delete(checkAuth, deleteDemand);

router.route("/rating").post(checkAuth, createPerformance);
router.route("/check").get(checkAuth, checkPerformanceReportExists);
router.route("/ratings").get(checkAuth, getAllPerformanceReport);
router
  .route("/rating/:id")
  .put(checkAuth, updatePerformaneReport)
  .delete(checkAuth, deletePerformanceReport);

router.route("/static").get(checkAuth, getAllFinalPerformances);
router
  .route("/statics/:releaseName")
  .post(checkAuth, calculateFinalPerformance)
  .put(checkAuth, updateFinalPerformance);

router
  .route("/psychotechnical-reports")
  .get(checkAuth, getAllPsychotechnicalReports).post(checkReportExists)
router
  .route("/psychotechnical-report")
  .post(checkAuth, createpsychotechnicalReport);
router
  .route("/psychotechnical-report/:id")
  .put(checkAuth, updatePsychotechnicalReport)
  .delete(checkAuth, deletePsychotechnicalReport);


module.exports = router;
