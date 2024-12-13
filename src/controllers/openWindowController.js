const {
  getAllOpenWindows,
  getOpenWindowById,
  createOpenWindow,
  updateOpenWindow,
  deleteOpenWindow,
} = require('../models/openWindowModel');

exports.getAllOpenWindows = async (req, res) => {
  try {
    const openWindows = await getAllOpenWindows();
    res.status(200).json(openWindows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOpenWindowById = async (req, res) => {
  try {
    const openWindow = await getOpenWindowById(req.params.id);
    if (!openWindow) return res.status(404).json({ error: 'Open window not found' });
    res.status(200).json(openWindow);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createOpenWindow = async (req, res) => {
  try {
    const { title, url } = req.body;
    const newOpenWindow = await createOpenWindow(title, url);
    res.status(201).json(newOpenWindow);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOpenWindow = async (req, res) => {
  try {
    const { title, url } = req.body;
    const updatedOpenWindow = await updateOpenWindow(req.params.id, title, url);
    res.status(200).json(updatedOpenWindow);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOpenWindow = async (req, res) => {
  try {
    await deleteOpenWindow(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

