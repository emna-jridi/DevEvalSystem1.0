const express = require('express')
const router = express.Router()
const { login, register,logout,adminExists, emailExist } = require("../Controller/AuthenticationController")
const { getAllUsers, UpdateUser, deleteUser } = require('../Controller/UserController')

router.route('/users').get(getAllUsers)
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/register').post(register)
router.route('/users/:email').put(UpdateUser).delete(deleteUser)
router.route('/chekAdmin').get(adminExists)
router.route('/emailExist/:email').get(emailExist)

module.exports = router 