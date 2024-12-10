const pool = require('../config');
const bcrypt = require('bcrypt');

exports.getAllOpenWindows = async () => {
  const result = await pool.query('SELECT * FROM open_windows');
  console.log(result);
  return result.rows;
};

exports.getOpenWindowById = async (id) => {
  const result = await pool.query('SELECT * FROM open_windows WHERE id = $1', [id]);
  console.log(result);
  return result.rows[0];
};

exports.createOpenWindow = async (title, url) => {
  const result = await pool.query(
    'INSERT INTO open_windows (title, url) VALUES ($1, $2) RETURNING *',
    [title, url]
  );
  console.log(result);
  return result.rows[0];
};

exports.updateOpenWindow = async (id, title, url) => {
  const result = await pool.query(
    'UPDATE open_windows SET title = $1, url = $2 WHERE id = $3 RETURNING *',
    [title, url, id]
  );
  console.log(result);
  return result.rows[0];
};

exports.deleteOpenWindow = async (id) => {
  await pool.query('DELETE FROM open_windows WHERE id = $1', [id]);
};

