if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  family: 4,
});

module.exports = pool;