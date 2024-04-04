const express = require('express')
const router = express.Router()
const { login, createNewPwd,logout, emailExist,forgotPassword  } = require("../Controller/AuthenticationController")
const { authorizationAllRoles} = require("../Service/AuthService")


router.route('/login').post(login)
router.route('/logout').post(logout)

router.route('/emailExist/:email').get(emailExist)
router.route('/forgotPassword').post(forgotPassword)
router.route('/NewPassword/:token').post(createNewPwd)


module.exports = router 