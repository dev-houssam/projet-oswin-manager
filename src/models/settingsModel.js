const pool = require('../config');
const bcrypt = require('bcrypt');

exports.getAllSettings = async () => {
  const result = await pool.query('SELECT COUNT(*) FROM settings');
  console.log(result);
  return result.rows;
};

exports.getSettingByKey = async (key) => {
  const result = await pool.query('SELECT * FROM settings WHERE key = $1', [key]);
  console.log(result);
  return result.rows[0];
};

exports.createOrUpdateSetting = async (key, value) => {
  const result = await pool.query(
    `INSERT INTO settings (key, value) 
     VALUES ($1, $2) 
     ON CONFLICT (key) 
     DO UPDATE SET value = $2 RETURNING *`,
    [key, value]
  );
  console.log(result);
  return result.rows[0];
};

exports.deleteSetting = async (key) => {
  await pool.query('DELETE FROM settings WHERE key = $1', [key]);
};
