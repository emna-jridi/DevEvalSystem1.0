const express = require('express')
const router = express.Router()
const { login, createNewPwd,logout, emailExist,forgotPassword ,token } = require("../Controller/AuthenticationController")
const { checkAuth} = require("../Service/AuthService")


router.route('/login').post(login)
router.route('/logout').post(checkAuth,logout)
router.route('/emailExist/:email').get(checkAuth,emailExist)
router.route('/forgotPassword').post(checkAuth,forgotPassword)
router.route('/NewPassword/:token').post(checkAuth,createNewPwd)
router.route('/token').post(token)


module.exports = router 