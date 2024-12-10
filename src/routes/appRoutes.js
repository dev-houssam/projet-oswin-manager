const express = require('express');
const {
  getAllApps,
  getAppById,
  createApp,
  updateApp,
  deleteApp,
  getUserApps,
  getUserAppsMeta
} = require('../controllers/appController');

// Middleware pour valider le token
const {authenticate} = require('../middlewares/authenticate');


const router = express.Router();
router.get('/progs', authenticate, getUserApps);
router.get('/metaprogs', authenticate, getUserAppsMeta);
router.get('/', getAllApps);
router.get('/:id', getAppById);
router.post('/create', authenticate, createApp);
router.put('/:id', updateApp);
router.delete('/delete', authenticate, deleteApp);

module.exports = router;

//https://www.perplexity.ai/search/avant-je-stockais-mes-token-de-eos3qDR9So2_E26OEKfKNg
