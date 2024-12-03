const {
  getAllApps,
  getAppById,
  createApp,
  updateApp,
  deleteApp,
  getAppsForUserId,
} = require('../models/appModel');

exports.getAllApps = async (req, res) => {
  try {
    const apps = await getAllApps();
    res.status(200).json(apps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAppById = async (req, res) => {
  try {
    const app = await getAppById(req.params.id);
    if (!app) return res.status(404).json({ error: 'App not found' });
    res.status(200).json(app);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createApp = async (req, res) => {
  try {
    const { name, version } = req.body;
    const newApp = await createApp(name, version);
    res.status(201).json(newApp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateApp = async (req, res) => {
  try {
    const { name, version } = req.body;
    const updatedApp = await updateApp(req.params.id, name, version);
    res.status(200).json(updatedApp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteApp = async (req, res) => {
  try {
    await deleteApp(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserApps = async (req, res) => {
  try {
    //console.log(req.user);
    const userId = req.user.userId; // L'ID utilisateur récupéré après authentification
    //console.log(userId);
    const apps = await getAppsForUserId(userId);
    res.status(200).json({ apps });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des applications." });
  }
};
