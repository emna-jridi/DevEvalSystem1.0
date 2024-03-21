const express = require('express')
const router = express.Router()
const { authorizationAdmin, authorizationRTA,
    authorizationRPA, } = require("../Service/AuthService")
const { createProject, getAllProject, updateProject, deleteProject, assignToEmployee, projectExists } = require('../Controller/ProjectController')
const { createRelease, getAllReleases, updateRelease, deleteRelease, assignToProject, releaseExists } = require('../Controller/ReleaseController')
const { createDemand, getAllDemand, updateDemand, deleteDemand, assignToRelease } = require('../Controller/DemandController')

//Project Crud 
router.route('/project').post(createProject)
router.route('/projects').get(getAllProject)
router.route('/project/:label').put(updateProject)
    .delete(deleteProject)
    .post(assignToEmployee)
router.route('/projectExists/:label').get(projectExists)

//Release Crud 
router.route('/release').post(createRelease)
router.route('/releases').get(getAllReleases)
router.route('/release/:name').put(updateRelease)
    .delete(deleteRelease)
    .post(assignToProject)
router.route('/releaseExists/:name').get(releaseExists)

//demand crud 
router.route('/demand').post(createDemand)
router.route('/demands').get(getAllDemand)
router.route('/demand/:title').put(updateDemand).delete(deleteDemand).post(assignToRelease)


module.exports = router 