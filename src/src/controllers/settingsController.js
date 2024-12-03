const {
  getAllSettings,
  getSettingByKey,
  createOrUpdateSetting,
  deleteSetting,
} = require('../models/settingsModel');

exports.getAllSettings = async (req, res) => {
  try {
    const settings = await getAllSettings();
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSettingByKey = async (req, res) => {
  try {
    const setting = await getSettingByKey(req.params.key);
    if (!setting) return res.status(404).json({ error: 'Setting not found' });
    res.status(200).json(setting);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createOrUpdateSetting = async (req, res) => {
  try {
    const { key, value } = req.body;
    const updatedSetting = await createOrUpdateSetting(key, value);
    res.status(201).json(updatedSetting);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSetting = async (req, res) => {
  try {
    await deleteSetting(req.params.key);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
