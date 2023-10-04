const mysql = require('mysql2')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getTitles = (req, res) => {
    
    pool.query("SELECT * FROM titles", (err, rows) => {
      if (err) return handleSQLError(res, err)
      return res.json(rows);
    })

  }

  const getTitleByEmployeeById = (req, res) => {

    let sql = "SELECT * FROM ?? WHERE ?? = ?"
    sql = mysql.format(sql, ["titles", "emp_no", req.params.employeeId])
  
    pool.query(sql, (err, rows) => {
      if (err) return handleSQLError(res, err)
      return res.json(rows);
    })

  }

  const createTitle = (req, res) => {

    let sql = "INSERT INTO ?? (??, ??, ??, ??) VALUES (?, ?, ?, ?)"
    sql = mysql.format(sql, ["titles", "emp_no", "title", "from_date", "to_date",
        req.body.emp_no, req.body.title, req.body.from_date, req.body.to_date])

    pool.query(sql, (err, results) => {
      if (err) return handleSQLError(res, err)
      return res.json({ message: `Title: ${req.body.title} created`});
    })

  }

  const updateTitle = (req, res) => {

    let sql = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?"
    sql = mysql.format(sql, ["titles", "title", req.body.title, "from_date", req.body.from_date,
        "to_date", req.body.to_date, "emp_no", req.params.employeeId])
  
    pool.query(sql, (err, results) => {
      if (err) return handleSQLError(res, err)
      return res.json({ message: `Title: ${req.body.title} updated`})
    })

  }

  const deleteTitle = (req, res) => {
    
    let sql = "DELETE FROM ?? WHERE ?? = ?"
    sql = mysql.format(sql, ["titles", "emp_no", req.params.employeeId])
  
    pool.query(sql, (err, results) => {
      if (err) return handleSQLError(res, err)
      return res.json({ message: `Title: ${req.params.employeeId} deleted`});
    })
    
  }

  module.exports = {getTitles,
    getTitleByEmployeeById,
    createTitle,
    updateTitle,
    deleteTitle
    }