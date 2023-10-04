const mysql = require("mysql2");
const pool = require("../sql/connection");
const { handleSQLError } = require('../sql/error')

const getDepartments = (req, res) => {
  pool.query("SELECT * FROM departments", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getDepartmentById = (req, res) => {
  let sql = "SELECT dept_name FROM departments WHERE dept_no = ?"
  sql = mysql.format(sql, [req.params.id])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createDepartment = (req, res) => {
  let sql = "INSERT INTO departments (dept_no, dept_name) VALUES (?, ?);"
  sql = mysql.format(sql, [req.body.dept_no, req.body.dept_name])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Department: ${req.body.dept_name} created` });
  })
}

const updateDepartment = (req, res) => {
  let sql = "UPDATE departments SET dept_name = ? WHERE dept_no = ?"
  sql = mysql.format(sql, [req.body.dept_name, req.params.id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Department: ${req.body.dept_name} updated` });
  })
}

const deleteDepartment = (req, res) => {
  let sql = "DELETE FROM departments WHERE dept_no = ?"
  sql = mysql.format(sql, [req.params.id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Department: ${req.params.id} deleted` });
  })
}

module.exports = { getDepartments, getDepartmentById, createDepartment, updateDepartment, deleteDepartment };
