const express = require('express');
const { 
	getAllSettings, 
	getSettingByKey, 
	createOrUpdateSetting,
	deleteSetting
} = require('../controllers/settingsController');

const router = express.Router();

router.get('/',        getAllSettings);
router.get('/:key',    getSettingByKey);
router.post('/',       createOrUpdateSetting);
router.delete('/:key', deleteSetting);

module.exports = router;
