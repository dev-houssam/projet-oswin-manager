const express = require('express');
const {
  getAllApps,
  getAppById,
  createApp,
  updateApp,
  deleteApp,
  getUserApps
} = require('../controllers/appController');

// Middleware pour valider le token
const {authenticate} = require('../middlewares/authenticate');


const router = express.Router();
router.get('/progs', authenticate, getUserApps);
router.get('/', getAllApps);
router.get('/:id', getAppById);
router.post('/', createApp);
router.put('/:id', updateApp);
router.delete('/:id', deleteApp);

module.exports = router;
