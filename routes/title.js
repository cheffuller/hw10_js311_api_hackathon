const router = require('express').Router()
const {
  getTitles,
  getTitleByEmployeeById,
  createTitle,
  updateTitle,
  deleteTitle
} = require('../controllers/title.js')


router.get('/', getTitles);

router.get('/:employeeId', getTitleByEmployeeById);

router.post('/', createTitle);

router.put('/:employeeId', updateTitle);

router.delete('/:employeeId', deleteTitle);

module.exports = router;