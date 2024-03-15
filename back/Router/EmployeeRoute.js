const express = require('express')
const router = express.Router()
const { createEmployee, deleteEmployee, getAllEmployee, updateEmpolyee } = require('../Controller/EmployeeController')
const { authorizationAdmin,  } = require("../Service/AuthService")

router.route('/employee').post(createEmployee)
router.route('/employees').get(getAllEmployee)
router.route('/employee/:email').put(updateEmpolyee)
    .delete( deleteEmployee)

    module.exports = router 
