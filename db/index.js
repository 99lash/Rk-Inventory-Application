const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  family: 4,
});

(async () => {
  try {
    const { rows } = await pool.query('SELECT NOW()');
    console.log(`🟢 Database connected at: ${rows[0].now}`);
  } catch (error) {
    console.error(`🔴 Error connecting to the database: ${error}`);
    process.exit(1);
  }
})();

module.exports = pool;