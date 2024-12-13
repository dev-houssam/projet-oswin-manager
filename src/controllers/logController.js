const {
  getAllLogs,
  getLogById,
  createLog,
  deleteLog,
} = require('../models/logModel');

exports.getAllLogs = async (req, res) => {
  try {
    const logs = await getAllLogs();
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLogById = async (req, res) => {
  try {
    const log = await getLogById(req.params.id);
    if (!log) return res.status(404).json({ error: 'Log not found' });
    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createLog = async (req, res) => {
  try {
    const { message, level } = req.body;
    const newLog = await createLog(message, level);
    res.status(201).json(newLog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteLog = async (req, res) => {
  try {
    await deleteLog(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

