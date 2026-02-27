// backend/database.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://postgres:helloworld@localhost:5432/testing"
});

module.exports = pool;