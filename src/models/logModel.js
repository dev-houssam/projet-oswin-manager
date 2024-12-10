const pool = require('../config');
const bcrypt = require('bcrypt');

exports.getAllLogs = async () => {
  const result = await pool.query('SELECT COUNT(*) FROM logs ');
  console.log(result);
  return result.rows;
};

exports.getLogById = async (id) => {
  const result = await pool.query('SELECT * FROM logs WHERE id = $1', [id]);
  console.log(result);
  return result.rows[0];
};

exports.createLog = async (message, level = 'INFO') => {
  const result = await pool.query(
    'INSERT INTO logs (message, level) VALUES ($1, $2) RETURNING *',
    [message, level]
  );
  console.log(result);
  return result.rows[0];
};

exports.deleteLog = async (id) => {
  await pool.query('DELETE FROM logs WHERE id = $1', [id]);
};
