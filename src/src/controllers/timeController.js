const { getCurrentTime } = require('../models/timeModel');

// Contrôleur pour gérer la récupération du temps
exports.getTime = async (req, res) => {
  try {
    const currentTime = await getCurrentTime(); // Appelle le modèle
    res.status(200).json({ time: currentTime }); // Retourne le temps
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération de la date et de l\'heure.' });
  }
};

