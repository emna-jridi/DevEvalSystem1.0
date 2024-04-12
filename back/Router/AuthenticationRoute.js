const express = require('express')
const router = express.Router()
const { login, createNewPwd,logout, emailExist,forgotPassword ,token } = require("../Controller/AuthenticationController")
const { authorizationAllRoles} = require("../Service/AuthService")


router.route('/login').post(login)
router.route('/logout').post(authorizationAllRoles,logout)
router.route('/emailExist/:email').get(authorizationAllRoles,emailExist)
router.route('/forgotPassword').post(authorizationAllRoles,forgotPassword)
router.route('/NewPassword/:token').post(authorizationAllRoles,createNewPwd)
router.route('/token').post(token)


module.exports = router 