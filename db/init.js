const pool = require('./index');
const fs = require('fs');
const path = require('path');
const db = require('./index');

(async () => {
  try {
    const { rows } = await pool.query('SELECT NOW()');
    console.log(`🟢 Database connected at: ${rows[0].now}`);
  } catch (error) {
    console.error(`🔴 Error connecting to the database: ${error}`);
    process.exit(1);
  }
})();

(async () => {
  try {
    const initFilepath = path.join(__dirname, 'init.sql');
    const seedsFilepath = path.join(__dirname, 'seeds.sql');
    const init = fs.readFileSync(initFilepath).toString();
    const seeds = fs.readFileSync(initFilepath).toString();
    await db.query(init);
    await db.query(seeds);
    console.log('Tables initialized successfully:');
  } catch (error) {
    console.error('Failed to initialize tables\n', error);
    process.exit(1);
  }
})();