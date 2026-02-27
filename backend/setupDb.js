// backend/setupDb.js
const pool = require('./database');

(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100)
      );
    `);

    await pool.query(`DELETE FROM users;`);

    await pool.query(`
      INSERT INTO users (name, email) VALUES
      ('Existing User', 'existing@example.com');
    `);

    console.log('Database ready for tests');
    process.exit(0);
  } catch (err) {
    console.error('Error setting up database:', err);
    process.exit(1);
  }
})();