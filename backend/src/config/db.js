const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

// Тест подключения
pool.query('SELECT NOW()', (err) => {
  if (err) console.error('Ошибка подключения к БД:', err);
  else console.log('Подключено к базе "kino"');
});

module.exports = pool;