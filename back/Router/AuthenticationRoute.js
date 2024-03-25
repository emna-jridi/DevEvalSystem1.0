const express = require('express')
const router = express.Router()
const { login, createNewPwd,logout,adminExists, emailExist,forgotPassword  } = require("../Controller/AuthenticationController")
const { getAllUsers, UpdateUser, deleteUser } = require('../Controller/UserController')
const {  authorizationAllRoles} = require("../Service/AuthService")

router.route('/users').get(getAllUsers)
router.route('/login').post(login)
router.route('/logout').post(logout)

router.route('/users/:email').put(UpdateUser).delete(deleteUser)
router.route('/chekAdmin').get(adminExists)
router.route('/emailExist/:email').get(emailExist)
router.route('/forgotPassword').post(forgotPassword)
router.route('/NewPassword/:token').post(createNewPwd)


module.exports = router 