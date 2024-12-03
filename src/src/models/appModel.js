const pool = require('../config');
const bcrypt = require('bcrypt');

exports.getAllApps = async () => {
  const result = await pool.query('SELECT * FROM apps');
  return result.rows;
};

exports.getAppById = async (id) => {
  const result = await pool.query('SELECT * FROM apps WHERE id = $1', [id]);
  return result.rows[0];
};

exports.getAppsForUserId = async (userId) => {
  const oldQuery = `
  SELECT apps.*
  FROM apps
  JOIN user_installed_apps ON user_installed_apps.app_id = apps.id
  WHERE user_installed_apps.user_id = $1;
  
  `;

  const query = `
  SELECT apps.*
  FROM apps
  JOIN user_installed_apps ON user_installed_apps.app_id = apps.id
  WHERE user_installed_apps.user_id = $1

UNION

SELECT apps.*
  FROM apps
  JOIN user_installed_apps ON user_installed_apps.app_id = apps.id
  WHERE user_installed_apps.user_id = 24;

  
  `;

  //console.log("="+userId);
  const result = await pool.query(query, [userId]);
  return result.rows; // Retourne toutes les applications liées à l'utilisateur
};



exports.createApp = async (name, version) => {
  const result = await pool.query(
    'INSERT INTO apps (name, version) VALUES ($1, $2) RETURNING *',
    [name, version]
  );
  return result.rows[0];
};

exports.updateApp = async (id, name, version) => {
  const result = await pool.query(
    'UPDATE apps SET name = $1, version = $2 WHERE id = $3 RETURNING *',
    [name, version, id]
  );
  return result.rows[0];
};

exports.deleteApp = async (id) => {
  await pool.query('DELETE FROM apps WHERE id = $1', [id]);
};

