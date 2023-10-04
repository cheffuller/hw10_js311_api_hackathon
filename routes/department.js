const express = require("express");
const departmentController = require("../controllers/department.js");
const router = express.Router();

router.get("/", departmentController.getDepartments);

router.get("/:id", departmentController.getDepartmentById);

router.post("/", departmentController.createDepartment);

router.put("/:id", departmentController.updateDepartment);

router.delete("/:id", departmentController.deleteDepartment);

module.exports = router;
