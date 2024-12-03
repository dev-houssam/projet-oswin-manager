const express = require('express');
const {
  getAllOpenWindows,
  getOpenWindowById,
  createOpenWindow,
  updateOpenWindow,
  deleteOpenWindow,
} = require('../controllers/openWindowController');

const router = express.Router();

router.get('/', getAllOpenWindows);
router.get('/:id', getOpenWindowById);
router.post('/', createOpenWindow);
router.put('/:id', updateOpenWindow);
router.delete('/:id', deleteOpenWindow);

module.exports = router;
