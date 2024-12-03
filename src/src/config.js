const { Pool } = require('pg');
/*
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});
*/
const pool = new Pool({
  user:  "postgres",
  host:  "localhost",
  database: "winmanager",
  password: "SimpleASWater456",
  port: 5432,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false, // SSL si en production
});

module.exports = pool;
