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
router.route('/project/:id').put(updateProject)
    .delete(deleteProject)
  
router.route('/projectExists/:label').get(projectExists)

//Release Crud 
router.route('/release').post(createRelease)
router.route('/releases').get(getAllReleases)
router.route('/release/:id').put(updateRelease)
    .delete(deleteRelease)
router.route('/releaseExists/:name').get(releaseExists)

//demand crud 
router.route('/demand').post(createDemand)
router.route('/demands').get(getAllDemand)
router.route('/demand/:id').put(updateDemand).delete(updateDemand)


module.exports = router 