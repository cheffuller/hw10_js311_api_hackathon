
const mysql = require('mysql2')
const pool = require('../sql/connection')
// const { handleSQLError } = require('../sql/error')



const getEmployees = (req, res) => {
    // SELECT ALL USERS
    console.log('here?')
    pool.query("SELECT * FROM employees LIMIT 100", (err, rows) => {
        if (err) return res.json(err)
        console.log('or here?')
        return res.json(rows);
    })
}

const getEmployeeById = (req, res) => {

    pool.query("SELECT * FROM employees where emp_no = ?", [req.params.emp_no], (err, rows) => {
        if (err) return res.json(err)
        return res.json(rows);
    })
}

const createEmployee = (req, res) => {

    pool.query("INSERT INTO employees (emp_no, birth_date, first_name, last_name, gender, hire_date) VALUES (?, ?, ?, ?, ?, ?)",
        [req.body.emp_no, new Date(req.body.birth_date), req.body.first_name, req.body.last_name, req.body.gender, new Date(req.body.hire_date)],
        (err, rows) => {
            if (err) return res.json(err)
            return res.send(`Employee: ${req.body.first_name} created`)
        })
}

const updateEmployee = (req, res) => {
    pool.query("UPDATE employees SET birth_date = ?, first_name = ?, last_name = ?, gender = ?, hire_date = ? where emp_no = ?",
        [new Date(req.body.birth_date), req.body.first_name, req.body.last_name, req.body.gender, new Date(req.body.hire_date), req.params.emp_no],
        (err, rows) => {
            if (err) return res.json(err)
            return res.send(`Employee: ${req.body.first_name} updated`)
        })
}

const deleteEmployee = (req, res) => {
    pool.query("DELETE FROM employees where emp_no = ?",
        [req.params.emp_no],
        (err, rows) => {
            if (err) return res.json(err)
            return res.send(`Employee: ${req.params.emp_no} FIRED`)
        })
}


module.exports = { getEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee }