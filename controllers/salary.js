const mysql = require('mysql2')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getSalaries = (req, res) => {
    pool.query("SELECT * FROM salaries LIMIT 100", (err, rows) => {
        if (err) return handleSQLError(res,err)
        return res.json(rows)
    })
}

const getSalaryByEmployeeById = (req, res) => {
    let sql = "SELECT salary FROM salaries WHERE emp_no = ?"

  sql = mysql.format(sql, [req.params.employeeId])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}


const createSalary = (req, res) => {
    let sql = "INSERT INTO salaries (emp_no, salary, from_date, to_date) VALUES (?, ?, ?, ?)"
  
  sql = mysql.format(sql, [req.body.emp_no, req.body.salary, req.body.from_date, req.body.to_date])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `New salary for employee ID: ${req.body.emp_no} created` });
  })
}


const updateSalary = (req, res) => {
    let sql = "UPDATE salaries SET salary = ? WHERE emp_no = ?"
  
  sql = mysql.format(sql, [req.body.salary, req.params.employeeId])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}


const deleteSalary = (req, res) => {
    let sql = "DELETE FROM salaries WHERE emp_no = ?"
  
  sql = mysql.format(sql, [req.params.employeeId])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${req.params.employeeId} salary` });
  })
}

  module.exports = {
    getSalaries,
    getSalaryByEmployeeById,
    createSalary,
    updateSalary,
    deleteSalary
  }