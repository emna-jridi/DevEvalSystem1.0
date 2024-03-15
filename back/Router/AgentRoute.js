const express = require('express')
const router = express.Router()
const { authorizationAdmin, authorization ,authorizationRPA , authorizationAllRoles} = require("../Service/AuthService")
const { createAgent, getAllAgent, updateAgent, deleteAgent, getUserDetails } = require('../Controller/AgentController')


router.route('/Agent').post(createAgent)
router.route('/Agents').get( authorizationAdmin,getAllAgent)
router.route('/agent/:email').put(updateAgent).delete(deleteAgent)
router.route('/userDetails').get(authorizationAllRoles,getUserDetails)


module.exports = router 