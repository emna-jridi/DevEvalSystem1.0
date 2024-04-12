const express = require('express')
const router = express.Router()
const { authorizationAdmin, authorization ,authorizationRPA , authorizationAllRoles, checkAuth} = require("../Service/AuthService")
const { createAgent, getAllAgent, updateAgent, deleteAgent, getUserDetails } = require('../Controller/AgentController')


router.route('/Agent').post(checkAuth,createAgent)
router.route('/Agents').get( checkAuth, getAllAgent)
router.route('/agent/:id').put(checkAuth, updateAgent).delete(checkAuth,deleteAgent)
router.route('/userDetails').get(authorizationAllRoles,getUserDetails)


module.exports = router 