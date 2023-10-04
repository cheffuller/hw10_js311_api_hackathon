const express = require('express')
const salaryController = require('../controllers/salary.js')
const router = express.Router()

router.get('/', salaryController.getSalaries);

router.get('/:employeeId', salaryController.getSalaryByEmployeeById);

router.post('/', salaryController.createSalary);

router.put('/:employeeId', salaryController.updateSalary);

router.delete('/:employeeId', salaryController.deleteSalary);

module.exports = router;