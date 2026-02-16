const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'testing',
  password: 'helloworld',
  port: 5432,
});

module.exports = pool;