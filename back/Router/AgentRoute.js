const express = require('express')
const router = express.Router()
const { authorizationAdmin,  } = require("../Service/AuthService")
const { createAgent, getAllAgent, updateAgent, deleteAgent, } = require('../Controller/AgentController')
router.route('/Agent').post(createAgent)
router.route('/Agents').get(getAllAgent)
router.route('/agent/:email').put( updateAgent).delete( deleteAgent)


module.exports = router 