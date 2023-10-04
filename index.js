const express = require('express');
const titlesRouter = require('./routes/title')
const departmentRouter = require('./routes/department');
const salaryRouter = require('./routes/salary')
const app = express();
const port = process.env.PORT || 4001;

const employeesRouter = require('./routes/employee');

app.use(express.json())
app.use('/titles', titlesRouter)
app.use('/department', departmentRouter)
app.use('/salary', salaryRouter)

app.use('/employees', employeesRouter)

app.get('/', (req, res) => {
  res.send('hello world!');
})

app.listen(port, () => console.log(`Listening on port ${port}`));