const fs = require('fs');
const path = require('path');
const db = require('./index');

(async () => {
  try {
    const filepath = path.join(__dirname, 'init.sql');
    const sql = fs.readFileSync(filepath).toString();
    await db.query(sql)
    console.log('Tables initialized successfully:');
  } catch (error) {
    console.error('Failed to initialize tables\n', error);
    process.exit(1);
  }
})();