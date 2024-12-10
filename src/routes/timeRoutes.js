const express = require('express');
const { getTime } = require('../controllers/timeController');

const router = express.Router();

// GET ROUTES
router.get('/', getTime);
router.post('/', getTime);
router.put('/:id', getTime);
router.delete('/:id', getTime);


module.exports = router;
