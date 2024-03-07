const express = require('express')
const router = express.Router()
const { login, register,logout,adminExists } = require("../Controller/AuthenticationController")
const { getAllUsers, getUserByEmail, UpdateUser, deleteUser } = require('../Controller/UserController')

router.route('/users').get(getAllUsers)
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/register').post(register)
router.route('/users/:email').get(getUserByEmail).put(UpdateUser).delete(deleteUser)
router.route('/chekAdmin').get(adminExists)

module.exports = router 