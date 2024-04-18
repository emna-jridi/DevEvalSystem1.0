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
  assignToRelease,
} = require("../Controller/DemandController");

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

module.exports = router;
