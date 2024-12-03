const pool = require('../config');
const bcrypt = require('bcrypt');


// Fonction pour récupérer l'heure actuelle depuis la base de données
exports.getCurrentTime = async () => {
  try {
    const result = await pool.query('SELECT NOW()'); // Requête SQL
    return result.rows[0].now; // Retourne la valeur du champ "now"
  } catch (error) {
    throw new Error('Erreur lors de la récupération du temps actuel : ' + error.message);
  }
};
