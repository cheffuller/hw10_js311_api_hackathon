const express = require('express')
const {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employee.js')
const router = express.Router()

router.get('/', getEmployees);

router.get('/:emp_no', getEmployeeById);

router.post('/', createEmployee);

router.put('/:emp_no', updateEmployee);

router.delete('/:emp_no', deleteEmployee);

module.exports = router;