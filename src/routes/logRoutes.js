const express = require('express');
const {
  getAllLogs,
  getLogById,
  createLog,
  deleteLog,
} = require('../controllers/logController');

const router = express.Router();

router.get('/', getAllLogs);
router.get('/:id', getLogById);
router.post('/', createLog);
router.delete('/:id', deleteLog);

module.exports = router;
