const express = require('express')
const router = express.Router()
const { createEmployee, deleteEmployee, getAllEmployee, updateEmpolyee } = require('../Controller/EmployeeController')
const { checkAuth } = require("../Service/AuthService")

router.route('/employee').post(checkAuth,createEmployee)
router.route('/employees').get(checkAuth,getAllEmployee)
router.route('/employee/:id').put(checkAuth,updateEmpolyee)
    .delete(checkAuth,deleteEmployee)

    module.exports = router 
