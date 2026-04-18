const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

dotenv.config();

const pool = require('./config/db');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

const filmRoutes = require('./routes/filmRoutes');
app.use('/api/films', filmRoutes);

const sessionRoutes = require('./routes/sessionRoutes');
app.use('/api/sessions', sessionRoutes);

const hallRoutes = require('./routes/hallRoutes');
app.use('/api/halls', hallRoutes);

// Тест подключения к базе данных
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as current_time');
    res.json({
      message: 'Backend успешно работает!',
      database: 'PostgreSQL подключена успешно',
      time: result.rows[0].current_time
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Backend работает, но есть проблема с БД',
      error: err.message
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});