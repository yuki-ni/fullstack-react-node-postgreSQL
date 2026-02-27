// backend/setupDb.js
const pool = require('./users');

(async () => {
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
})();